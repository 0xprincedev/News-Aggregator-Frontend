import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			md: { max: '991px' },
			sm: { max: '767px' },
			xs: { max: '575px' },
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: colors.indigo,
				inactive: colors.gray['300'],
				error: colors.red['600'],
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
export default config;
