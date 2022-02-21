import axios from 'axios';

export interface DTO<T> {
  dto: T;
}

export interface FgMemberInfo {
  fgMemberId: number;
  generation: number;
  fgMemberName: string;
  position: string;
  state: string;
  contact: string;
  mail: string;
}

export interface FgMemberTableInfo {
  key: React.Key;
  fgMemberId: number;
  generation: number;
  fgMemberName: string;
  position: string;
  state: string;
  contact: string;
  mail: string;
  isAdmin: boolean;
  registerApproval: boolean;
}

export interface PutFgMemberInfo {
  fgMemberId: number;
  columnName: string;
  value: string;
}

export interface FgMemberInfoMap {
  [id: string]: FgMemberInfo;
}

export interface FgMemberSearchInfo {
  key: React.Key;
  generation: number;
  fgMemberId: number;
  fgMemberName: string;
  position: string;
}

export default class FgMemberRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postFgMemberInfo(fgMemberInfo: FgMemberInfo): Promise<boolean> {
    return axios.post(`/fg-member-info`, fgMemberInfo).then(response => {
      return response.data;
    });
  }

  public putFgMemberInfo(putFgMememberInfo: PutFgMemberInfo): Promise<boolean> {
    return axios.put(`/fg-member-info`, putFgMememberInfo).then(response => {
      return response.data;
    });
  }

  public getFgMemberTableInfoListByGeneration(
    generation: number
  ): Promise<Array<FgMemberTableInfo>> {
    return axios.get(`/fg-member-info/table?generation=${generation}`).then(response => {
      return response.data;
    });
  }

  public getFgMemberSearchInfoListBySearch(
    generation: number,
    position: string,
    fgMemberName: string
  ): Promise<Array<FgMemberSearchInfo>> {
    return axios
      .get(
        `/fg-member-info/search/search?generation=${generation}&position=${position}&fgMemberName=${fgMemberName}`
      )
      .then(response => {
        return response.data;
      });
  }

  public getFgMemberInfoListBySearch(
    fgMemberId: number,
    generation: number,
    fgMemberName: string,
    position: string,
    state: string
  ): Promise<Array<FgMemberTableInfo>> {
    return axios
      .get(
        `/fg-member-info/search?fgMemberId=${fgMemberId}&generation=${generation}&fgMemberName=${fgMemberName}&position=${position}&state=${state}`
      )
      .then(response => {
        return response.data;
      });
  }

  public deletefgMemberInfoByfgMemberIdList(fgMemberIdList: number[]): Promise<boolean> {
    return axios.post(`/fg-member-info/fg-member-id`, fgMemberIdList).then(response => {
      return response.data;
    });
  }
}
