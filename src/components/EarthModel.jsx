import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./EarthModel.css";

// Component to load and enhance the GLB model
const Model = () => {
  const { scene, materials } = useGLTF("./src/assets/earth.glb"); // Replace with the correct path to your .glb file
  const earthRef = useRef();

  // Animate rotation
  useFrame(() => {
    earthRef.current.rotation.y += 0.003; // Slow rotation for a realistic effect
  });

  // Modify the water material to be more blue and reflective
  scene.traverse((obj) => {
    if (obj.isMesh) {
      if (obj.material.name === "WaterMaterial") { // Replace with the actual water material name
        obj.material.color = new THREE.Color("#1E90FF"); // Light blue color for water
        obj.material.roughness = 0.1; // Make water reflective
        obj.material.metalness = 0.3; // Add slight metallic effect to give depth
      }
    }
  });

  return <primitive object={scene} scale={5} ref={earthRef} />;
};

const EarthModel = () => {
  return (
    <div className="welcome-container">
      <div className="text-container">
        <h1>Welcome to our Solar System</h1>
        <p>Explore the beauty of the Earth and beyond!</p>
      </div>

      {/* Canvas for rendering the 3D model */}
      <Canvas className="canvas">
        {/* Ambient lighting with a slight blue tint to enhance water */}
        <ambientLight intensity={0.6} color={"#b0e0e6"} />
        
        {/* Directional light acting as sunlight */}
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.2} 
          color={"#fff5d7"} 
          castShadow 
        />
        
        {/* Point light for added glowing effect */}
        <pointLight position={[0, 0, 5]} intensity={1.5} color={"#ffd700"} />

        <Model /> {/* Render the animated 3D model */}

        <OrbitControls
          enableZoom={true} // Allow zooming in/out
          maxDistance={25} // Limit maximum zoom out distance
          minDistance={3}  // Limit minimum zoom in distance to prevent too much closeness
        />
      </Canvas>
    </div>
  );
};

  export default EarthModel;