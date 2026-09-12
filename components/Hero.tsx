"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import ChatAgent from "./ChatAgent";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const points = new Float32Array(600);
  for (let i = 0; i < points.length; i += 3) { points[i] = (Math.random() - .5) * 7; points[i + 1] = (Math.random() - .5) * 7; points[i + 2] = (Math.random() - .5) * 4; }
  useFrame(({ clock }) => { if (ref.current) { ref.current.rotation.y = clock.elapsedTime * .035; ref.current.rotation.x = Math.sin(clock.elapsedTime * .15) * .1; } });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} count={points.length / 3} array={points} itemSize={3} /></bufferGeometry><pointsMaterial color="#10b981" size={.018} transparent opacity={.75} /></points>;
}
export default function Hero() {
  return <section id="top" className="hero"><div className="hero-copy"><p className="eyebrow"><i /> SOFTWARE ENGINEER / AI SYSTEMS</p><h1>Building the<br /><strong>intelligence</strong><br />behind tomorrow.</h1><p className="hero-text">I&apos;m Anirudha Kurhade — engineering Generative AI products and scalable data pipelines that turn complex systems into useful experiences.</p><div className="hero-actions"><a className="button" href="#work">Explore selected work ↗</a><a className="quiet-link" href="#contact">Let&apos;s connect</a></div></div><div className="hero-canvas"><Canvas camera={{ position: [0, 0, 4.5] }}><ambientLight intensity={.4} /><Particles /></Canvas><span className="canvas-label">GENERATIVE SYSTEM / 001</span><ChatAgent /></div><div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div></section>;
}
