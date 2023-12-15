import React from 'react';
import Inputs from './Inputs.jsx';
import AccountBtn from './AccountBtn.jsx';
import LogoTH from './LogoTH.jsx';
import HomeBtn from './HomeBtn.jsx';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


//CSS
import Styles from './styles/MainLogin.module.css';

const MainLogin = () => {

    function Regist() {
        const username = document.getElementById('username').value; // Obtener el valor del campo de usuario
        const email = document.getElementById('email').value; // Obtener el valor del campo de email
        const password = document.getElementById('password').value; // Obtener el valor del campo de contraseña
        const repeatPassword = document.getElementById('repeatpass').value; // Obtener el valor del campo de repetir contraseña
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password !== repeatPassword) {
            Swal.fire({
                icon: "error",
                title: "Las contraseñas tienen que coincidir!",
            });
            return;
        } else if (!username || !email || !password) {
            Swal.fire({
                icon: "error",
                title: "Tienes que rellenar todos los campos",
            });
            return;
        } else if (!emailFormat.test(email)) {
            Swal.fire({
                icon: "error",
                title: "El formato del email no es correcto!",
            });
            return;

        } else {
            Swal.fire({
                icon: "success",
                title: "Usuario creado!!",
            });
            setTimeout(() => {
                window.location.href = '/Pantalla1';
            }, 2000);
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "user_email": email,
            "user_password": password
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error('Error', error));
    }



    return (
        <>
            <HomeBtn />
            <div className={Styles.container}>
                <div className={Styles.inputs}>
                    <LogoTH />
                    <h1 className={Styles.title}>Create an account</h1>
                    <p className={Styles.p}>Already have an account ? <Link className={Styles.asd} to="/login">Log in</Link></p>
                    <Inputs id={"username"} input={"username"} label={"Username"} placeholder={"Paquito77"} />
                    <Inputs id={"email"} input={"email"} label={"Email"} placeholder={"example@email.com"} />
                    <Inputs id={"password"} input={"password"} label={"Password"} placeholder={"··············"} />
                    <Inputs id={"repeatpass"} input={"password"} label={"Repeat password"} placeholder={"··············"} />

                    <AccountBtn onClick={Regist} text={"Create an account"}></AccountBtn>
                </div>
            </div>
        </>
    );
}

export default MainLogin;
