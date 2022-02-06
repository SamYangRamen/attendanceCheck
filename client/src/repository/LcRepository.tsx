import axios from 'axios';
import React from 'react';

export interface DTO<T> {
  dto: T;
}

export interface PostLcRange {
  year: number;
  lcDepartment: string;
  startLcNumber: number;
  endLcNumber: number;
}

export interface LcInfo {
  year: number;
  lc: string;
  fgMemberId1: number;
  fgMemberId2: number;
  fgMemberId3: number;
  fgMemberId4: number;
}

export interface LcInfoWithFgMemberName {
  key: React.Key;
  year: number;
  lc: string;
  fgMemberName1: string;
  fgMemberName2: string;
  fgMemberName3: string;
  fgMemberName4: string;
}

export interface PutLcInfo {
  lcIdx: number;
  columnName: string;
  fgMemberId: number | null;
}

export interface LcFKTableInfo {
  key: React.Key;
  year: number;
  lc: string;
}

export default class LcRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postLcRange(lcInfo: PostLcRange): Promise<boolean> {
    return axios.post(`post/lc-info`, lcInfo).then(response => {
      return response.data;
    });
  }

  public getIsLcInfo(year: number, lc: number): Promise<boolean> {
    return axios.get(`get/is-lc-info?year=${year}&lc=${lc}`).then(response => {
      return response.data;
    });
  }

  public getLcInfoListByYear(year: number): Promise<Array<LcInfo>> {
    return axios.get(`get/lc-info-list-by-year?year=${year}`).then(response => {
      return response.data;
    });
  }

  public getLcInfoListWithFgMemberNameBySearch(
    year?: number,
    lc?: string | null,
    fgMemberName1?: string | null,
    fgMemberName2?: string | null
  ): Promise<Array<LcInfoWithFgMemberName>> {
    return axios
      .get(
        `get/lc-info-list-by-search?year=${year}&lc=${lc}&fgMemberName1=${fgMemberName1}&fgMemberName2=${fgMemberName2}`
      )
      .then(response => {
        return response.data;
      });
  }

  public getLcListByYear(year: number): Promise<Array<string>> {
    return axios.get(`get/lc-list-by-year?year=${year}`).then(response => {
      return response.data;
    });
  }

  public putLcInfo(putLcInfo: PutLcInfo): Promise<boolean> {
    return axios.put(`put/lc-info`, putLcInfo).then(response => {
      return response.data;
    });
  }

  public deleteLcInfoByLcIdxList(lcIdxList: number[]): Promise<boolean> {
    return axios.post(`delete/lc-info-by-lc-idx-list`, lcIdxList).then(response => {
      return response.data;
    });
  }

  public getLcFKTableInfoListByFgMemberIdAndYear(
    fgMemberId: number,
    year: number
  ): Promise<LcFKTableInfo[]> {
    return axios
      .get(
        `get/lc-fk-table-info-list-by-fg-member-id-and-year?fgMemberId=${fgMemberId}&year=${year}`
      )
      .then(response => {
        return response.data;
      });
  }
}
