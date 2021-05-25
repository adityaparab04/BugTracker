import React, {useState} from 'react';

export const EmployeeBug = (props) => {
    const {bug, solve} = props
    
    const [solution, setSolution] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            bug_id: bug.bug_id,
            solution
        }
        solve(body);
    }

    return (
        <>
            <div className={
                bug.bug_status === 'solution not working' ? 'bug__container bug__container__red': 'bug__container'
            }>
                <p><span className="bug__titles">Project:</span> {bug.project}</p>
                <p><span className="bug__titles">Client:</span>{bug.client_username}</p>
                <p><span className="bug__titles">Bug:</span> {bug.bug}</p>
                <p><span className="bug__titles">Bug Status:</span> {bug.bug_status}</p>
                {
                    bug.bug_status === 'solution is given' &&
                    <p><span className="bug__titles">Given Solution:</span> {bug.solution}</p>
                }
                {
                    bug.bug_status === 'solution not working' &&
                    <p><span className="bug__titles">Previous Solution:</span> {bug.solution}</p>
                }
                <div className="solution__form__container">
                    <form onSubmit={onSubmit} className="solution__form">
                        <input 
                            type='string'
                            name='solution'
                            value={solution} 
                            onChange = {(e) => setSolution(e.target.value)}
                            placeholder='Enter the solution for the bug...' 
                            className="report_bug_form_input"/>
                        <button className="bug_button">Give Solution</button>
                    </form>
                </div>
            </div>
        </>
    );
}