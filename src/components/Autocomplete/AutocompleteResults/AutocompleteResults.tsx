import * as React from 'react';
import { ApiResponse } from 'store/AutocompleteModel';
import './AutocompleteResults.css';

interface Props {
  results?: ApiResponse[];
  focused: boolean;
  selectedIndex?: number;
}

const AutocompleteResults = ({ results, focused, selectedIndex }: Props) => {
  if (!results || !focused) {
    return null;
  }
  return (
    <ul className="results">
        {results.map((result, index) => (
            <li key={result.city_id} className="list">
                {selectedIndex === index ? <b>***</b> : null}{result.full_name}
            </li>
        ))}
    </ul>
  ); 
};

export default AutocompleteResults;
