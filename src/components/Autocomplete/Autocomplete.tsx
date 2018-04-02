
import { observer } from 'mobx-react';
import * as React from 'react';
import { I18n } from 'react-i18next';
import { AutoCompleteStoreShape } from 'store/AutocompleteModel';
import styled from 'styled-components';
import AutocompleteInput from './AutocompleteInput/AutocompleteInput';

const searchSvg = require('./search.svg');

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 60px 0 25px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.52);

  > *:first-child {
    z-index: 4;
  }
  
  @media screen and (max-width: 600px) {
      box-shadow: none;
      flex-direction: column;
  }
`;

const Submit = styled.button`
  flex-grow: .5;
  color: white;
  border: none;
  background: #3795e4;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 16px;
    padding-left: 5px; 
  }

  @media screen and (max-width: 600px) {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.52);
    padding: 20px;
  }
`;

interface Props {
  store: AutoCompleteStoreShape;
}

@observer(['store'])
class Autocomplete extends React.Component<Props> {
  
  handSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = this.props.store.validateSubmit;
    if (isValid) {
      alert('Bon Voyage!');
    }
  }

  render() {
    return (
    <I18n>
        {t => (
        <Form onSubmit={this.handSubmit}>
            <AutocompleteInput 
                field="departure" 
                placeholder={t('departure.leaving_from')}
            />
            <AutocompleteInput 
                field="destination"
                placeholder={t('destination.going_to')}
            />
            <Submit type="submit">
                <img src={searchSvg} />
                <span>{t('search')}</span>
            </Submit>
        </Form>
        )}
    </I18n>
    );
  }
}

export default Autocomplete as React.ComponentClass<{}>;