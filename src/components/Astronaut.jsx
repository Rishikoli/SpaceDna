import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Cache } from "three";

const Astronaut = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const scrollSpeedRef = useRef(0.001); // Reduced speed

  useEffect(() => {
    // Enable GLTFLoader cache for faster reloads
    Cache.enabled = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjust the aspect ratio later
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    // Set renderer and camera based on container size
    const setRendererSize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    setRendererSize();
    camera.position.z = 90;

    // Load GLB Model with caching enabled
    const loader = new GLTFLoader();
    const modelPath = "src/assets/3dmodels/Astronaut/space_shuttle.glb";

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Rotate model to make the front point to the right
        model.rotation.x = Math.PI / 3.5; // Rotate 90 degrees up on X-axis
        model.rotation.y = -Math.PI / 3; // Rotate 90 degrees to the right on Y-axis

        scene.add(model);

        // Modify Material to Make It Brighter and Sharper
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.emissive = new THREE.Color(0x404040); // Slight glow
            child.material.emissiveIntensity = 0.1; // Adjust as needed
            child.material.metalness = 0.1; // More reflective, adjust as needed
            child.material.roughness = 1; // Less rough for shininess
            child.material.needsUpdate = true;
          }
        });

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(5, 5, 10); // Position it diagonally for better depth
        directionalLight.castShadow = true; // Enable shadows for more detail

        directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        scene.add(directionalLight);

        const spotLight = new THREE.SpotLight(0xffffff, 2);
        spotLight.position.set(0, 15, 5); // Place it above the model
        spotLight.castShadow = true; // Enable shadows
        spotLight.angle = Math.PI / 6; // Narrower angle for focused light
        spotLight.penumbra = 0.3; // Softer edges for a smoother look
        scene.add(spotLight);

        const pointLight = new THREE.PointLight(0xffccaa, 1.5);
        pointLight.position.set(-5, -5, 5); // Slight warm light to bring out more texture details
        scene.add(pointLight);

        animate();
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    // Animate the 3D Model with rotation
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += scrollSpeedRef.current; // Optional rotation for animation
      }

      renderer.render(scene, camera);
    };

    // Handle Window Resizing
    const handleResize = () => {
      setRendererSize();
    };

    // Handle Scroll Event
    const handleScroll = (event) => {
      const scrollY = window.scrollY;
      scrollSpeedRef.current = scrollY * 0.001; // Adjust scroll-based speed
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "700px",
        position: "relative",
        zIndex: 100,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", bottom: 0, left: 0, zIndex: 100 }}
      />
    </div>
  );
};

export default Astronaut;
