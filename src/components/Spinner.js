import React from 'react';


const Spinner = () => {
    return (
        <div className="text-center">
            <div className="spinner-border m-5 text-info" style={{width: '4rem', height: '4rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default Spinner;