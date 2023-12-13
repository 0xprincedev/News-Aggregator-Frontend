import defaultAxios from 'axios';
import { BACKEND_URL } from '@/lib/config';

const axios = defaultAxios.create({
	baseURL: BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default axios;
