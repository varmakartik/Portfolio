import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// Tech-themed loading texts that cycle during load
const BOOT_LINES = [
  'Initializing runtime environment...',
  'Loading React & Next.js modules...',
  'Connecting to Node.js backend...',
  'Syncing Supabase database layer...',
  'Bootstrapping Express API routes...',
  'Mounting component tree...',
  'Compiling Tailwind styles...',
  'Resolving dependency graph...',
  'All systems operational.',
]

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')
  const [bootLine, setBootLine] = useState(0)
  const canvasRef = useRef(null)

  // 5-second calibrated progress + boot log cycling
  useEffect(() => {
    const totalDuration = 5000
    const intervalTime = 50
    const increment = 100 / (totalDuration / intervalTime)
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => setPhase('complete'), 300)
        setTimeout(() => {
          setPhase('exit')
          setTimeout(onComplete, 700)
        }, 1200)
      } else {
        setProgress(Math.floor(current))
      }
    }, intervalTime)

    // Cycle boot log messages
    const lineInterval = setInterval(() => {
      setBootLine(prev => Math.min(prev + 1, BOOT_LINES.length - 1))
    }, 580)

    return () => {
      clearInterval(interval)
      clearInterval(lineInterval)
    }
  }, [onComplete])

  // Three.js Neural Network Graph
  useEffect(() => {
    if (!canvasRef.current) return
    const container = canvasRef.current
    const W = 380
    const H = 320

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- Build Neural Network Nodes ---
    const NODE_COUNT = 42
    const positions = []
    const nodeGroup = new THREE.Group()

    for (let i = 0; i < NODE_COUNT; i++) {
      // Distribute nodes in a sphere shell
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.8 + Math.random() * 0.8

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      positions.push(new THREE.Vector3(x, y, z))

      // Node sphere
      const isHighlight = i % 6 === 0
      const geo = new THREE.SphereGeometry(isHighlight ? 0.065 : 0.038, 8, 8)
      const mat = new THREE.MeshBasicMaterial({
        color: isHighlight ? 0xEC4899 : 0x2563EB,
        transparent: true,
        opacity: isHighlight ? 0.9 : 0.65,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.userData = { pulse: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 1.2 }
      nodeGroup.add(mesh)
    }
    scene.add(nodeGroup)

    // --- Build Edges (connect nearby nodes) ---
    const edgeGroup = new THREE.Group()
    const CONNECTION_DIST = 1.8

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = positions[i].distanceTo(positions[j])
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.3

          const lineGeo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]])
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x38BDF8,
            transparent: true,
            opacity,
          })
          edgeGroup.add(new THREE.Line(lineGeo, lineMat))
        }
      }
    }
    scene.add(edgeGroup)

    // --- Data packets traveling along edges (optional: small moving spheres) ---
    const packetGeo = new THREE.SphereGeometry(0.025, 6, 6)
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xEC4899, transparent: true, opacity: 0.9 })
    const packets = []
    const PACKET_COUNT = 6

    for (let k = 0; k < PACKET_COUNT; k++) {
      const i = Math.floor(Math.random() * NODE_COUNT)
      let j = Math.floor(Math.random() * NODE_COUNT)
      while (j === i) j = Math.floor(Math.random() * NODE_COUNT)

      const mesh = new THREE.Mesh(packetGeo, packetMat)
      scene.add(mesh)
      packets.push({ mesh, from: positions[i], to: positions[j], t: Math.random(), speed: 0.004 + Math.random() * 0.006 })
    }

    // Animation loop
    let animationId
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      // Slowly rotate the whole network
      nodeGroup.rotation.y = elapsed * 0.18
      nodeGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.12
      edgeGroup.rotation.y = elapsed * 0.18
      edgeGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.12

      // Pulse each node
      nodeGroup.children.forEach(child => {
        const { pulse, speed } = child.userData
        child.scale.setScalar(1 + Math.sin(elapsed * speed + pulse) * 0.22)
      })

      // Move data packets along edges
      packets.forEach(p => {
        p.t += p.speed
        if (p.t > 1) {
          p.t = 0
          // reassign to new random edge
          const i = Math.floor(Math.random() * NODE_COUNT)
          let j = Math.floor(Math.random() * NODE_COUNT)
          while (j === i) j = Math.floor(Math.random() * NODE_COUNT)
          p.from = positions[i]
          p.to = positions[j]
        }
        p.mesh.position.lerpVectors(p.from, p.to, p.t)
        // Rotate packets with the group
        p.mesh.position.applyEuler(new THREE.Euler(
          Math.sin(elapsed * 0.1) * 0.12 - Math.sin((elapsed - 0.016) * 0.1) * 0.12,
          elapsed * 0.18 - (elapsed - 0.016) * 0.18,
          0
        ))
      })

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#F8FAFC' }}
        >
          {/* Soft background aurora */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[10%] w-96 h-96 rounded-full opacity-[0.05] blur-[120px]"
              style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }} />
            <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full opacity-[0.04] blur-[100px]"
              style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }} />
          </div>

          {/* Three.js canvas (neural network) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div ref={canvasRef} />
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs font-grotesk font-semibold tracking-[0.2em] uppercase text-[#2563EB] mb-6 -mt-2"
          >
            Neural Stack · Loading
          </motion.p>

          {/* Terminal boot log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-72 sm:w-96 mb-6 font-mono text-xs text-slate-500 h-5 overflow-hidden text-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={bootLine}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                <span className="text-[#2563EB] mr-1">▶</span>
                {BOOT_LINES[bootLine]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 sm:w-80">
            <div className="h-[2px] w-full rounded-full bg-slate-200 overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #EC4899 100%)',
                  boxShadow: '0 0 10px rgba(37, 99, 235, 0.5)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-grotesk text-slate-400 tracking-wider uppercase">System Boot</span>
              <span className="text-[10px] font-grotesk font-bold text-[#2563EB] tabular-nums">{progress}%</span>
            </div>
          </div>

          {/* Success flash */}
          <AnimatePresence>
            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none z-30"
                style={{ background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
