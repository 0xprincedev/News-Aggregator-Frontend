'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { logout } from '@/redux/features/user.slice';

const Header = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className='bg-primary-700 text-white'>
			<div className='container'>
				<div className='flex h-20 items-center justify-between'>
					<Link href='/'>
						<Icon icon='arcticons:sky-news' color='white' height={60} />
					</Link>
					{!isLoggedIn ? (
						<nav className='flex items-center space-x-8'>
							<Link href='/login' className='text-sm font-bold'>
								Login
							</Link>
							<Link
								href='/register'
								className='rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary-600 shadow-[1px_2px_2px_1px_#0002]'
							>
								Sign Up
							</Link>
						</nav>
					) : (
						<nav className='flex items-center space-y-8'>
							<span className='cursor-pointer text-sm font-bold' onClick={handleLogout}>
								Logout
							</span>
						</nav>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
