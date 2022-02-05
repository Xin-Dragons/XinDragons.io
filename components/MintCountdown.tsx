import classnames from 'classnames';
import { Paper } from '@material-ui/core';
import Countdown from 'react-countdown';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes pulse': {
      '0%': {
        boxShadow: '1px 0px 15px 1px #ddb55b'
      },
      '70%': {
        boxShadow: '1px 0px 5px 1px #ddb55b'
      },
      '100%': {
        boxShadow: '1px 0px 15px 1px #ddb55b'
      }
    },
    root: {
      display: 'flex',
      padding: theme.spacing(0),
      '& > *': {
        margin: theme.spacing(0.5),
        marginRight: 0,
        width: theme.spacing(6),
        height: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#384457',
        color: 'white',
        borderRadius: 5,
        fontSize: 10,
      },
    },
    wrapper: {
      background: 'linear-gradient(83.39deg, #A88848 6.2%, #FCEEB2 36.17%, #DDB55B 73.65%, #FEEFB1 137.01%)',
      padding: '2px',
      margin: theme.spacing(1),
      marginRight: 0,
      borderRadius: '5px'
    },
    done: {
      display: 'flex',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      marginRight: 0,
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(83.39deg, #A88848 6.2%, #FCEEB2 36.17%, #DDB55B 73.65%, #FEEFB1 137.01%)',
      boxShadow: '1px 0px 10px 3px #ddb55b',
      color: '#7C5D1E',
      borderRadius: 5,
      fontWeight: 'bold',
      fontSize: 18,
      animation: '$pulse 1.5s infinite ease-in-out',
    },
    inactive: {
      padding: theme.spacing(0.8),
      background: 'black',
      margin: 0,
      color: '#F1DBAE',
      animation: 'none',
      boxShadow: 'none'
    },
    item: {
      fontWeight: 'bold',
      fontSize: 18,
      display: 'block'
    },
    number: {
      margin: '4px',
      marginRight: 0
    },
    inner: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      color: '#F1DBAE',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),
);

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
}) => {
  const classes = useStyles();
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      status = 'PAUSED';
      const inactive = status !== 'LIVE';
      return status
      ? (
        <>
          {
            inactive
              ? <div className={classes.wrapper}><span className={classnames(classes.done, classes.inactive)}>{status}</span></div>
              : <span className={classes.done}>{status}</span>
          }
        </>
      )
      : null;
    } else {
      return (
        <div className={classes.root} style={style}>
          <div className={classnames(classes.wrapper, classes.number)}>
            <Paper className={classes.inner} elevation={0}>
              <span className={classes.item}>
                {hours < 10 ? `0${hours}` : hours}
              </span>
              <span>hrs</span>
            </Paper>
          </div>
          <div className={classnames(classes.wrapper, classes.number)}>
            <Paper className={classes.inner} elevation={0}>
              <span className={classes.item}>
                {minutes < 10 ? `0${minutes}` : minutes}
              </span>
              <span>mins</span>
            </Paper>
          </div>
          <div className={classnames(classes.wrapper, classes.number)}>
            <Paper className={classes.inner} elevation={0}>
              <span className={classes.item}>
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
              <span>secs</span>
            </Paper>
          </div>
        </div>
      );
    }
  };

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};
