'use client';

import { LoginForm } from '@/components/Auth';

export default function AuthForm() {
//   const [mode, setMode] = useState<'login' | 'register'>('login');

//   const toggleMode = () => {
//     setMode((prev) => (prev === 'login' ? 'register' : 'login'));
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <LoginForm/>
        {/* {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button onClick={toggleMode} className="text-blue-600 hover:underline">
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={toggleMode} className="text-blue-600 hover:underline">
                Login
              </button>
            </>
          )}
        </p> */}
      </div>
    </div>
  );
}
