import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Car from './components/Car'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import Stand from './components/Stand'
import CornerNav from './components/CornerNav'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const App = () => {
  const [CarScale, setCarScale] = useState(1)
  const [StandScale, setStandScale] = useState(1)
  const [IsMobile, setIsMobile] = useState(false)
  const [PanelOpen, setPanelOpen] = useState(false)

  const panelRef = useRef(null)
  const arrowRef = useRef(null)


  // RESPONSIVENESS
  useEffect(() => {
    const resize_handler = () => {
      if (window.innerWidth < 540) {
        setCarScale(0.5)
        setStandScale(1)
        setIsMobile(true)
      } else {
        setCarScale(1)
        // setStandPosition(0, -0.3, 0)
        setStandScale(2)
        setIsMobile(false)
      }
    }
    resize_handler()
    window.addEventListener('resize', resize_handler)
    return () => window.removeEventListener('resize', resize_handler)
  }, [])




  // DATA
  const changebles = [
    { id: 1, name: 'Body', obj: 5 },
    { id: 2, name: 'Doors', obj: 6 },
    { id: 3, name: 'GlassHouse', obj: 11 },
    { id: 4, name: 'Alloys', obj: 30 },
    { id: 5, name: 'Ext. Parts', obj: 17 },
  ]



  // MAIN LOGIC
  const [SelectedPart, setSelectedPart] = useState(null)
  const [SelectedColor, setSelectedColor] = useState('#FF0000')

  const PartSelection = (n) => {
    setSelectedPart(`Object_${n.toString()}`)
  }



  // ANIMATIONS
  // Initial mount: hide panel offscreen on mobile
  useGSAP(() => {
    if (!panelRef.current) return
    if (IsMobile) {
      gsap.set(panelRef.current, { x: '-100%' })
    } else {
      gsap.set(panelRef.current, { x: '0%' })
    }
  }, [IsMobile])

  // Animate panel + arrow whenever PanelOpen or IsMobile changes
  useGSAP(() => {
    if (!panelRef.current || !arrowRef.current) return

    if (!IsMobile) {
      // Desktop: always visible, no arrow
      gsap.to(panelRef.current, { x: '0%', duration: 0.35, ease: 'power2.out' })
      return
    }

    if (PanelOpen) {
      // Slide panel in
      gsap.to(panelRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power3.out',
      })
      // Rotate arrow image to point left
      gsap.to(arrowRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    } else {
      // Slide panel out
      gsap.to(panelRef.current, {
        x: '-100%',
        duration: 0.35,
        ease: 'power3.in',
      })
      // Rotate arrow back to point right
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }, [PanelOpen, IsMobile])

  return (
    <section className='w-screen h-screen overflow-hidden'>
      {/* Canvas */}
      <Canvas
        dpr={[1, 5]}
        camera={{ position: [2.5, 2, 3.8], rotation: [-0.5, 0.5, 0.3] }}
        className='z-10'
      >
        <spotLight position={[0.5, 2, 0]} color={0xFFFFFF} intensity={3} angle={Math.PI / 5} castShadow />
        <spotLight position={[-0.1, 2, 0]} color={0xFFFFFF} intensity={1} angle={Math.PI / 5} castShadow />
        <spotLight position={[0.2, 2, 0]} color={0xFFFFFF} intensity={1} angle={Math.PI / 5} castShadow />
        <spotLight position={[-0.2, 2, 0]} color={0xFFFFFF} intensity={1} angle={Math.PI / 5} castShadow />
        <spotLight position={[0.3, 2, 0]} color={0xFFFFFF} intensity={1} angle={Math.PI / 5} castShadow />
        <spotLight position={[-0.3, 2, 0]} color={0xFFFFFF} intensity={1} angle={Math.PI / 5} castShadow />

        <group>
          <Car Scale={CarScale} SelectedPart={SelectedPart} SelectedColor={SelectedColor} />
          <Stand Scale={StandScale} IsMobile={IsMobile}/>
        </group>

        <Environment files='./hdri_0.hdr' />
        <EffectComposer />
        <OrbitControls autoRotate autoRotateSpeed={2} />
      </Canvas>

      {/* HTML Overlay */}
      <div className='w-full h-full absolute top-0 left-0 z-99 pointer-events-none'>

        {/* ── Body Parts Panel ── */}
        <div
          ref={panelRef}
          id='Parts'
          className='absolute top-0 left-0 h-full py-20 w-max pointer-events-auto'
          style={{ willChange: 'transform' }}
        >
          <div className='w-full h-full flex flex-col gap-y-2 items-start justify-center ml-3'>
            {changebles.map((part) => (
              <button
                key={part.id}
                onClick={() => PartSelection(part.obj)}
                className='hover:bg-[#222] active:bg-[#222] transition-all duration-150 text-white w-fit h-fit py-2 px-7 rounded-lg border border-[#222]'
              >
                {part.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Toggle Arrow (mobile only) ── */}
        {IsMobile && (
          <button
            onClick={() => setPanelOpen((prev) => !prev)}
            className='pointer-events-auto absolute top-1/2 -translate-y-1/2 z-50'
            style={{
              left: PanelOpen ? 'calc(var(--panel-width, 112px) + 4px)' : '4px',
              transition: 'left 0.35s cubic-bezier(0.8, 0, 0.2, 1)',
              background: 'rgba(0,0,0,0.55)',
              borderRadius: '50%',
              padding: '6px',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={PanelOpen ? 'Close panel' : 'Open panel'}
          >
            {/* Arrow image – rotated via GSAP */}
            <img
              ref={arrowRef}
              src='./right.png'
              alt={PanelOpen ? 'Close' : 'Open'}
              style={{
                width: 24,
                height: 24,
                display: 'block',
                willChange: 'transform',
              }}
            />
          </button>
        )}

        {/* ── Color Picker ── */}
        <div className='Color-Picker w-screen h-1/2 absolute bottom-0 left-0 flex justify-center flex-col gap-3 text-2xl font-semibold uppercase items-center pt-16'>
          <input
            type='color'
            value={SelectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className='w-28 h-12 p-0 border outline-none bg-transparent cursor-pointer pointer-events-auto'
          />
          <h1>Choose Color</h1>
        </div>
      </div>
    </section>
  )
}

export default App
