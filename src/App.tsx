import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import styled from 'styled-components';
import Autocomplete from './components/Autocomplete/Autocomplete';

const Root = styled.div`
  height: 100vh;
  background: linear-gradient(#0e8ac5, #079bbc);
`;

const Header = styled.header`
  height: 150px;
  color: white;
  text-align: left;
  padding: 10vh 20px;
  max-width: 850px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 400;
  text-shadow: 0px 1px 2px #00000099;
`;

const Blurb = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-shadow: 0px 1px 2px #00000099;
`;

const App = () => (
  <Root>
    <Header>
      <Title>Find a bus for your next trip</Title>
      <Blurb>Now serving bus schedules for 10436 cities in 89 countries</Blurb>
      <Autocomplete />
    </Header>
    <DevTools />
  </Root>
);

export default App;
