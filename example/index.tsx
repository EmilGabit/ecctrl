import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "../example/Experience";
// import { Leva } from "leva";
import { EcctrlJoystick } from "../src/EcctrlJoystick";
import { Suspense, useEffect, useState } from "react";
import { Bvh } from "@react-three/drei";
import { TelegramInit, useTelegram } from "./Telegram";
// import TelegramInit from "./Telegram";
const root = ReactDOM.createRoot(document.querySelector("#root"));

// const EcctrlJoystickControls = () => {
//   const [isTouchScreen, setIsTouchScreen] = useState(false)
//   useEffect(() => {
//     // Check if using a touch control device, show/hide joystick
//     if (('ontouchstart' in window) ||
//       (navigator.maxTouchPoints > 0)) {
//       setIsTouchScreen(true)
//     } else {
//       setIsTouchScreen(false)
//     }
//   }, [])
//   return (
//     <>
//       {isTouchScreen && <EcctrlJoystick buttonNumber={5} />}
//     </>
//   )
// }

const EcctrlJoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const isTelegram = useTelegram(); // Используем хук из модуля

  useEffect(() => {
    setIsTouchScreen(isTelegram || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, [isTelegram]);

  return <>{isTouchScreen && <EcctrlJoystick buttonNumber={5} />}</>;
};


root.render(
  <>
    <TelegramInit />
    {/* <Leva collapsed /> */}
    <EcctrlJoystickControls />
    <Canvas
      shadows
      camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') {
          (e.target as HTMLCanvasElement).requestPointerLock()
        }
      }}
    >
      <Suspense fallback={null}>
        <Bvh firstHitOnly>
          <Experience />
        </Bvh>
      </Suspense>
    </Canvas>
  </>
);
