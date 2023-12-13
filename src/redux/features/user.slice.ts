import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { apiGetFeeds, apiLogin, apiLoginWithToken, apiRegister } from '@/apis/user.api';

interface IUserSlice {
	isLoggedIn: boolean;
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	user: any;
	error: string | null | undefined;
	feeds: {
		sources: string[];
		categories: string[];
		authors: string[];
	};
}

const initialState: IUserSlice = {
	isLoggedIn: false,
	loading: 'idle',
	user: {},
	error: null,
	feeds: {
		sources: [],
		categories: [],
		authors: [],
	},
};

export const login = createAsyncThunk('user/login', async (user: ILoginForm) => {
	try {
		const data = await apiLogin(user);
		return data;
	} catch (err) {
		throw err;
	}
});

export const loginWithToken = createAsyncThunk('user/login-with-token', async () => {
	try {
		const data = await apiLoginWithToken();
		return data;
	} catch (err) {
		throw err;
	}
});

export const register = createAsyncThunk('user/register', async (user: IRegisterForm) => {
	const data = await apiRegister(user);
	return data;
});

export const getFeeds = createAsyncThunk('user/get-feeds', async () => {
	const data = await apiGetFeeds();
	return data;
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			state.isLoggedIn = false;

			localStorage.removeItem('token');

			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.data.user;
			state.loading = 'idle';

			localStorage.setItem('token', action.payload.data.token);

			return state;
		});

		builder.addCase(loginWithToken.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.data;
			state.loading = 'idle';

			return state;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.user = { name: action.payload.data.name };
			state.loading = 'idle';

			localStorage.setItem('token', action.payload.data.token);

			return state;
		});

		builder.addCase(getFeeds.fulfilled, (state, action) => {
			state.feeds = action.payload;
			return state;
		});

		builder.addMatcher(
			isAnyOf(login.rejected, loginWithToken.rejected, register.rejected),
			(state, action) => {
				state.loading = 'failed';
				state.error = action.error.message;

				return state;
			}
		);

		builder.addMatcher(
			isAnyOf(login.pending, loginWithToken.pending, register.pending),
			(state) => {
				state.loading = 'pending';
				return state;
			}
		);
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
