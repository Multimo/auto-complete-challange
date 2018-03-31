import * as React from 'react';
import { Text } from 'react-form';
import './AutocompleteInput.css';

interface Props {
  field: string;
  placeholder: string;
}

const AutocompleteInput = ({ field, placeholder }: Props) => (
    <Text 
        className="input"
        field={field} 
        placeholder={placeholder}
        // tslint:disable-next-line:no-console
        onFocus={() => { console.log('destination'); }} 
    />
);

export default AutocompleteInput;
