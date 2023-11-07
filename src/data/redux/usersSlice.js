import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user_id: false, user: false, user_company: false
};

export const usersSlice = createSlice({
	name : 'users',
	initialState,
	reducers: {
		setUserId: (state, action) => {
			state.user_id = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setUserCompany: (state, action) => {
			state.user_company = action.payload;
		},
		loginUserData: {
			reducer(state, action) {
				state.user_id = action.payload.user_id;
				state.user = action.payload.user;
				state.user_company = action.payload.user_company
			},
			prepare(user, company) {
				//console.log(user, company);
				return {
					payload: {
						user_id: user.id,
						user: user,
						user_company: company
					}
				}
			}
		},
		logoutUserData: (state) => {
			state = {
				user_id: false,
				user: false,
				user_company: false
			};
		}
	}
});

export const { setUser, setUserId, setUserCompany, loginUserData, logoutUserData } = usersSlice.actions; 
export const getUser = (state) => state.users.user;
export const getUserCompany = (state) => state.users.user_company;
export default usersSlice.reducer;