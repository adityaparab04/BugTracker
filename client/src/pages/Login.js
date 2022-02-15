import React, {useContext, useState} from 'react';

import { GlobalContext } from '../context/GlobalState';

export const Login = () => {
    const [id, setId] = useState('');
    const [usertype, setUserType] = useState('admin');
    const [password, setPassword] = useState('');

    const { logIn } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        console.log('logging in');
        const body = {
            id: +id,
            password,
            type: usertype
        }
        logIn(body);
    }

    return (
        <div className="login_container">
            <form onSubmit={onSubmit} className="login_form">
                <div className="login_from_section">
                    <label htmlFor='type' className="login_form_label">Type:</label>
                    <select 
                        name="type"
                        value={usertype}
                        onChange = {(e) => setUserType(e.target.value)}
                        className="login_form_select"
                    >
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="client">Client</option>
                    </select>
                </div>
                <div className='login_from_section'>
                    <label htmlFor='id' className="login_form_label">Id:</label>
                    <input 
                        type='number'
                        name='id'
                        value={id} 
                        onChange = {(e) => setId(e.target.value)}
                        placeholder='Enter UserId...' 
                        className="login_form_input"/>
                </div>
                <div className='login_from_section'>
                    <label htmlFor='password' className="login_form_label">Password:</label>
                    <input 
                        type='string'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password...'
                        className="login_form_input"/>
                </div>
                <button className='login_form_button'>Login</button>
            </form>
        </div>
    );
}
