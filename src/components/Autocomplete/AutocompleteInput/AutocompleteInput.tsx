import * as React from 'react';
import { Text } from 'react-form';
import { ApiResponse } from 'store/AutocompleteModel';
import './AutocompleteInput.css';

interface Props {
  field: string;
  placeholder: string;
  results?: ApiResponse[];
  onChange(value: string): void;
}

const AutocompleteInput = ({ field, placeholder, onChange, results }: Props) => (
    <div className="root">
        <Text 
            className="inputs"
            name={field}
            field={field}
            autoComplete="off"
            placeholder={placeholder}
            onChange={(value) => onChange(String(value))}
        />
        <ul className="results">
        {results && results.map(result => (
            <li key={result.city_id}>
                {result.full_name}
            </li>
        ))}
        </ul>
    </div>
);

export default AutocompleteInput;
