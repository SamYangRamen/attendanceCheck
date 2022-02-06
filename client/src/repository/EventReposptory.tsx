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
    return axios.post(`post/event-info`, eventInfo).then(response => {
      return response.data;
    });
  }

  public getEventTableInfoByYearAndMonthAndEventTypeForCalendar(
    year: number,
    month: number,
    eventType: string
  ): Promise<EventTableInfo[]> {
    return axios
      .get(`get/event-info/calendar?year=${year}&month=${month}&eventType=${eventType}`)
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
      .get(`get/event-info?year=${year}&month=${month}&day=${day}&eventType=${eventType}`)
      .then(response => {
        return response.data;
      });
  }

  public deleteEventInfoByEventIdx(eventIdx: React.Key): Promise<boolean> {
    return axios.delete(`delete/event-info?eventIdx=${eventIdx}`).then(response => {
      return response.data;
    });
  }
}
