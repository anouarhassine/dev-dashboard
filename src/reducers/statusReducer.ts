import { Reducer } from 'redux';
import { DashboardState } from './dashboardState';
import { ServiceStatus } from '../models/status';
import { STATUS_FETCH_STARTED, STATUS_FETCH_SUCCEEDED, STATUS_FETCH_FAILED } from '../actions/statusActions';

const defaultState: DashboardState = {
  statuses: [],
  isLoading: true,
  isInError: false,
  errorMessage: '',
  lastUpdateTime: new Date()
}

const statusFetchStartedHandler = (state: DashboardState): DashboardState => {
  return {
      ...state,
      isLoading: true
  }
}

const statusFetchSucceededHandler = (state: DashboardState, statuses: ServiceStatus[]): DashboardState => {
  return {
      ...state,
      statuses: statuses,
      isLoading: false,
      isInError: false,
      lastUpdateTime: new Date()
  }
}

const statusFetchFailedHandler = (state: DashboardState, reason: string): DashboardState => {
  return {
      ...state,
      isInError: true,
      isLoading: false,
      errorMessage: reason
  }
}

const statusReducer: Reducer<DashboardState> = (state: DashboardState = defaultState, action: any) => {
  switch (action.type) {
      case STATUS_FETCH_STARTED:
          return statusFetchStartedHandler(state);
      case STATUS_FETCH_SUCCEEDED:
          return statusFetchSucceededHandler(state, action.statuses);
      case STATUS_FETCH_FAILED:
          return statusFetchFailedHandler(state, action.reason);
      default:
          return state;
  }
}

export default statusReducer;
