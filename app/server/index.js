import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import tls from 'node:tls';

function readDotEnv() {
  const envPath = new URL('../.env', import.meta.url);
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

readDotEnv();

const API_PORT = Number(process.env.API_PORT || 8787);
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('body_too_large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

function encodeBase64(input) {
  return Buffer.from(input, 'utf8').toString('base64');
}

function sendSmtpMail({ to, subject, text }) {
  return new Promise((resolve, reject) => {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      reject(new Error('smtp_not_configured'));
      return;
    }

    const socket = SMTP_SECURE
      ? tls.connect({ host: SMTP_HOST, port: SMTP_PORT, servername: SMTP_HOST })
      : net.connect({ host: SMTP_HOST, port: SMTP_PORT });

    let stage = 0;
    let buffer = '';

    const write = (line) => socket.write(`${line}\r\n`);

    const fail = (error) => {
      try { socket.end(); } catch {}
      reject(error instanceof Error ? error : new Error(String(error)));
    };

    socket.setTimeout(15000, () => fail(new Error('smtp_timeout')));
    socket.on('error', fail);

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1] || '';
      if (!/^\d{3} /.test(last)) return;

      const code = Number(last.slice(0, 3));
      if (code >= 400) {
        fail(new Error(`smtp_error_${code}`));
        return;
      }

      try {
        switch (stage) {
          case 0:
            write(`EHLO localhost`);
            stage = 1;
            break;
          case 1:
            write('AUTH LOGIN');
            stage = 2;
            break;
          case 2:
            write(encodeBase64(SMTP_USER));
            stage = 3;
            break;
          case 3:
            write(encodeBase64(SMTP_PASS));
            stage = 4;
            break;
          case 4:
            write(`MAIL FROM:<${SMTP_USER}>`);
            stage = 5;
            break;
          case 5:
            write(`RCPT TO:<${to}>`);
            stage = 6;
            break;
          case 6:
            write('DATA');
            stage = 7;
            break;
          case 7: {
            const message = [
              `From: Duplex Landing <${SMTP_USER}>`,
              `To: <${to}>`,
              `Subject: ${subject}`,
              'Content-Type: text/plain; charset=utf-8',
              '',
              text,
              '.',
            ].join('\r\n');
            socket.write(`${message}\r\n`);
            stage = 8;
            break;
          }
          case 8:
            write('QUIT');
            stage = 9;
            break;
          case 9:
            socket.end();
            resolve();
            break;
          default:
            break;
        }
      } catch (e) {
        fail(e);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/send-lead') {
    try {
      const body = await parseBody(req);
      const { name, phone, email, recipientEmail } = body;

      if (!recipientEmail || !phone) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'recipientEmail_and_phone_required' }));
        return;
      }

      await sendSmtpMail({
        to: recipientEmail,
        subject: 'Новая заявка с лендинга',
        text: `Имя: ${name || '-'}\nТелефон: ${phone || '-'}\nEmail: ${email || '-'}\nИсточник: сайт`,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      return;
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: String(error) }));
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not_found' }));
});

server.listen(API_PORT, () => {
  console.log(`Lead API started on http://localhost:${API_PORT}`);
});
