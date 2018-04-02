import { action, observable, reaction } from 'mobx';

const endpoint = 'http://busbud-napi-prod.global.ssl.fastly.net/search';
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
    apiResults: ApiResponse[],
    currentSelection: number | undefined,
  };
  destination: {
    input: string,
    apiResults: ApiResponse[],
    currentSelection: number | undefined,
  };

  updateFeild(value: string, field: FieldType): void;
  resetACResults(): void;
  moveSelection(key: React.KeyboardEvent<{}>, fieldType: FieldType): void;
}

class AutoCompleteStore {
  @observable departure = {
    input: '' as string,
    apiResults: [] as ApiResponse[],
    currentSelection: undefined as number | undefined,
  };
  @observable destination = {
    input: '' as string,
    apiResults: [] as ApiResponse[],
    currentSelection: undefined as number | undefined,
  };

  @action
  updateFeild = (newValue: string, fieldType: FieldType) => {
    this[fieldType].input = newValue;
  }

  @action
  moveSelection = (event: React.KeyboardEvent<{}>, fieldType: FieldType) => {

    switch (event.key) {
      case 'Enter': 
        const selectedIndex = this[fieldType].currentSelection; 
        if (selectedIndex !== undefined) {
          this.updateFeild(this[fieldType].apiResults[selectedIndex].full_name, fieldType);
          this[fieldType].currentSelection = undefined;
        }
        break;

      case 'ArrowUp': 
        this[fieldType].currentSelection = moveCurrentSelection(
          this[fieldType].currentSelection,
          this[fieldType].apiResults.length,
          -1
        );
        event.preventDefault();
        break;

      case 'ArrowDown': 
        this[fieldType].currentSelection = moveCurrentSelection(
          this[fieldType].currentSelection,
          this[fieldType].apiResults.length,
          +1
        );
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
      autoCompleteStore.fetchAutocomplete(query, 'departure');
    }
  }
);

reaction(
  () => autoCompleteStore.destination.input,
  query => {
    if (query.length >= 2) {
      autoCompleteStore.fetchAutocomplete(query, 'destination');
    }
  }
);

export default autoCompleteStore;