import axios from 'axios';
import React from 'react';

export interface EventTableInfo {
  key: React.Key;
  eventName: string;
  eventType: string;
  eventDate: string;
}

export interface EventInfo {
  eventName: string;
  eventType: string;
  eventDate: string;
}

export default class EventRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postEventInfo(eventInfo: EventInfo): Promise<boolean> {
    return axios.post(`event-info`, eventInfo).then(response => {
      return response.data;
    });
  }

  public getEventTableInfoByYearAndMonthAndEventTypeForCalendar(
    year: number,
    month: number,
    eventType: string
  ): Promise<EventTableInfo[]> {
    return axios
      .get(`event-info/table/calendar?year=${year}&month=${month}&eventType=${eventType}`)
      .then(response => {
        return response.data;
      });
  }

  public getEventTableInfoByYearAndMonthAndDayAndEventType(
    year: number,
    month: number,
    day: number,
    eventType: string
  ): Promise<EventTableInfo[]> {
    return axios
      .get(`event-info/table?year=${year}&month=${month}&day=${day}&eventType=${eventType}`)
      .then(response => {
        return response.data;
      });
  }

  public deleteEventInfoByEventIdx(eventIdx: React.Key): Promise<boolean> {
    return axios.delete(`event-info?eventIdx=${eventIdx}`).then(response => {
      return response.data;
    });
  }
}
