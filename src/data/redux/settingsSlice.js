import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	user_id: false,
	fetch_id : 'xxxxxx'
};

export const settingsSlice = createSlice({
	name : 'settings',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user_id = action.payload;
		},
		setFetchId: (state, action) => {
			state.fetch_id = action.payload;
		}
	}
});

export const { setUser, setFetchId } = settingsSlice.actions; 
export default settingsSlice.reducer;