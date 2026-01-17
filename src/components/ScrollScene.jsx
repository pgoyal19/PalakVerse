import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Float } from "@react-three/drei";
import { useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function SceneObjects({ theme }) {
  const group = useRef();
  const wireframeSphere = useRef();
  const isLight = theme === 'light';

  // Colors based on theme - grey/white/black
  const globeColor = isLight ? "#888888" : "#ffffff";
  const ringColor = isLight ? "#666666" : "#d4d4d4";
  const ringEmissive = isLight ? "#aaaaaa" : "#ffffff";
  const particleColor = isLight ? "#999999" : "#ffffff";
  const particleEmissive = isLight ? "#bbbbbb" : "#e5e5e5";

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.10;
    if (wireframeSphere.current) {
      wireframeSphere.current.rotation.x = clock.getElapsedTime() * 0.11;
    }
  });

  return (
    <group ref={group}>
      {/* Main wireframe globe */}
      <mesh ref={wireframeSphere}>
        <sphereGeometry args={[1.3, 60, 60]} />
        <meshBasicMaterial color={globeColor} wireframe lineWidth={2}/>
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, -1.2, 0]}>
        <torusGeometry args={[1.7, 0.022, 32, 120]} />
        <meshBasicMaterial color={ringColor} emissive={ringEmissive} emissiveIntensity={isLight ? 0.3 : 0.5}/>
      </mesh>

      {/* Floating spheres as orbiting particles */}
      {[...Array(7)].map((_,i) => (
        <mesh key={i} position={[
          1.32 * Math.cos((i/7)*2*Math.PI),
          0.55 * Math.sin((i/7)*2*Math.PI),
          1.09 * Math.cos((i/7)*2*Math.PI+1)
        ]}>
          <sphereGeometry args={[0.09, 18, 14]} />
          <meshStandardMaterial color={particleColor} emissive={particleEmissive} emissiveIntensity={isLight ? 0.6 : 0.8} />
        </mesh>
      ))}
    </group>
  );
}

function MovingCamera() {
  const scroll = useScroll();

  useFrame(({ camera }) => {
    camera.position.z = 4 + scroll.offset * 6;
    camera.position.y = -scroll.offset * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ScrollScene() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'light';

  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={theme === 'light' ? 0.6 : 0.4} />
      <directionalLight position={[3, 3, 3]} intensity={theme === 'light' ? 1 : 0.8} />

      <ScrollControls pages={5} damping={0.3}>
        <MovingCamera />
        <SceneObjects theme={theme} />
      </ScrollControls>
    </Canvas>
  );
}
