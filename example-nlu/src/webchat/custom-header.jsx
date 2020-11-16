import React, { useContext } from 'react'
import styled from 'styled-components'
import Close from '../assets/close_header.svg'
import BotIconWhite from '../assets/bot-icon-white.svg'
import { staticAsset, WebchatContext } from '@botonic/react'
import { PRIMARY_COLOR } from './constants'

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  height: 48px;
  background: linear-gradient(
    90deg,
    rgba(46, 32, 59, 1) 0%,
    ${PRIMARY_COLOR} 100%
  );
  z-index: 2;
  display: flex;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`
const Title = styled.h1`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5px;
  color: white;
  width: 80%;
`
export const CloseIcon = styled.img`
  width: 20px;
  height: 30px;
`
export const BotIcon = styled.img`
  width: 30px;
`

export const CustomHeader = () => {
  const { getThemeProperty } = useContext(WebchatContext)
  const headerTitle = getThemeProperty('header.title')

  return (
    <>
      <Header>
        <IconContainer>
          <BotIcon src={staticAsset(BotIconWhite)} />
        </IconContainer>
        <Title>{headerTitle} - Online 🟢</Title>
        <IconContainer
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            Botonic.close()
          }}
        >
          <CloseIcon src={staticAsset(Close)} />
        </IconContainer>
      </Header>
    </>
  )
}
