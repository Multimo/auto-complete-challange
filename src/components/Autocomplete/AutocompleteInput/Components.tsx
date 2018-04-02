import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';
import transition from 'styled-transition-group';

export const Root = styled.div`
  flex-grow: 1;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    margin-bottom: 45px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.52);
  }
`;

interface ContainerProps {
  isFocused?: boolean;
}
const typedContainer: StyledFunction<ContainerProps & React.HTMLProps<HTMLDivElement>> = styled.div;
export const InputContainer = typedContainer`
  position: relative;
  display: flex;
  border-right: 1px solid #3794e4;
  background: #2186dc;
  background: ${props => props.isFocused ? '#2a8ee2' : '#2186dc' }

  @media (max-width: 600px) {
    border-right: none;
  }
`;

export const SwapSvg = styled.img`
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 5px;
  background: #2286dc;
  z-index: 3;
`;

export const Image = styled.img`
  padding-left: 15px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  z-index: 2;
  background: none;
  font-size: 14px;
  border: none;
  color: white;
  outline: none;


  &::placeholder {
    color: white;
    opacity: 0.6;
  }
`;

export const Fade = transition.div.attrs({
  unmountOnExit: true,
  timeout: 200
})`
position: absolute;
background: #084661;
color: white;
font-weight: 300;
z-index: -1;
font-size: 13px;
text-align: center;
padding: 5px 0;
width: 100%;
top: -25px;

&:enter { 
  opacity: 0.01;
  top: 0px;
}
&:enter-active {
  opacity: 1;
  top: -25px;
  transition: 
    opacity 200ms linear,
    top 200ms linear;
}
&:exit { 
  opacity: 1;
  top: -25px;
}
&:exit-active {
  opacity: 0.01;
  top: 0px;
  transition: 
    opacity 200ms linear,
    top 200ms linear;
}
`;
