import React, { useState, useContext } from "react";

import { GlobalContext} from '../context/GlobalState';

export const AssignEmployee = (props) => {
    const {employees, bug_id} = props
    const [empId, setEmpId] = useState('');

    const { assignBug } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        let username = '';
        employees.map(employee => {
            if(employee.employee_id === +empId) {
                username = employee.username;
            }
        });
        const body = {
            bug_id,
            working_emp_id: +empId,
            working_emp_name: username
        }
        assignBug(body);
    }

    return (
        <form onSubmit={onSubmit}>
            <select
                name="assign employee" 
                value={empId}
                onChange={e => {
                    setEmpId(e.target.value)
                }}
                placeholder="select employee"
                className="bug_assign_select"
            >
                <option value=""> -- select an employee -- </option>
                {
                    employees.map((emp) => (
                        <option
                            key={emp.employee_id}
                            value={emp.employee_id}
                            placeholder="select employee"
                        >
                            {emp.username}
                        </option>)
                    )
                }
            </select>
            <button className="bug_button bug_button_assign">Assign</button>
        </form>
    );
}