import axios from 'axios';

export interface AccountInfo {
  fgMemberId: number;
  password: string;
  salt: string;
  isAdmin: boolean;
  registerApproval: boolean;
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

export interface LoginInfoDTO {
  account: string;
  password: string;
  isAdminLogin: boolean;
}

export interface PutAccountInfo {
  fgMemberId: number;
  columnName: string;
  value: string;
}

export default class AccountRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postAccountInfo(accountInfo: AccountInfo): Promise<boolean> {
    return axios.post(`account-info`, accountInfo).then(response => {
      return response.data;
    });
  }

  public getAccountInfo(account: string): Promise<AccountInfo> {
    return axios.get(`account-info?account=${account}`).then(response => {
      return response.data;
    });
  }

  public putAccountInfo(putAccountInfo: PutAccountInfo): Promise<boolean> {
    return axios.put(`account-info`, putAccountInfo).then(response => {
      return response.data;
    });
  }
}
