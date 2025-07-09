'use client';

import {
  FormEvent,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PublicRoute from '../../components/PublicRoute';
import { useLogin } from '../../hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setError(null);

  try {
    await loginUser(email, password);
    setEmail('');
    setPassword('');
    router.push('/');
  } catch (err) {
    let msg = 'An unexpected error occurred';
    if (err instanceof Error) {
      msg = err.message;
    }
    setError(msg);
  }
};


  return (
    <PublicRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <label className="block mb-2">
            <span>Email</span>
            <input
              type="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </label>

         <label className="block mb-4">
    <span>Password</span>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
        className="mt-1 block w-full pr-10 border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-2 flex items-center text-sm text-blue-600 dark:text-blue-400 focus:outline-none"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  </label>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
          >
            Login
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PublicRoute>
  );
}
