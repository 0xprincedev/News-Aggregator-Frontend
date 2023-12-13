import axios from '@/services/axios';

export const apiGetArticles = async (params: Record<string, any>) => {
	const q = Object.entries(params)
		.map((param) => `${param[0]}=${param[1]}`)
		.join('&');
	const { data } = await axios.get(`/article/search?${q}`);
	return data;
};
