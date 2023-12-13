import axios from '@/services/axios';

export const apiLogin = async (user: ILoginForm) => {
	const { data } = await axios.post('/login', user);
	return data;
};

export const apiLoginWithToken = async () => {
	const { data } = await axios.get('/user');
	return data;
};

export const apiRegister = async (user: IRegisterForm) => {
	const { data } = await axios.post('/register', user);
	return data;
};

export const apiGetFeeds = async () => {
	const { data } = await axios.post('/feeds');
	return data;
};
