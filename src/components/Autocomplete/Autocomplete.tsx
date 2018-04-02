
import * as React from 'react';
import { Form } from 'react-form';
import './Autocomplete.css';
import AutocompleteInput from './AutocompleteInput/AutocompleteInput';

class Autocomplete extends React.Component<{}> {
  render() {
    return (
        // <Form 
        //     render={({
        //     submitForm
        // }) => (
            <form className="form">
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
        //     )} 
        // // />
    );
  }
}

export default Autocomplete as React.ComponentClass<{}>;
