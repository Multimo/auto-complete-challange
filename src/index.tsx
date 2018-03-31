import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AutoCompleteStore from './store/AutocompleteModel';

const autoCompleteStore = new AutoCompleteStore();

ReactDOM.render(
  <App store={autoCompleteStore} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
