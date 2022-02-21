import axios from 'axios';

export interface LcAttendanceCheckInfo {
  lcMemberId: number;
  eventIdx: number;
  state: number | undefined;
  note: string;
}

export interface LcAttendanceCheckTableInfo {
  key: React.Key;
  department: string;
  gender: string;
  lcMemberName: string;
  state: number | undefined;
  note: string;
}

export interface PutLcAttendanceCheckInfo {
  lcMemberId: number;
  eventIdx: number;
  columnName: string;
  value: string;
}

export default class LcAttendanceCheckRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public getLcAttendanceCheckTableInfoBySearch(
    year: number,
    lc: string,
    eventIdx: number
  ): Promise<LcAttendanceCheckTableInfo[]> {
    return axios
      .get(`lc-attendance-check-info/table/search?year=${year}&lc=${lc}&eventIdx=${eventIdx}`)
      .then(response => {
        return (response.data as LcAttendanceCheckTableInfo[]).map(value => {
          return { ...value, state: value.state == undefined ? 0 : value.state };
        });
      });
  }

  public deleteLcAttendanceCheckInfo(lcMemberId: number, eventIdx: number): Promise<boolean> {
    return axios
      .delete(`lc-attendance-check-info?lcMemberId=${lcMemberId}&eventIdx=${eventIdx}`)
      .then(response => {
        return response.data;
      });
  }

  public postLcAttendanceCheckInfo(savedValues: LcAttendanceCheckInfo): Promise<boolean> {
    return axios.post(`lc-attendance-check-info`, savedValues).then(response => {
      return response.data;
    });
  }

  public putLcAttendanceCheckInfo(
    putLcAttendanceCheckInfo: PutLcAttendanceCheckInfo
  ): Promise<boolean> {
    return axios.put(`lc-attendance-check-info`, putLcAttendanceCheckInfo).then(response => {
      return response.data;
    });
  }
}
