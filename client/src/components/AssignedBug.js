import React from 'react';

export const AssignedBug = (props) => {
    const {bug, className, unassign, dlt} = props

    const onClick = () => {
        unassign(bug.bug_id);
    }

    const deleteClick = () => {
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
                <p><span className="bug__titles">Working Employee:</span> {bug.working_emp_name}</p>
                <button className="bug_button bug_button_unassign" onClick={onClick}>Unassign</button>
                <button className="bug_button bug_button_delete" onClick={deleteClick}>Delete</button>
            </div>
        </>
    );
}