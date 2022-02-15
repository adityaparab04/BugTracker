import React from 'react';

import { AssignEmployee } from '../components/AssignEmployee';

export const UnAssignedBug = (props) => {
    const {bug, employees, className, dlt} = props

    const onClick = () => {
        dlt(bug.bug_id);
    }

    return (
        <>
            <div className={`bug__container ${className}`}>
                <p><span className="bug__titles">Client Username:</span> {bug.client_username}</p>
                <p><span className="bug__titles">Project:</span> {bug.project}</p>
                <p><span className="bug__titles">Bug:</span> {bug.bug}</p>
                <p><span className="bug__titles">Bug Status:</span> {bug.bug_status}</p>
                <p><span className="bug__titles">Solution:</span> {bug.solution}</p>
                <AssignEmployee employees={employees} bug_id={bug.bug_id}/>
                <button className="bug_button bug_button_delete" onClick={onClick}>Delete</button>
            </div>
        </>
    );
}