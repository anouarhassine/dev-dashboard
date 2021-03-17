import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { IncidentStatus } from '../models/status';

export interface IncidentBadgeProps {
  incidentStatus: IncidentStatus;
}

export const IncidentBadge = (props: IncidentBadgeProps) => {
  let badge = (<div/>);
  switch (props.incidentStatus) {
    case IncidentStatus.none: 
      badge = <Chip label={props.incidentStatus} variant="outlined" icon={<DoneIcon style={{ color: 'green' }} />} />;
      break;
    case IncidentStatus.minor:
    case IncidentStatus.maintenance:
      badge = <Chip label={props.incidentStatus} variant="outlined" icon={<WarningRoundedIcon style={{ color: 'orange' }} />} />;
      break;
    case IncidentStatus.major:
      badge = <Chip label={props.incidentStatus} variant="outlined" icon={<ErrorRoundedIcon style={{ color: 'red' }} />} />;
      break;
    case IncidentStatus.critical:
      badge = <Chip label={props.incidentStatus} variant="outlined" icon={<CancelRoundedIcon style={{ color: 'red' }} />} />;
      break;
    default:
      badge = <Chip label='unknown' variant="outlined" icon={<CloseRoundedIcon style={{ color: 'grey' }} />} />;
  }

  return badge;
}