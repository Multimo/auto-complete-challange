import { action, observable, reaction } from 'mobx';

const endpoint = 'http://busbud-napi-prod.global.ssl.fastly.net/search';
const buildQuery = (query: string) => `${endpoint}?q=${query}`;

export interface ApiResponse {
  city_id: string;
  city_url: string;
  full_name: string;
  geohash: string;
  lat: number;
  lon: number;
}

export interface AutoCompleteStoreShape {
  departureInput: string;
  departureResults: ApiResponse[];
  destinationInput: string;
  destinationResults: ApiResponse[];

  updateDepartureFeild(value: string): void;
  updateDestinationFeild(value: string): void;
  resetACResults(): void;
}

class AutoCompleteStore {
  @observable departureInput: string = '';
  @observable departureResults: ApiResponse[] = [];
  @observable destinationInput: string = '';
  @observable destinationResults: ApiResponse[] = [];

  @action('updateDestinationFeild')
  updateDepartureFeild = (newValue: string) => {
    this.departureInput = newValue;
  }

  @action('updateDestinationFeild')
  updateDestinationFeild = (newValue: string) => {
    this.destinationInput = newValue;
  }

  @action('fetchAutocomplete')
  fetchAutocomplete = (query: string, resultType: 'departureResults' | 'destinationResults') => {
    fetch(buildQuery(query))
      .then(res => res.json())
      .then(action((json: ApiResponse[]) => {
        return this[resultType] = json;
      }));
  }
}
const autoCompleteStore = new AutoCompleteStore();

reaction(
  () => autoCompleteStore.departureInput,
  query => {
    if (query.length >= 2) {
      autoCompleteStore.fetchAutocomplete(query, 'departureResults');
    }
  }
);

reaction(
  () => autoCompleteStore.destinationInput,
  query => {
    if (query.length >= 2) {
      autoCompleteStore.fetchAutocomplete(query, 'destinationResults');
    }
  }
);

export default autoCompleteStore;