'use client';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '@/layouts/Header';
import store from '@/redux/store';

export default function Template({ children }: TemplateProps) {
	return (
		<Provider store={store}>
			<div id='__next'>
				<Header />
				{children}
			</div>
			<ToastContainer
				autoClose={3000}
				pauseOnFocusLoss={false}
				pauseOnHover
				position='top-right'
				theme='colored'
			/>
		</Provider>
	);
}
