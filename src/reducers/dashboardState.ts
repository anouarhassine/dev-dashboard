import { ServiceStatus } from '../models/status';

export interface DashboardState {
  statuses?: ServiceStatus[],
  isLoading: boolean,
  isInError: boolean,
  errorMessage: string,
  lastUpdateTime: Date
}