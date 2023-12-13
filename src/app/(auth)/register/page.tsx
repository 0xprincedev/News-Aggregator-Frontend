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
import { validateEmail, validateName, validatePassword } from '@/lib/validate';
import { register } from '@/redux/features/user.slice';

export default function RegisterPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isLoggedIn, loading } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	const handleRegister = async (user: IRegisterForm) => {
		try {
			const data = await dispatch(register(user));
			await unwrapResult(data);
			toast.success('User registered successfully');
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<Form
			onSubmit={handleRegister}
			render={({ handleSubmit }) => (
				<form className='container py-12' onSubmit={handleSubmit}>
					<div className='mx-auto max-w-sm space-y-8 bg-white px-4 py-8 shadow-[2px_4px_4px_2px_#0002]'>
						<div className='flex flex-col items-center gap-2'>
							<Icon icon='arcticons:sky-news' color='green' height={60} />
							<h2 className='text-xl font-bold text-primary-600'>Create your account</h2>
						</div>
						<div className='space-y-4'>
							<Field name='name' validate={validateName}>
								{(props) => (
									<InputForm
										type='text'
										icon={<Icon icon='mi:user' color='gray' height={20} />}
										placeholder='Your name'
										{...props}
									/>
								)}
							</Field>
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
								Sign Up
								{loading === 'pending' && (
									<Icon
										icon='line-md:loading-twotone-loop'
										height={24}
										className='absolute right-4 top-1/2 -translate-y-1/2'
									/>
								)}
							</button>
							<p className='text-center text-xs text-inactive'>
								Already have an account?&nbsp;
								<Link href='/login' className='text-primary-600 hover:underline'>
									Login here
								</Link>
							</p>
						</div>
					</div>
				</form>
			)}
		/>
	);
}
