import React, {useContext} from 'react';

import { GlobalContext} from '../context/GlobalState';


export const StatusBar = (props) => {
    const { logOut } = useContext(GlobalContext);

    const heading = props.props;

    const onClick = () => {
        logOut();
    }

    return (
        <div className="statusbar">
            <h1 className="statusbar__heading">{heading}</h1>
            <a onClick={onClick} className="statusbar_logout" href="#">Log Out</a>
        </div>
    );
}