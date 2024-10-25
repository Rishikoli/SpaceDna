import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const Astronaut = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    // Create Scene
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      // Set transparent background
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

      // Camera
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        BABYLON.Tools.ToRadians(180), // Adjusted alpha for better angle
        BABYLON.Tools.ToRadians(90), // Adjusted beta for a lower angle
        120, // Adjusted radius for better fit
        new BABYLON.Vector3(0, 20, 0), // Positioning to center the upper body
        scene
      );
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = 80; // Prevents getting too close
      camera.upperRadiusLimit = 200; // Prevents getting too far

      // Lights
      const ambientLight = new BABYLON.HemisphericLight(
        "ambientLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 0.4;

      const directionalLight = new BABYLON.DirectionalLight(
        "directionalLight",
        new BABYLON.Vector3(-1, -2, -3),
        scene
      );
      directionalLight.position = new BABYLON.Vector3(5, 5, 10);
      directionalLight.intensity = 2;

      const spotLight = new BABYLON.SpotLight(
        "spotLight",
        new BABYLON.Vector3(0, 15, 5),
        new BABYLON.Vector3(0, -1, 0),
        Math.PI / 6,
        0.3,
        scene
      );
      spotLight.intensity = 2;

      const pointLight = new BABYLON.PointLight(
        "pointLight",
        new BABYLON.Vector3(-5, -5, 5),
        scene
      );
      pointLight.diffuse = new BABYLON.Color3(1, 0.8, 0.6);
      pointLight.intensity = 1;

      // Load GLB Model
      BABYLON.SceneLoader.ImportMesh(
        "",
        "src/assets/3dmodels/Astronaut/",
        "tripo_astronaut_2_stylized_and_animated 2.glb",
        scene,
        (meshes) => {
          const model = meshes[0];
          model.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(275), 0); // Rotate slightly to the right
          model.scaling = new BABYLON.Vector3(30.5, 30.5, 30.5); // Increased scaling

          // Adjust position to move it upwards and to the right
          model.position.y += 7; // Move upwards
          model.position.x += 5; // Move to the right

          // Create a clipping plane to hide lower body
          const clipPlane = new BABYLON.Plane(0, -1, 0, -10); // Adjust the "d" value to change clip height
          scene.clipPlane = clipPlane;
        }
      );

      return scene;
    };

    const scene = createScene();

    // Resize the Engine when Window Resizes
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    return () => {
      engine.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "700px",
        position: "relative",
        zIndex: -1, // Ensure the canvas stays in the background
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1, // Ensure the canvas stays in the background
          pointerEvents: "none", // Allow clicks to pass through
        }}
      />
    </div>
  );
};

export default Astronaut;
