import { useState } from 'react';
import { AdminPanel } from '@/components/AdminPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'duplex-admin-2026';
const SESSION_KEY = 'duplex-admin-auth';

export function AdminPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthorized(true);
      toast.success('Доступ разрешен');
      return;
    }
    toast.error('Неверный логин или пароль');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-card p-6 space-y-4">
          <h1 className="text-2xl font-bold">Вход в админку</h1>
          <p className="text-dark-light text-sm">Доступ только для администратора.</p>
          <Input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
          <Button type="submit" className="w-full">Войти</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Режим администратора</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>На сайт</Button>
            <Button variant="destructive" onClick={() => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }}>Выйти</Button>
          </div>
        </div>
      </div>
      <AdminPanel />
    </div>
  );
}
