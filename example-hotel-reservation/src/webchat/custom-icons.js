import React from 'react'
import styled from 'styled-components'
import { IconContainer } from './common'
import Send from '../assets/send.svg'
import { staticAsset } from '@botonic/react'

export const Icon = styled.img`
  width: 18px;
`

export const CustomSendButton = () => (
  <IconContainer>
    <Icon src={staticAsset(Send)} />
  </IconContainer>
)

export const CustomMenuButton = () => (
  <IconContainer>
    <Icon src='https://image.flaticon.com/icons/svg/2948/2948037.svg' />
  </IconContainer>
)
