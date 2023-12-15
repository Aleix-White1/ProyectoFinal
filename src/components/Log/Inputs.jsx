import React from 'react'
import Style from './styles/inputs.module.css'

export const Inputs = (props) => {
    return (
    <>
        <label className={Style.label} htmlFor="input">{props.label}</label>
        <input className={Style.inputs} type={props.input} name={props.input} id={props.id} placeholder={props.placeholder}/>
    </>

    )
}
export default Inputs