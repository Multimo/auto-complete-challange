import * as React from 'react';
import { ApiResponse } from 'store/AutocompleteModel';
import styled, { StyledFunction } from 'styled-components';

interface ListItemProps {
  isSelected?: boolean;
}
const listItem: StyledFunction<ListItemProps & React.HTMLProps<HTMLLIElement>> = styled.li;
const ListItem = listItem`
  font-size: 13px;
  font-weight: 300;
  padding: 10px 10px 10px 50px;
  transition: background 0.7s;
  cursor: pointer;
  z-index: 2;
  background: ${props => props.isSelected ? '#084661' : 'none'};

  &:hover {
  background: #084661;
  }

  &:nth-child(1) {
    padding-top: 10px;
  }
`;

const Results = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 4;
  background: #1d7fd1;
  width: 100%;
`;

interface Props {
  results?: ApiResponse[];
  focused: boolean;
  selectedIndex?: number;
  field: string;
  updateFeild(newValue: string, field: string): void;
}

const AutocompleteResults = ({ results, focused, selectedIndex, updateFeild, field }: Props) => {
  if (!results || !focused) {
    return null;
  }
  return (
    <Results>
        {results.map((result, index) => (
            <ListItem 
              key={result.city_id} 
              isSelected={selectedIndex === index}
              onClick={() => updateFeild(result.full_name, field)}
            >
              {result.full_name}
            </ListItem>
        ))}
    </Results>
  ); 
};

export default AutocompleteResults;
