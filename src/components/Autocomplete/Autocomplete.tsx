
import { observer } from 'mobx-react';
import * as React from 'react';
import { AutoCompleteStoreShape } from 'store/AutocompleteModel';
import './Autocomplete.css';
import AutocompleteInput from './AutocompleteInput/AutocompleteInput';

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
        <form className="form" onSubmit={this.handSubmit}>
            <AutocompleteInput 
                field="departure" 
                placeholder="Leaving From"
            />
            <AutocompleteInput 
                field="destination"
                placeholder="Going to"
            />
            <button className="submit" type="submit">Submit</button>
        </form>
    );
  }
}

export default Autocomplete as React.ComponentClass<{}>;