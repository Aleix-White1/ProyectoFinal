import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import Styles from './styles/HomeBtn.module.css'

export const HomeBtn = () => {
    return (
    <Link to="/"><button className={Styles.btn}>
        {`<`} Home
    </button></Link>
    )
}
export default HomeBtn
