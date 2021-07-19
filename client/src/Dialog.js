import React from 'react'

function Dialog({show}) {

    if(!show){
        return <></>
    }

    return (
        <div className="overlay">
            <div className="dialog">
                <div className="dialog_content">
                    <h2 className='dialog_title'>Add a new Schedule</h2>
                </div>
            </div>
            <hr/>
            <div className='dialog_footer'>
                <button className='d_cancle'>Cancel</button>
                <button className='d_confirm'>Confirm</button>
            </div>
        </div>
    )
}

export default Dialog
