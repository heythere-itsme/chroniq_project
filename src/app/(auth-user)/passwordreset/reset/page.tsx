'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const supabase = createClient();

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function UpdatePasswordPage() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated');
      router.push('/login');
    }
  };

  return (
    <div className="auth-block">
      <h3 className="mb-4 text-center">Reset Your Password</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 auth">
        <div>
          <Input
            type="password"
            placeholder="New password"
            {...form.register('password')}
          />
          <p className="text-sm text-red-500">{form.formState.errors.password?.message}</p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm password"
            {...form.register('confirmPassword')}
          />
          <p className="text-sm text-red-500">{form.formState.errors.confirmPassword?.message}</p>
        </div>

        <Button type="submit" className="mx-auto w-full text-primary-light px-8">
          Update Password
        </Button>
      </form>
    </div>
  );
}
