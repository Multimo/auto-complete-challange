import { observer } from 'mobx-react';
import * as React from 'react';
import { Form, Text } from 'react-form';
// import AutocompleteInput from './AutocompleteInput/AutocompleteInput';

interface Props {
  store: {
    departureInput: string; 
    destinationInput: string;
  }
}

@observer
class Autocomplete extends React.Component<Props> {
  render() {
    const { store } = this.props;
    return (
        <Form 
            render={({
            submitForm
        }) => (
            <form onSubmit={submitForm}>
                <Text 
                    field="departure" 
                    placeholder="Going to"
                    value={store.departureInput}
                />
                <Text 
                    field="destination" 
                    placeholder="Going to"
                    value={store.destinationInput}
                />
                <button type="submit">Submit</button>
            </form>
        )} 
        />
    );
  }
}

export default Autocomplete;
