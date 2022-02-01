import axios from 'axios';

export interface DTO<T> {
  dto: T;
}

export interface LcMemberInfo {
  year: number;
  lc: string;
  department: string;
  gender: string;
  lcMemberName: string;
  contact: string;
}

export interface PutLcMemberInfo {
  lcMemberId: number;
  columnName: string;
  value: string;
}

export interface LcMemberTableInfo {
  key: React.Key;
  year: number;
  lc: string;
  department: string;
  gender: string;
  lcMemberName: string;
  contact: string;
}

export default class LcMemberRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postLcMemberInfo(lcMemberInfo: LcMemberInfo): Promise<boolean> {
    return axios.post(`post/lc-member-info`, lcMemberInfo).then(response => {
      return response.data;
    });
  }

  public getLcMemberInfo(lcMemberId: number): Promise<LcMemberInfo> {
    return axios.get(`get/lc-member-info?lcMemberId=${lcMemberId}`).then(response => {
      return response.data;
    });
  }

  public putLcMemberInfo(putLcMememberInfo: PutLcMemberInfo): Promise<boolean> {
    return axios.put(`put/lc-member-info`, putLcMememberInfo).then(response => {
      return response.data;
    });
  }

  public getLcMemberInfoListByYear(year: number): Promise<Array<LcMemberInfo>> {
    return axios.get(`get/lc-member-info-list-by-year?year=${year}`).then(response => {
      return response.data;
    });
  }

  public getLcMemberTableInfoListBySearch(
    year: number,
    lc: string,
    department: string,
    gender: string,
    lcMemberName: string
  ): Promise<Array<LcMemberTableInfo>> {
    return axios
      .get(
        `get/lc-member-table-info-list-by-search?year=${year}&lc=${lc}&department=${department}&gender=${gender}&lcMemberName=${lcMemberName}`
      )
      .then(response => {
        return response.data;
      });
  }

  public deleteLcMemberInfoByLcMemberIdList(lcMemberIdList: number[]): Promise<boolean> {
    return axios
      .post(`delete/lc-member-info-by-lc-member-id-list`, lcMemberIdList)
      .then(response => {
        return response.data;
      });
  }
}
