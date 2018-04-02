import * as React from 'react';
import { I18n } from 'react-i18next';
import styled from 'styled-components';
import Autocomplete from './components/Autocomplete/Autocomplete';
// import i18n from './i18n';

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

const LanguageSwitcher = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  background: none;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
`;

const App = () => (
  <I18n>
   {(t, { i18n }) => (
      <Root>
        <Header>
          <Title>{t('title')}</Title>
          <Blurb>{t('blurb')}</Blurb>
          <Autocomplete />
        </Header>
        <LanguageSwitcher 
          onClick={() => { 
            i18n.changeLanguage(
            i18n.language === 'en' ? 'fr' : 'en'
            );
          }}
        >
          {i18n.language === 'en' ? 'fr' : 'en'}
        </LanguageSwitcher>
      </Root>
    )}
  </I18n>
);

export default App;
