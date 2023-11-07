import  { configureStore, customizedMiddleware } from "@reduxjs/toolkit";
import settingsReducer from './settingsSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
	reducer : {
		settings: settingsReducer,
		users: usersReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
	  serializableCheck: false
	}),
});

