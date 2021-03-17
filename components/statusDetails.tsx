import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import Grid from '@material-ui/core/Grid';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { statusFetchStarted } from '../actions/statusActions';
import { IncidentBadge } from './IncidentBadge';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      //backgroundColor: '#C7CEEA',
      fontWeight: 'bold'
      //color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const StatusDetails = () => {
  const statuses = useSelector((state: any) => state.status.statuses);
  const isLoading = useSelector((state: any) => state.status.isLoading);
  const lastUpdateTime = useSelector((state: any) => state.status.lastUpdateTime);
  //const isInError = useSelector((state: DashboardState) => state.isInError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(statusFetchStarted());
  }, [])

  const statusesTable = (
    isLoading ? <CircularProgress /> :
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Platform</StyledTableCell>
            <StyledTableCell>Incidents</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statuses.map((status) => (
            <TableRow key={status.name}>
              <TableCell component="th" scope="row">
                {status.name}
              </TableCell>
              <TableCell>
                <IncidentBadge incidentStatus={status.incidentStatus} />
              </TableCell>
              <TableCell>{status.description}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => openInNewTab(status.url)}>
                  <LaunchRoundedIcon  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Grid container spacing={2} justify='flex-start' alignItems='center' direction='column'>
      <Grid item xs={12}>
        <IconButton color='primary' onClick={() => dispatch(statusFetchStarted())}>
          <SyncRoundedIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <p>Last updated at:  {lastUpdateTime.toUTCString()}</p>
      </Grid>
      <Grid item xs={12}>
        {statusesTable}
      </Grid>
    </Grid>
  );
}

export default StatusDetails;