import React, { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  cursor: pointer;
  padding: 10px 10px;
  margin: 5px 10px 10px 10px;
  background: white;
  border: 1px solid black;
  font-size: 15px;
  color: black;
  text-align: center;
  white-space: normal;
`

export const CustomButton = (props) => {
  let [hover, setHover] = useState(false)

  return (
    <StyledButton
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: hover ? '0.5' : '1',
      }}
    >
      {props.children}
    </StyledButton>
  )
}
