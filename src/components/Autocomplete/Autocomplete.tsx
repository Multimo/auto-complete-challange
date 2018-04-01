import { observer } from 'mobx-react';
import * as React from 'react';
import { Form } from 'react-form';
import { AutoCompleteStoreShape } from 'store/AutocompleteModel';
import './Autocomplete.css';
import AutocompleteInput from './AutocompleteInput/AutocompleteInput';

interface Props {
  store: AutoCompleteStoreShape;
}

@observer(['store'])
class Autocomplete extends React.Component<Props> {
  render() {
    const { store } = this.props;
    return (
        <Form 
            render={({
            submitForm
        }) => (
            <form onSubmit={submitForm} className="form">
                <AutocompleteInput 
                    field="departure" 
                    placeholder="Leaving From"
                    onChange={(value) => store.updateDepartureFeild(String(value))}
                    results={store.departureResults}
                />
                <AutocompleteInput 
                    field="destination"
                    placeholder="Going to"
                    onChange={(value) => store.updateDestinationFeild(String(value))}
                    results={store.destinationResults}
                />
                <button className="submit" type="submit">Submit</button>
            </form>
        )} 
        />
    );
  }
}

export default Autocomplete as React.ComponentClass<{}>;
