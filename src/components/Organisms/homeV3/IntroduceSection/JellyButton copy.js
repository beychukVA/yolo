import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useScript } from 'utils/hooks/useScript'

/**
 *This component add a Wobbly Effect but it is controled by a Script in 'public/index.htm' file
 * with this label ' <!-- Wobbly CTA button script -->'
 *
 * it needs 'https://code.jquery.com/jquery-3.2.1.min.js'
 * and external file to manage the effect 'public/scripts/wobbly.js'
 *
 * I'm aware of this is a dirty NON React way of doing it but due the schedule...
 * don't kill me, I promise to take it again in the future and use a better React way
 *
 */

export const JellyButton = ({ children }) => {
  useScript(`../scripts/wobbly.js`)

  useEffect(() => {
    return () => {
      //cleaning the Animation frame
      const rafID = window.rafID
      if (rafID) window.cancelAnimationFrame(rafID)
    }
  }, [])

  return (
    <JellyButtonWrapper id='jellyButtonWrapper' className='main_cta_area'>
      <Link to='/game' className='btn-liquid'>
        <span className='inner'>{children}</span>
      </Link>
    </JellyButtonWrapper>
  )
}

const JellyButtonWrapper = styled.div`
  position: relative;
  .btn-liquid {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 60px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    margin: 30px 0 0 0;
  }
  .btn-liquid .inner {
    position: relative;
    z-index: 2;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .btn-liquid canvas {
    position: absolute;
    top: -66px;
    right: -50px;
    bottom: -50px;
    left: -50px;
    z-index: 1;
  }
`
