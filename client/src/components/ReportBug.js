import React, {useContext, useState} from 'react';

import { GlobalContext} from '../context/GlobalState';


export const ReportBug = (props) => {
    const { user_id, username } = useContext(GlobalContext);

    const [project, setProject] = useState('');
    const [bug, setBug] = useState('');

    const { report } = props

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            client_id: +user_id,
            client_username: username,
            project,
            bug
        }
        console.log(body);
        report(body);
    }

    return (
        <div className="report_bug_container">
            <form onSubmit={onSubmit} className="report_bug_form">
                <div className='report_bug_form_section'>
                    <label htmlFor='id' className="report_bug_form_label">Project:</label>
                    <input 
                        type='string'
                        name='project'
                        value={project} 
                        onChange = {(e) => setProject(e.target.value)}
                        placeholder='Enter the name of project...' 
                        className="report_bug_form_input"/>
                </div>
                <div className='report_bug_form_section'>
                    <label htmlFor='password' className="report_bug_form_label">Bug:</label>
                    <input 
                        type='string'
                        name='Bug'
                        value={bug}
                        onChange={(e) => setBug(e.target.value)}
                        placeholder='Enter The bug...'
                        className="report_bug_form_input"/>
                </div>
                <button className="bug_button bug_button_report">Report Bug</button>
            </form>
        </div>
    );
}