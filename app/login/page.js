'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Lock, AlertCircle, KeyRound } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      localStorage.setItem('token', result.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-bg flex items-center justify-center p-4">
      <div className="card max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 mb-4">
            <KeyRound className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert-error mb-6">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={20} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={20} />}
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading}>
              <LogIn size={20} />
              Sign In
            </Button>
          </div>
        </form>

        <p className="text-center mt-8 text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="link-accent font-medium">
            Sign Up
          </Link>
        </p>

        <div className="mt-6 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-zinc-500 text-xs text-center">
            Demo: <span className="text-zinc-400">demo@example.com</span> / <span className="text-zinc-400">password123</span>
          </p>
        </div>
      </div>
    </main>
  );
}
