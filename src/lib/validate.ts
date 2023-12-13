export const validateName = (name: string) => {
	if (!name) {
		return 'Name can not be blank';
	}
};

export const validateEmail = (email: string) => {
	if (!email) {
		return 'Email can not be blank';
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return 'Email is invalid';
	}
};

export const validatePassword = (password: string) => {
	if (!password) {
		return 'Password can not be blank';
	}

	if (password.length < 6) {
		return 'Password must be at least 6 characters long';
	}
};
