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
