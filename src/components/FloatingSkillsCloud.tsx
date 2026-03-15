import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { skillsTreeData, type SkillNode } from "./SkillsData";
import styles from "./FloatingSkillsCloud.module.css";

// Flatten the hierarchical skills data into a single array of skill nodes
const flattenSkills = (
  node: SkillNode,
  depth: number = 0,
): (SkillNode & { depth: number })[] => {
  let result: (SkillNode & { depth: number })[] = [];
  // Only include nodes that have an icon (the actual skills)
  if (node.icon) {
    result.push({ ...node, depth });
  }
  if (node.children) {
    node.children.forEach((child) => {
      result = result.concat(flattenSkills(child, depth + 1));
    });
  }
  return result;
};

const allSkills = flattenSkills(skillsTreeData);

const SkillNodeCard = ({
  node,
  position,
}: {
  node: SkillNode & { depth: number };
  position: THREE.Vector3;
}) => {
  const ref = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const color = node.color || "#00ff00";
  const Icon = node.icon;
  // Offset phase for organic bobbing
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      // Gentle floating animation
      ref.current.position.y =
        position.y + Math.sin(state.clock.elapsedTime * 1.2 + offset) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          distort={0.4}
          speed={3}
          roughness={0.2}
        />
      </mesh>

      <Html distanceFactor={14} center transform sprite zIndexRange={[100, 0]}>
        <div
          ref={labelRef}
          className={styles.skillTag}
          style={{
            ["--skill-color" as string]: color,
            ["--skill-color-alpha" as string]: `${color}60`,
            ["--skill-color-shadow" as string]: `${color}30`,
            ["--skill-color-strong" as string]: `${color}90`,
          }}
          onPointerOver={() => {
            if (!labelRef.current) return;
            labelRef.current.classList.add(styles.skillTagHovered);
          }}
          onPointerOut={() => {
            if (!labelRef.current) return;
            labelRef.current.classList.remove(styles.skillTagHovered);
          }}
        >
          {Icon && <Icon className={styles.skillIcon} />}
          <span>{node.name}</span>
        </div>
      </Html>
    </group>
  );
};

export default function FloatingSkillsCloud() {
  // Generate random spherical positions for each skill
  const positions = useMemo(() => {
    const pos = [];
    const radius = 6;
    for (let i = 0; i < allSkills.length; i++) {
      // Golden spiral method for somewhat even distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / allSkills.length); // Latitude
      const theta = Math.PI * (1 + Math.sqrt(5)) * i; // Longitude

      // Add a tiny bit of random radius variance so it's not a perfect sphere shell
      const r = radius * (0.8 + Math.random() * 0.4);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos.push(new THREE.Vector3(x, y, z));
    }
    return pos;
  }, []);

  return (
    <div className={styles.cloudRoot}>
      {/* Interaction instruction */}
      <div className={styles.instruction}>Drag around • Scroll to zoom</div>

      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 10, -10]} color="#00d4ff" intensity={1.5} />
        <pointLight position={[10, -10, 10]} color="#ff9500" intensity={1} />

        <group>
          {allSkills.map((skill, i) => (
            <SkillNodeCard
              key={skill.name}
              node={skill}
              position={positions[i]}
            />
          ))}
        </group>

        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={35}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
