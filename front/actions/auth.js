import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './types';

export const login = (username, password) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL
        });
    }

};