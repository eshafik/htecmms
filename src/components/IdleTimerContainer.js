import React, {useRef} from 'react';
import IdleTimer from "react-idle-timer";
import {connect} from 'react-redux';

import {userLogOut} from "../store/actions/auth";

const IdleTimerContainer = (props) => {
    const idleTimerRef = useRef(null);
    const onIdle = () => {
        console.log("User Idle");
        // props.userLogOut();
    }
    return(
        <div>
            <IdleTimer
                ref={idleTimerRef}
                timeout={216000*1000} // 30 seconds
                onIdle={onIdle}
            />
        </div>
    );
};

export default connect(null, {userLogOut})(IdleTimerContainer);