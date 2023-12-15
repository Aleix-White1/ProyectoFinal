import React from "react";
import {Link} from "react-router-dom";
import LogoTHREE from "./LogoTHREE";
//CSS
import Styles from "./StylePrincipal.module.css";


export const IndexPaginaPrincipal = () => {
  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.titulo}>
          <h2><Link to='/'>Task Hub</Link></h2>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
            <li>
              <a href="#">Servicios</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </nav>
        <div className={Styles.botones}>
        <Link to="/login"><button className={Styles.sign_in}>Sign in</button></Link>
        <Link to="/register"><button className={Styles.get_started}>Get started</button></Link> 
        </div>
      </header>
      <section className={Styles.container}>
        <div className={Styles.info}>
            <h1>Organitation task <br /> for developers</h1><br />
            <p>The best api to organize group tasks. <br />
            Create tasks, change status and complete projects</p>
            <br /><br />
            <button className={Styles.get_started}>Get started</button>
            <button className={Styles.sign_in}>Documentation</button>
        </div>
        <div id="logoTHREE" className={Styles.cubo}></div>
        <LogoTHREE />
      </section>
      <div className={Styles.flecha}>
      <a href="#nosotros"><img src="src\assets\flecha.jpg" alt=""/></a>
      </div>
      <section className={Styles.nosotros} id="nosotros">
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing <br /> Fugiat, nam aliquam incidunt alias quo iusto cupiditate, <br /> veniam temporibus neque sit quod amet repudiandae explicabo voluptas numquam ab reiciendis deserunt officia.</div>
        <div><img src="src\assets\TH.jpeg" alt=""/></div>
      </section>
    </>
  );
};
export default IndexPaginaPrincipal;
