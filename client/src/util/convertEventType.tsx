import moment from 'moment';

const convertEventType = (today: string, day: string, eventType: string): string | undefined => {
  if (moment(today).unix() < moment(day).unix()) {
    switch (eventType) {
      case 'FG':
        return 'error';
      case 'LC':
        return 'success';
      case 'default':
        return undefined;
    }
  } else if (moment(today).unix() == moment(day).unix()) {
    return 'processing';
  } else {
    return 'default';
  }
};

export default convertEventType;
