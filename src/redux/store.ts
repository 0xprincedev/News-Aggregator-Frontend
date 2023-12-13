import { configureStore } from '@reduxjs/toolkit';
import userSlice, { getFeeds, loginWithToken } from './features/user.slice';

const store = configureStore({
	reducer: {
		user: userSlice,
	},
});

store.dispatch(loginWithToken());
store.dispatch(getFeeds());

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
