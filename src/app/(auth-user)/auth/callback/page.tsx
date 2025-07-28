'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const supabase = createClient();

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log(session?.user)

      if (sessionError || !session?.user) {
        toast.error('No active session found.');
        router.push('/login');
        return;
      }

      // ✅ Call API route to insert/check user in DB
      const res = await fetch('/api/ensure-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: session.user }),
      });

      if (!res.ok) {
        toast.error('User setup failed');
        router.push('/login');
        return;
      }

      toast.success('Logged in successfully!');
      router.push('/u/home');
    };

    handleOAuthRedirect();
  }, [router]);

  return <div className="p-10 text-center text-lg">Logging you in...</div>;
}
