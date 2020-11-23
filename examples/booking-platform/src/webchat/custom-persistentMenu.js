import React, { useContext } from 'react'
import styled from 'styled-components'
import { WebchatContext } from '@botonic/react'
import { CustomMenuButton } from './custom-persistentMenu-button'
import Home from '../assets/home.svg'
import { staticAsset } from '@botonic/react'

const ButtonsContainer = styled.div`
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 2;
  text-align: center;
  background: white;
`

export const CustomPersistentMenu = ({ onClick, options }) => {
  return (
    <ButtonsContainer>
      <CustomMenuButton
        label={options[0].label}
        webview={options[0].webview}
        img='https://www.flaticon.com/svg/static/icons/svg/14/14934.svg'
      />
      <CustomMenuButton
        label={options[1].label}
        payload={options[1].payload}
        img={staticAsset(Home)}
      />
      <CustomMenuButton
        label={options[2].closeLabel}
        onClick={onClick}
        img='https://www.flaticon.com/svg/static/icons/svg/67/67345.svg'
      />
    </ButtonsContainer>
  )
}
