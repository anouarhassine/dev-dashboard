import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import StatusDetails from './statusDetails';

const logger = createLogger({collapsed: true});

const store = compose (applyMiddleware (thunk, logger))(createStore)(rootReducer);

const StatusApp = () => {
  return (
    <Provider store={store}>
      <StatusDetails />
    </Provider>
  );
}

export default StatusApp;