import React from 'react';
import Inputs from './Inputs.jsx';
import AccountBtn from './AccountBtn.jsx';
import LogoTH from './LogoTH.jsx';
import HomeBtn from './HomeBtn.jsx';
import { Link } from "react-router-dom";
// CS
import Styles from './styles/MainLogin.module.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Login = () => {
    function logged(result) {
        try {
            if (!result) {
                Swal.fire({
                    icon: "error",
                    title: "Error en las credenciales",
                });

                return;
            }

            var response = JSON.parse(result);

            if (response !== null) {
                Swal.fire({
                    icon: "success",
                    title: "Usuario Correcto",
                });
                setTimeout(() => {
                    window.location.href = '/Pantalla1';
                }, 2000);

                console.log("Usuario autenticado:", response);
            }
        } catch (error) {
            console.error('Error al parsear JSON:', error);
        }
    }

    function login() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "user_password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/users", requestOptions)
            .then(response => response.text())
            .then(result => {
                localStorage.setItem('username', username);
                console.log(username)
                // localStorage.setItem('')
                logged(result)
            })
            .catch(error => {
                console.error("Error en el fetch:", error);
                alert("Error en el fetch")
                // Puedes agregar un manejo de error adicional si es necesario
            });
    }

    return (
        <>
            <HomeBtn />
            <div className={Styles.container}>
                <div className={Styles.inputs}>
                    <LogoTH />
                    <h1 className={Styles.title}>Login an account</h1>
                    <p className={Styles.p}>Don't have an account? <Link to='/register' className={Styles.asd}> Register</Link></p>
                    <Inputs input={"username"} label={"Username"} placeholder={"Paquito77"} id="username" />
                    <Inputs input={"password"} label={"Password"} placeholder={"··············"} id="password" />
                    <AccountBtn onClick={login} text={"Login"}></AccountBtn>
                </div>
            </div>
        </>
    );
}

export default Login;