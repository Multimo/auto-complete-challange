import { observable } from 'mobx';

export default class AutoCompleteStore {
  @observable departureInput: string = 'Depatre me ';
  @observable destinationInput: string = 'desint me';
  @observable acResults: string[] = [];
}
