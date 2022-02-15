import React from 'react';

export const ClientBug = (props) => {
    const {bug , dlt, deny, confirm} = props

    const deleteClick = () => {
        dlt(bug.bug_id);
    }

    const denyClick = () => {
        deny(bug.bug_id);
    }

    const confirmClick = () => {
        confirm(bug.bug_id);
    }

    return (
        <>
            <div className={
                bug.bug_status === 'solved' ? 'bug__container bug__container__green':
                bug.bug_status === 'unassigned' ? 'bug__container bug__container__red':
                bug.bug_status === 'assigned' ? 'bug__container bug__container__blue':
                bug.bug_status === 'solution is given' ? 'bug__container bug__container__yellow':
                'bug__container bug__container__orangered'
            }>
                <p><span className="bug__titles">Project:</span> {bug.project}</p>
                <p><span className="bug__titles">Bug:</span> {bug.bug}</p>
                <p><span className="bug__titles">Bug Status:</span> {bug.bug_status}</p>
                {
                    bug.bug_status != 'unassigned' && <p><span className="bug__titles">Working Employee:</span> {bug.working_emp_name}</p>
                }
                {
                    bug.bug_status == 'solution is given' &&
                    <div className="bug__solution__container">
                        <p><span className="bug__titles">Solution:</span> {bug.solution}</p>
                        <button className="bug_button bug_button_assign" onClick={denyClick}>Deny</button>
                        <button className="bug_button bug_button_confirm" onClick={confirmClick}>Confirm</button>
                    </div>
                }
                {
                    bug.bug_status == 'solved' &&
                    <p><span className="bug__titles">Solution:</span> {bug.solution}</p>
                }
                {
                    bug.bug_status == 'solution not working' &&
                    <p><span className="bug__titles">Solution:</span> {bug.solution}</p>
                }
                <button className="bug_button bug_button_delete no_margin" onClick={deleteClick}>Delete</button>
            </div>
        </>
    );
}