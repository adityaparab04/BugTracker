import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    LoggedIn: false,
    type: "",
    token: "",
    user_id: "",
    username: "",
    Bugs: [],
    error: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function logIn(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const data = await axios.post('/api/login', body, config);
            const payload = {
                type: data.data.type,
                token: data.data.token,
                username: data.data.username,
                user_id: body.id
            }

            localStorage.setItem('type', data.data.type);
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('username', data.data.username);
            localStorage.setItem('user_id', body.id);

            dispatch({
                type: 'LOG_IN',
                payload: payload
            });

        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function loadCache() {
        try {
            if (localStorage.getItem('token')) {
                const payload = {
                    token: localStorage.getItem('token'),
                    type: localStorage.getItem('type'),
                    username: localStorage.getItem('username'),
                    user_id: localStorage.getItem('user_id')
                }

                dispatch({
                    type: 'LOG_IN',
                    payload: payload
                });
            } else {
                console.log('nothing load in cache');
                return false;
            }
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function logOut() {
        try {
            localStorage.setItem('type', "");
            localStorage.setItem('token', "");
            localStorage.setItem('username', "");
            localStorage.setItem('user_id', "");

            dispatch({
                type: 'LOG_OUT'
            })

        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getAllBugs() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.get('/api/admin/bugs', config);
            console.log(data.data.data);
            dispatch({
                type: 'BUGS',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getClientBugs() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.get(`/api/client/bugs/${state.user_id}`, config);
            console.log(data.data.data);
            dispatch({
                type: 'BUGS',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getAssignedBugEmployee() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.get(`/api/employee/getassignedbug/${state.user_id}`, config);
            console.log(data.data.data);
            dispatch({
                type: 'BUGS',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function assignBug(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/admin/assignbug', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function unassignBug(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/admin/unassignbug', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteBug(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/admin/deletebug', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteBugClient(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/client/delete_bug', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function ConfirmSolutionClient(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/client/confirmsolution', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function DenySolutionClient(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/client/notworking', body, config);
            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function reportBug(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/client/report_bug', body, config);
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function giveSolution(body) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        }
        try {
            const data = await axios.post('/api/employee/givesolution', body, config);

            dispatch({
                type: 'DELETE_BUG',
                payload: body.bug_id
            });
            dispatch({
                type: 'ADD_BUG',
                payload: data.data.data
            });
        } catch(err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                Bugs: state.Bugs,
                LoggedIn: state.LoggedIn,
                type: state.type,
                token: state.token,
                user_id: state.user_id,
                username: state.username,
                error: state.error,
                loadCache,
                logIn,
                logOut,
                getAllBugs,
                getClientBugs,
                getAssignedBugEmployee,
                assignBug,
                unassignBug,
                deleteBug,
                deleteBugClient,
                reportBug,
                ConfirmSolutionClient,
                DenySolutionClient,
                giveSolution
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}