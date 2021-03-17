export enum IncidentStatus {
  unknown = 'unknown',
  none = 'none', 
  minor = 'minor', 
  major = 'major',
  maintenance = 'maintenance',
  critical = 'critical'
}

export interface ServiceStatus {
  name: string,
  url: string,
  incidentStatus: IncidentStatus,
  description: string
}