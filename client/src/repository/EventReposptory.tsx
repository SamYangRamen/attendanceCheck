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

  public getEventTableInfoByYearAndMonth(year: number, month: number): Promise<EventTableInfo[]> {
    return axios.get(`get/event-info?year=${year}&month=${month}`).then(response => {
      return response.data;
    });
  }

  public deleteEventInfoByEventIdx(eventIdx: React.Key): Promise<boolean> {
    return axios.delete(`delete/event-info?eventIdx=${eventIdx}`).then(response => {
      return response.data;
    });
  }
}
