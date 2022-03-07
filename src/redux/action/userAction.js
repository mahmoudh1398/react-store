import * as api from 'api/login.api';
import {ACCESS_TOKEN, IS_LOGGED_IN} from 'config/variables.config';
import { REFRESH_TOKEN } from 'config/url.config';


export const whoami = () => {
	return (dispatch, getState) => {
		return api.whoami()
			.then(response => {
				console.log('whoami response: 2', response);
				localStorage.setItem(IS_LOGGED_IN, true.toString());
				return response;
			})
			.catch(error => {
				return Promise.reject(error);
			});
	}
};

export const refreshToken = () => {
	return (dispatch, getState) => {
		return api.loginUser()
			.then(response => {
				localStorage.setItem(ACCESS_TOKEN, response.token);
				localStorage.setItem(REFRESH_TOKEN, response.token);
				localStorage.setItem(IS_LOGGED_IN, true.toString());
				return response
			})
			.catch(error => {
				return Promise.reject(error);
			})
	}
}