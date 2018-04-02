import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
// import { Text } from 'react-form';
import { AutoCompleteStoreShape, FieldType } from 'store/AutocompleteModel';
import AutocompleteResults from '../AutocompleteResults/AutocompleteResults';
import './AutocompleteInput.css';

interface Props {
  field: FieldType;
  placeholder: string;
}

interface MobxProps extends Props {
  store: AutoCompleteStoreShape;
}

@observer(['store'])
class AutocompleteInput extends React.Component<MobxProps> {
  state = { active: false };

  setActive = () => {
    this.setState(() => ({ active: !this.state.active }));
  }

  render() {
    const { field, placeholder, store } = this.props;
    const { active } = this.state;
    console.log(store.departure.input);
    return (
      <div className="root">
        <input 
          className="inputs"
          name={field}
          type="text"
          autoComplete="off"
          required={true}
          value={toJS(store[field].input)}
          placeholder={placeholder}
          onChange={(event) => store.updateFeild(event.target.value, field)}
          onFocus={() => this.setActive()}
          onBlur={() => this.setActive()}
          onKeyDown={(event) => store.moveSelection(event, field)}
        />
        <AutocompleteResults 
          results={store[field].apiResults} 
          focused={active} 
          selectedIndex={store[field].currentSelection} 
        />
        <h2 >{toJS(store[field].input)}</h2>
      </div>
    );   
  }
}

export default AutocompleteInput as React.ComponentClass<Props>;
