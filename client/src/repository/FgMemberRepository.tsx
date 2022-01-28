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
    return axios.post(`post/fg-member-info`, fgMemberInfo).then(response => {
      return response.data;
    });
  }

  public getFgMemberInfo(fgMemberId: number): Promise<FgMemberInfo> {
    return axios.get(`get/fg-member-info?fgMemberId=${fgMemberId}`).then(response => {
      return response.data;
    });
  }

  public putFgMemberInfo(putFgMememberInfo: PutFgMemberInfo): Promise<boolean> {
    return axios.put(`put/fg-member-info`, putFgMememberInfo).then(response => {
      return response.data;
    });
  }

  public getFgMemberInfoListByGeneration(generation: number): Promise<Array<FgMemberInfo>> {
    return axios
      .get(`get/fg-member-info-list-by-generation?generation=${generation}`)
      .then(response => {
        return response.data;
      });
  }

  public getFgMemberTableInfoListByGeneration(
    generation: number
  ): Promise<Array<FgMemberTableInfo>> {
    return axios
      .get(`get/fg-member-info-list-by-generation/table?generation=${generation}`)
      .then(response => {
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
        `get/fg-member-search-info-list-by-search?generation=${generation}&position=${position}&fgMemberName=${fgMemberName}`
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
        `get/fg-member-info-list-by-search?fgMemberId=${fgMemberId}&generation=${generation}&fgMemberName=${fgMemberName}&position=${position}&state=${state}`
      )
      .then(response => {
        return response.data;
      });
  }

  public deletefgMemberInfoByfgMemberIdList(fgMemberIdList: number[]): Promise<boolean> {
    return axios
      .post(`delete/fg-member-info-by-fg-member-id-list`, fgMemberIdList)
      .then(response => {
        return response.data;
      });
  }

  public makeTwoDimArray(data: Array<any>): Array<Array<any>> {
    // let arr: Array<Array<any>> = [];
    Object.keys(data[0]).forEach((key, i) => data[0].key);
    return Array.from({ length: data.length }, (_, i) => Object.values(data[i]));
    /*
    for (let i = 0; i < data.length; i++) {
      arr.push(Object.values(data[i]));
    }

    data.forEach((value, index) => {
      Object.keys(data[0]).forEach(k => data[0].k);
    });
    */
  }
}
