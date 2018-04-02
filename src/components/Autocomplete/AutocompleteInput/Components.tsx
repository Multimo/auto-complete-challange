import withAnimation from 'styled-animate';
import styled from 'styled-components';

export const Root = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const InputContainer = styled.div`
  display: flex;
  border-right: 1px solid #3794e4;
  background: #2186dc;
`;

export const SwapSvg = styled.img`
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 5px;
  background: #2286dc;
`;

export const Image = styled.img`
  padding-left: 10px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  padding: 15px 10px;
  width: 100%;
  background: none;
  font-size: 16px;
  border: none;
  color: white;
  
  outline: none;


  &::placeholder {
    color: white;
    opacity: 0.6;
  }
`;

const Foo = styled.div`
  position: absolute;
  background: #084661;
  color: white;
  z-index: 1;
  font-size: 10px;
  text-align: center;
  padding: 10px;
`;

export const FadeInOut = withAnimation(Foo, {
  transition: '0.7s cubic-bezier(0.3, 0.8, 0.5, 1)',
  animate: {
    bottom: ['0px', '45px'],
    opacity: ['0', '1']
  }
});
