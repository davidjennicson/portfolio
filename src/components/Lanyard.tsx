import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  title?: string;
  subtitle?: string;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, title = "PORTFOLIO", subtitle = "ARCHIVE" }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} title={title} subtitle={subtitle} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// --- Procedural Texture Generators ---

function useFabricTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // White base (allows the mesh material color to tint it properly)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 128, 128);

    // Weave Pattern
    ctx.lineWidth = 4;
    for (let i = 0; i < 128; i += 8) {
      // Vertical threads (stronger)
      ctx.strokeStyle = i % 16 === 0 ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 128);
      ctx.stroke();

      // Horizontal threads (softer)
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(128, i);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(40, 1); // Repeats the texture along the strap length
    tex.needsUpdate = true;
    setTexture(tex);
  }, []);

  return texture;
}

function useNoiseTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.createImageData(256, 256);
    
    // Generate fast static noise
    for (let i = 0; i < imgData.data.length; i += 4) {
      const val = Math.random() * 255;
      imgData.data[i] = val;     // R
      imgData.data[i+1] = val;   // G
      imgData.data[i+2] = val;   // B
      imgData.data[i+3] = 255;   // A
    }
    
    ctx.putImageData(imgData, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    tex.needsUpdate = true;
    setTexture(tex);
  }, []);

  return texture;
}

function useDynamicCardTexture(title: string, subtitle: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 800;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 0); ctx.lineTo(40, 800);
    ctx.moveTo(0, 180); ctx.lineTo(512, 180);
    ctx.moveTo(0, 600); ctx.lineTo(512, 600);
    ctx.stroke();

    ctx.fillStyle = '#ff4f00';
    ctx.beginPath();
    ctx.arc(472, 140, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    
    ctx.font = '600 24px monospace';
    ctx.letterSpacing = "4px";
    ctx.fillText(subtitle.toUpperCase(), 60, 200);

    ctx.font = '800 72px sans-serif';
    ctx.letterSpacing = "-2px";
    
    const words = title.toUpperCase().split(' ');
    let y = 260;
    for(const word of words) {
        ctx.fillText(word, 55, y);
        y += 75;
    }

    ctx.fillStyle = 'white';
    let xOffset = 60;
    for(let i = 0; i < 25; i++) {
       const barWidth = Math.random() * 8 + 2;
       ctx.fillRect(xOffset, 640, barWidth, 60);
       xOffset += barWidth + (Math.random() * 6 + 2);
       if (xOffset > 450) break;
    }
    
    ctx.font = '400 16px monospace';
    ctx.fillText(`ID // ${Math.floor(Math.random() * 9000) + 1000}-${new Date().getFullYear()}`, 60, 720);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    
    setTexture(prev => { prev?.dispose(); return tex; });
  }, [title, subtitle]);

  return texture;
}

// --- Main Band Physics Assembly ---

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, title, subtitle }: { maxSpeed?: number; minSpeed?: number; isMobile?: boolean; title: string; subtitle: string; }) {
  const band = useRef<any>();
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  
  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 };
  
  // Custom Textures
  const cardTexture = useDynamicCardTexture(title, subtitle);
  const fabricTexture = useFabricTexture();
  const noiseTexture = useNoiseTexture();

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
    []
  );
  
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    
    if (fixed.current && card.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current) return;
        // @ts-ignore
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        
        // @ts-ignore
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        // @ts-ignore
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      
      curve.points[0].copy(j3.current.translation());
      // @ts-ignore
      curve.points[1].copy(j2.current.lerped);
      // @ts-ignore
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      if (band.current) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      
      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as any);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  useEffect(() => {
    curve.curveType = 'chordal';
  }, [curve]);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) => {
              if (card.current) {
                e.target.setPointerCapture(e.pointerId);
                const translation = card.current.translation();
                drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(translation.x, translation.y, translation.z)));
              }
            }}
          >
            {/* The Physical Card */}
            <mesh>
              <boxGeometry args={[1.15, 1.75, 0.02]} />
              <meshPhysicalMaterial
                color="#0a0a0a"
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.8}
                bumpMap={noiseTexture}
                bumpScale={0.002}
              />
              {/* The Dynamic Typography Plane */}
              {cardTexture && (
                <mesh position={[0, 0, 0.011]}>
                  <planeGeometry args={[1.1, 1.7]} />
                  <meshBasicMaterial map={cardTexture} transparent alphaTest={0.05} />
                </mesh>
              )}
            </mesh>
            
            {/* The Hardware */}
            {/* Clip (Ring) */}
            <mesh position={[0, 0.95, 0]}>
               <torusGeometry args={[0.08, 0.015, 16, 32]} />
               <meshStandardMaterial 
                 color="#ff4f00" 
                 roughness={0.4} 
                 metalness={0.6} 
                 bumpMap={noiseTexture}
                 bumpScale={0.005}
               />
            </mesh>
            {/* Clamp (Base connecting to card) */}
            <mesh position={[0, 0.85, 0]}>
               <boxGeometry args={[0.25, 0.15, 0.04]} />
               <meshStandardMaterial 
                 color="#333333" 
                 roughness={0.5} 
                 metalness={0.8}
                 bumpMap={noiseTexture}
                 bumpScale={0.005} 
               />
            </mesh>
          </group>
        </RigidBody>
      </group>
      
      {/* The Strap */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ff4f00"
          map={fabricTexture}
          useMap={1}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={1.5}
        />
      </mesh>
    </>
  );
}