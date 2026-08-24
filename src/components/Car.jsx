import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { compressNormals } from 'three/examples/jsm/utils/GeometryCompressionUtils.js';

const Car = ({ Scale, SelectedPart , SelectedColor}) => {
  const { nodes, materials } = useGLTF('../car.glb')
    useEffect(()=>{
      if(!nodes[SelectedPart]) return
      nodes[SelectedPart].material.color.set(SelectedColor)
    },[SelectedPart,SelectedColor])


  return (
      <group scale={Scale} dispose={null}>
      <group scale={0.01}>
        <group position={[77.776, 32.891, -127.364]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group position={[0.027, -0.164, -0.008]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.bone_caliper_BL_details_Material015_0.geometry}
              material={materials['Material.015']}
              position={[0.029, 0.004, 0.002]}
            />
          </group>
          <group position={[0.002, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelBL_rims_Material015_0.geometry}
              material={materials['Material.015']}
              position={[0.014, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelBL_tyres_Material005_0.geometry}
              material={materials['Material.005']}
              position={[0.014, 0, 0]}
            />
          </group>
        </group>
        <group position={[-77.8, 32.891, -127.364]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group position={[-0.026, -0.164, -0.008]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.bone_caliper_BR_details_Material015_0.geometry}
              material={materials['Material.015']}
              position={[-0.031, 0.002, 0.002]}
            />
          </group>
          <group position={[0.002, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelBR_rims_Material015_0.geometry}
              material={materials['Material.015']}
              position={[-0.014, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelBR_tyres_Material005_0.geometry}
              material={materials['Material.005']}
              position={[-0.014, 0, 0]}
            />
          </group>
        </group>
        <group position={[80.452, 30.968, 127.26]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group position={[0.028, 0.156, -0.017]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.bone_caliper_FL_details_Material015_0.geometry}
              material={materials['Material.015']}
              position={[0.03, 0.004, 0]}
            />
          </group>
          <group position={[0.002, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelFL_rims_Material015_0.geometry}
              material={materials['Material.015']}
              position={[0.014, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelFL_tyres_Material005_0.geometry}
              material={materials['Material.005']}
              position={[0.014, 0, 0]}
            />
          </group>
        </group>
        <group position={[-79.832, 30.968, 127.26]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group position={[-0.034, 0.156, -0.017]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.bone_caliper_FR_details_Material015_0.geometry}
              material={materials['Material.015']}
              position={[-0.028, -0.003, -0.01]}
            />
          </group>
          <group position={[0.002, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelFR_rims_Material015_0.geometry}
              material={materials['Material.015']}
              position={[-0.014, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WheelFR_tyres_Material005_0.geometry}
              material={materials['Material.005']}
              position={[-0.014, 0, 0]}
            />
          </group>
        </group>
        <group position={[0, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_Carpaint_3_Material011_0.geometry}
            material={materials['Material.011']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_Carpaint_4_Material010_0.geometry}
            material={materials['Material.010']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_Carpaint_5_Material009_0.geometry}
            material={materials['Material.009']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_Inscriptions_Material018_0.geometry}
            material={materials['Material.018']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_carbon_fiber_Material013_0.geometry}
            material={materials['Material.013']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_carpaint_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_carpaint_2_Material012_0.geometry}
            material={materials['Material.012']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_decales_Material014_0.geometry}
            material={materials['Material.014']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.chassis_details_Material015_0.geometry}
            material={materials['Material.015']}
            position={[0, -0.019, 0.62]}
            scale={4.431}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_L_50_Carpaint_3_Material011_0.geometry}
            material={materials['Material.011']}
            position={[0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_L_50_Inscriptions_Material018_0.geometry}
            material={materials['Material.018']}
            position={[0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_L_50_carpaint_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_L_50_decales_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_L_50_details_Material015_0.geometry}
            material={materials['Material.015']}
            position={[0.842, -0.104, 0.487]}
            scale={1.33}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_R_50_Carpaint_3_Material011_0.geometry}
            material={materials['Material.011']}
            position={[-0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_R_50_Inscriptions_Material018_0.geometry}
            material={materials['Material.018']}
            position={[-0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_R_50_carpaint_Material001_0.geometry}
            material={materials['Material.001']}
            position={[-0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_R_50_decales_Material001_0.geometry}
            material={materials['Material.001']}
            position={[-0.842, -0.104, 0.487]}
            scale={1.33}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.detach_door_R_50_details_Material015_0.geometry}
            material={materials['Material.015']}
            position={[-0.842, -0.104, 0.487]}
            scale={1.33}
          />
        </group>
        <group position={[0.006, 73.297, 6.357]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.glasses_glass_light__0.geometry}
            material={materials.glasses_glass_light__0}
            position={[0, 0, -0.014]}
            scale={3.999}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.glasses_glass_windows__0.geometry}
            material={materials.glasses_glass_light__0}
            position={[0, 0, -0.014]}
            scale={3.999}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lights_brakes_glows_Material017_0.geometry}
            material={materials['Material.017']}
            position={[0, 1.921, 0.711]}
            scale={1.588}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lights_position_back_glows_Material017_0.geometry}
            material={materials['Material.017']}
            position={[0, 1.897, 0.702]}
            scale={1.543}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lights_position_front_and_back_glows_Material017_0.geometry}
            material={materials['Material.017']}
            position={[0, -0.846, 0.557]}
            scale={5.66}
          />
        </group>
        <group position={[0.151, 0, 10.908]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lights_reverse_glows_Material017_0.geometry}
            material={materials['Material.017']}
            position={[0.032, 0.911, 0.506]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../car.glb')
export default Car