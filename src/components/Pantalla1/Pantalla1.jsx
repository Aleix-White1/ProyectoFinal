import React from "react";
import { Link } from "react-router-dom";

import Styles from "./Pantalla1.module.css";
import Swal from "sweetalert2";

async function obtenerProyectosUsuario(id) {
    var url = `http://localhost:8080/project/${id}`;

    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            var listaProyectos = data;
            console.log(listaProyectos);

            const botones_proyects = document.getElementById("botones-proyectos");
            listaProyectos.forEach((proyecto) => {
                var newButton = document.createElement("button");
                newButton.appendChild(document.createTextNode(proyecto.project_name));
                botones_proyects.appendChild(newButton);
            });
        })
        .catch((error) => {
            console.error("Error en la solicitud fetch:", error);
        });
}

function crearProyecto() {
    const project_name = document.getElementById("nombre").value;
    const project_descripton = document.getElementById("descripcion").value;
    const project_date_start = document.getElementById("fecha-inicio").value;
    const project_date_end = document.getElementById("fecha-fin").value;

    if (project_name === '' || project_descripton === '' || project_date_start == '' || project_date_end == '') {
        Swal.fire({
            icon: 'error',
            title: 'Es necesario rellenar todos los campos'
        })
        return 0
    }

    var start_date = dateFormat(project_date_start);
    var end_date = dateFormat(project_date_end);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        project_name: project_name,
        project_description: project_descripton,
        project_start_date: start_date,
        project_estimated_end_date: end_date,
        project_user_id:
        {
            user_id: 5
        }
        ,
    });

    //alert(raw);
    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/project", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error("Error", error));

    obtenerProyectosUsuario(5);
}

function dateFormat(fecha) {
    var resFecha = fecha.split("/");
    var reversedFecha = resFecha.reverse();
    var FechaOb = reversedFecha.join('/');
    return FechaOb;
}

// Llama a la función para obtener los proyectos del usuario con ID 1
obtenerProyectosUsuario(5); // Cambia el argumento según el ID que desees obtener

export const Pantalla1 = () => {
    var username = localStorage.getItem('username')

    return (
        <div>
            <header className={Styles.header}>
                <div className={Styles.titulo}>
                    <h2><Link to="/">Task Hub</Link></h2>
                </div>
                <nav>
                    <ul>
                        <li>Bienvenido {username}</li>
                    </ul>
                </nav>
                <div className={Styles.botones}>
                    <button className={Styles.sign_in}>
                        <Link to="/">Sign out</Link>
                    </button>
                </div>
            </header>
            <section>
                <div className={Styles.formContainer}>
                    <h1>Crear Nuevo Proyecto</h1>
                    <form>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" required />

                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" name="descripcion" required></textarea>

                        <label htmlFor="fecha-inicio">Fecha de Inicio</label>
                        <input type="date" id="fecha-inicio" name="fecha-inicio" required />

                        <label htmlFor="fecha-fin">Fecha de Finalización</label>
                        <input type="date" id="fecha-fin" name="fecha-fin" required />

                        <input
                            type="submit"
                            value="Crear Proyecto"
                            onClick={crearProyecto}
                        />
                    </form>
                </div>
                <div className={Styles.formContainer2}>
                    <h1>Mis Proyectos</h1>
                    <div className={Styles.botonesProyectos} id="botones-proyectos">
                    </div>
                </div>
            </section>
        </div>
    );
};