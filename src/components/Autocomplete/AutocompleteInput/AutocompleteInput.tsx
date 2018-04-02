import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { AutoCompleteStoreShape, FieldType } from 'store/AutocompleteModel';
import AutocompleteResults from '../AutocompleteResults/AutocompleteResults'; 
import { Fade, Image, Input, InputContainer, Root, SwapSvg } from './Components';

const departure = require('./departure.svg');
const destination = require('./destination.svg');
const swap = require('./swap.svg');

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
    // TODO: fix this hack, event propergation maybe?
    setTimeout(
      () => { this.setState({ active: !this.state.active }); },
      100
    );
  }

  render() {
    const { field, placeholder, store } = this.props;
    const { active } = this.state;

    return (
      <Root>
        <InputContainer isFocused={this.state.active}>
          <Fade in={this.state.active}>
            {placeholder}
          </Fade>
          <Image 
            src={field === 'departure' ? departure : destination} 
            className="App-logo" 
            alt="logo" 
          />
          <Input 
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
          {!(field === 'departure' && store.departure.input) ? null : (
            <SwapSvg src={swap} onClick={this.props.store.swapInputs} />
          )}
        </InputContainer>
        <AutocompleteResults 
          results={store[field].apiResults} 
          focused={active} 
          selectedIndex={store[field].currentSelection} 
          updateFeild={store.updateFeild}
          field={field}
        />
      </Root>
    );   
  }
}

export default AutocompleteInput as React.ComponentClass<Props>;
