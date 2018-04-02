import { action, computed, observable, reaction } from 'mobx';

const endpoint = 'https://busbud-napi-prod.global.ssl.fastly.net/search';
const buildQuery = (query: string) => `${endpoint}?q=${query}`;

const moveCurrentSelection = (
  selectionIndex: number | undefined, 
  resultCount: number,
  delta: number,
) => {
  const newSelectionIndex = selectionIndex === undefined
    ? delta < 0 ? resultCount - 1 : delta - 1
    : selectionIndex + delta;
  
  if (newSelectionIndex < 0 || newSelectionIndex >= resultCount) {
    return undefined;
  }

  return newSelectionIndex;
};

export interface ApiResponse {
  city_id: string;
  city_url: string;
  full_name: string;
  geohash: string;
  lat: number;
  lon: number;
}

export type FieldType = 'departure' | 'destination';
export interface AutoCompleteStoreShape {
  departure: {
    input: string,
    searchSelectedValue: string | undefined,
    apiResults: ApiResponse[],
    currentSelection: number | undefined,
  };
  destination: {
    input: string,
    searchSelectedValue: string | undefined,
    apiResults: ApiResponse[],
    currentSelection: number | undefined,
  };

  updateFeild(value: string, field: FieldType): void;
  resetACResults(): void;
  swapInputs(): void;
  moveSelection(key: React.KeyboardEvent<{}>, fieldType: FieldType): void;

  validateSubmit(): boolean;
}

class AutoCompleteStore {
  @observable departure = {
    input: '' as string,
    searchSelectedValue: undefined as string | undefined,
    apiResults: [] as ApiResponse[],
    currentSelection: undefined as number | undefined,
  };
  @observable destination = {
    input: '' as string,
    searchSelectedValue: undefined as string | undefined,
    apiResults: [] as ApiResponse[],
    currentSelection: undefined as number | undefined,
  };

  @action
  updateFeild = (newValue: string, fieldType: FieldType) => {
    this[fieldType].input = newValue;
    this[fieldType].searchSelectedValue = undefined;
    this[fieldType].currentSelection = undefined;
  }

  @action
  updateSelectedFeild = (newValue: string | undefined, fieldType: FieldType) => {
    this[fieldType].searchSelectedValue = newValue;
  }

  @action
  swapInputs = () => {
    const destinationInput = this.destination.input;
    const departureInput = this.departure.input;
    this.departure.input = destinationInput;
    this.destination.input = departureInput;
  }

  @computed get validateSubmit() {
    return !!(this.departure.input && this.destination.input);
  }

  @action
  moveSelection = (event: React.KeyboardEvent<{}>, fieldType: FieldType) => {
    
    switch (event.key) {
      case 'Enter': 
        const selectedIndex = this[fieldType].currentSelection; 
        if (selectedIndex !== undefined) {
          this.updateFeild(this[fieldType].apiResults[selectedIndex].full_name, fieldType);
          this.updateSelectedFeild(this[fieldType].apiResults[selectedIndex].full_name, fieldType);
          this[fieldType].currentSelection = undefined;
        }
        break;

      case 'ArrowUp': 
        this[fieldType].currentSelection = moveCurrentSelection(
          this[fieldType].currentSelection,
          this[fieldType].apiResults.length,
          -1
        );
        
        if (this[fieldType].currentSelection !== undefined) {
          this.updateSelectedFeild(
            this[fieldType].apiResults[this[fieldType].currentSelection!].full_name.split(',')[0], 
            fieldType
          );
        } else {
          this.updateSelectedFeild(undefined, fieldType);
        }
        
        event.preventDefault();
        break;

      case 'ArrowDown': 
        this[fieldType].currentSelection = moveCurrentSelection(
          this[fieldType].currentSelection,
          this[fieldType].apiResults.length,
          +1
        );

        if (this[fieldType].currentSelection !== undefined) {
          this.updateSelectedFeild(
            this[fieldType].apiResults[this[fieldType].currentSelection!].full_name.split(',')[0], 
            fieldType
          );
        } else {
          this.updateSelectedFeild(undefined, fieldType);
        }
        event.preventDefault();
        break;
      default: return;
    }
  }

  @action
  fetchAutocomplete = (query: string, fieldType: FieldType) => {
    fetch(buildQuery(query))
      .then(res => res.json())
      .then(action((json: ApiResponse[]) => {
        return this[fieldType].apiResults = json;
      }));
  }
}

const autoCompleteStore = new AutoCompleteStore();

reaction(
  () => autoCompleteStore.departure.input,
  query => {
    if (query.length >= 2) {
      return autoCompleteStore.fetchAutocomplete(query, 'departure');
    }

    autoCompleteStore.departure.apiResults = [];
  },
  { delay: 200 }
);

reaction(
  () => autoCompleteStore.destination.input,
  query => {
    if (query.length >= 2) {
      return autoCompleteStore.fetchAutocomplete(query, 'destination');
    }
    autoCompleteStore.destination.apiResults = [];
  },
  { delay: 200 }
);

export default autoCompleteStore;