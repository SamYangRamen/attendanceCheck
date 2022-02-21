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
    return axios.post(`lc-info/range`, lcInfo).then(response => {
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
        `lc-info/fg-member-name/search?year=${year}&lc=${lc}&fgMemberName1=${fgMemberName1}&fgMemberName2=${fgMemberName2}`
      )
      .then(response => {
        return response.data;
      });
  }

  public putLcInfo(putLcInfo: PutLcInfo): Promise<boolean> {
    return axios.put(`lc-info`, putLcInfo).then(response => {
      return response.data;
    });
  }

  public deleteLcInfoByLcIdxList(lcIdxList: number[]): Promise<boolean> {
    return axios.post(`lc-info/lc-idx`, lcIdxList).then(response => {
      return response.data;
    });
  }

  public getLcFKTableInfoListByFgMemberIdAndYear(
    fgMemberId: number,
    year: number
  ): Promise<LcFKTableInfo[]> {
    return axios.get(`lc-info/fk/table?fgMemberId=${fgMemberId}&year=${year}`).then(response => {
      return response.data;
    });
  }
}
