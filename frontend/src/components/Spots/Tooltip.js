import React from 'react';

function Tooltip({ text, children }) {
    return (
        <div className='tooltipContainer'>
            {children}
            <div className='tooltipText'>{text}</div>
        </div>
    )
}

export default Tooltip;
