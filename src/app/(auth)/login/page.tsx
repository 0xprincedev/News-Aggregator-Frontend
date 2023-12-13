'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { unwrapResult } from '@reduxjs/toolkit';
import InputForm from '@/components/Forms/InputForm';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { validateEmail, validatePassword } from '@/lib/validate';
import { login } from '@/redux/features/user.slice';

export default function LoginPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isLoggedIn, loading } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	const handleLogin = async (user: ILoginForm) => {
		try {
			const data = await dispatch(login(user));
			await unwrapResult(data);
			toast.success('Logged in successfully');
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<Form
			onSubmit={handleLogin}
			render={({ handleSubmit }) => (
				<form className='container py-12' onSubmit={handleSubmit}>
					<div className='mx-auto max-w-sm space-y-8 bg-white px-4 py-8 shadow-[2px_4px_4px_2px_#0002]'>
						<div className='flex flex-col items-center gap-2'>
							<Icon icon='arcticons:sky-news' color='green' height={60} />
							<h2 className='text-xl font-bold text-primary-600'>Sign in to your account</h2>
						</div>
						<div className='space-y-4'>
							<Field name='email' validate={validateEmail}>
								{(props) => (
									<InputForm
										type='email'
										icon={<Icon icon='ic:outline-email' color='gray' height={20} />}
										placeholder='Your email'
										{...props}
									/>
								)}
							</Field>
							<Field name='password' validate={validatePassword}>
								{(props) => (
									<InputForm
										type='password'
										icon={<Icon icon='mdi:password-outline' color='gray' height={20} />}
										placeholder='Password'
										{...props}
									/>
								)}
							</Field>
							<button
								type='submit'
								className='relative w-full bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow shadow-black/40 active:shadow-none disabled:opacity-50'
								disabled={loading === 'pending'}
							>
								Sign In
								{loading === 'pending' && (
									<Icon
										icon='line-md:loading-twotone-loop'
										height={24}
										className='absolute right-4 top-1/2 -translate-y-1/2'
									/>
								)}
							</button>
							<p className='text-center text-xs text-inactive'>
								Not registered yet?&nbsp;
								<Link href='/register' className='text-primary-600 hover:underline'>
									Register here
								</Link>
							</p>
						</div>
					</div>
				</form>
			)}
		/>
	);
}
