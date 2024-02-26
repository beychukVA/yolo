import Particles from 'react-tsparticles'
import styled from 'styled-components'
import { loadFull } from 'tsparticles'

const PARTICLE_OPTIONS = {
  fpsLimit: 60,
  particles: {
    move: {
      bounce: false,
      direction: 'none',
      enable: true,
      outModes: 'out',
      random: false,
      speed: 0.5,
      straight: false
    },
    number: { density: { enable: true, area: 800 }, value: 30 },
    opacity: {
      value: 0.1
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  themes: [
    {
      name: 'dark',
      default: {
        value: true,
        mode: 'dark'
      },
      options: {
        background: {
          color: 'transparent'
        },
        particles: {
          color: {
            value: '#fff'
          }
        }
      }
    }
  ]
}

export const BackgroundParticles = () => {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main)
  }

  const particlesLoaded = (container) => {}
  return (
    <ParticlesWrapper>
      <Particles id='background-particles' init={particlesInit} loaded={particlesLoaded} options={PARTICLE_OPTIONS} />
    </ParticlesWrapper>
  )
}

const ParticlesWrapper = styled.div`
  position: fixed;
`
