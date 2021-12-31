import axios from 'axios';

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

  public getLcListByYear(year: number): Promise<Array<string>> {
    return axios.get(`get/lc-list-by-year?year=${year}`).then(response => {
      return response.data;
    });
  }
}
