import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./Space.css";

// Component to load and enhance the GLB model
const Model = () => {
  const { scene } = useGLTF("/src/assets/3dmodels/Earth/earth.glb"); // Ensure this path is correct
  const earthRef = useRef();

  // Animate rotation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003; // Slow rotation for a realistic effect
    }
  });

  // Modify the water material to be more blue and reflective
  scene.traverse((obj) => {
    if (obj.isMesh) {
      if (obj.material.name === "WaterMaterial") {
        // Ensure this matches the material in your model
        obj.material.color = new THREE.Color("#1E90FF"); // Light blue color for water
        obj.material.roughness = 0.1; // Make water reflective
        obj.material.metalness = 0.3; // Add slight metallic effect to give depth
      }
    }
  });

  return <primitive object={scene} scale={[5, 5, 5]} ref={earthRef} />; // Scale the model appropriately
};

const Space = () => {
  return (
    <div className="welcome-container">
      <div className="Info">
        <div className="box">
          <h1 className="text-white font-bold text-8xl font-Nebula2">Earth</h1>
          <h2 className="text-white font-thin font-Nebula text-5xl">"Home"</h2>
        </div>
        <div className="box text-center">
          <h1
            className="text-white font-Nebula3 text-7xl font-semibold 
          animate-fade-in-out
          "
          >
            Welcome To Our Solar System
          </h1>
        </div>
        <div className="box"></div>
      </div>
      <div className="Earth">
        {/* Canvas for rendering the 3D model */}
        <Canvas className="canvas" camera={{ position: [0, 0, -20], fov: 8 }}>
          {" "}
          {/* Adjusted camera position */}
          {/* Ambient lighting with a slight blue tint to enhance water */}
          <ambientLight intensity={0.6} color={"#b0e0e6"} />
          {/* Directional light acting as sunlight */}
          <directionalLight
            position={[50, 30, 50]}
            intensity={1.2}
            color={"#fff5d7"}
            castShadow
          />
          {/* Point light for added glowing effect */}
          <pointLight position={[0, 0, 5]} intensity={1.5} color={"#ffd700"} />
          <Model /> {/* Render the animated 3D model */}
          <OrbitControls
            enableZoom={true} // Allow zooming in/out
            maxDistance={30} // Increase maximum zoom-out distance
            minDistance={5} // Set minimum zoom-in distance for better visibility
            target={[0, 0, 0]} // Center controls on the Earth model
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Space;
