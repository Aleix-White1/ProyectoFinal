import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const LogoTHREE = () => {
    useEffect(() => {
        let geometry;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const container = document.getElementById("logoTHREE");
        container.innerHTML = ''; 
        renderer.setSize((window.innerWidth/2), (window.innerHeight/2));
        container.appendChild(renderer.domElement);
        
        const loader = new FontLoader();
        let controls;

        loader.load('src/fonts/font.json', (font) => {
            geometry = new TextGeometry('TH', {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 5,
                letterSpacing: -2
            });

            const textMesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                color: 0xfffffff,
                metalness: 1,
                roughness: 0.1
            }));

            scene.add(textMesh);

            textMesh.position.x = -10;
            textMesh.position.y = -5;
            textMesh.position.z = 0;

            camera.position.z = 17;
            camera.position.y = 10;
        });

        // Luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 100);
        scene.add(ambientLight);

        const directionalLightFront = new THREE.DirectionalLight(0xffffff, 100);
        directionalLightFront.position.set(1, -1, 1).normalize();
        scene.add(directionalLightFront);

        // Nueva luz en la parte posterior
        const directionalLightBack = new THREE.DirectionalLight(0xffffff, 100);
        directionalLightBack.position.set(-1, 1, -1).normalize();
        scene.add(directionalLightBack);

        // Inicializar controles de órbita
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;

        // Manejar el redimensionamiento de la ventana
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        });

        const animate = () => {
            requestAnimationFrame(animate);

            scene.rotation.y += 0.005;

            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        // Limpiar al desmontar el componente
        return () => {
            window.removeEventListener('resize', () => { });
        };
    }, []); // Dependencia vacía para que solo se ejecute una vez al montar el componente

    return null; // No renderiza ningún elemento, ya que todo ocurre en el useEffect
};

export default LogoTHREE;

