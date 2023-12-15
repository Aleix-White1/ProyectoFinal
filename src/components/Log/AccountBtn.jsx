import React from 'react'

import Style from './styles/AccountBtn.module.css'

export const AccountBtn = (props) => {
    return (
    <button onClick={props.onClick} className={Style.btnAccount} type='submit'>
        {props.text}
    </button>
)
}
export default AccountBtn
