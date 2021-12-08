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

export default class AccountRepository {
  public constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  public postAccountInfo(accountInfo: AccountInfo): Promise<boolean> {
    return axios.post(`post/account-info`, accountInfo).then(response => {
      return response.data;
    });
  }

  public getAccountInfo(account: string): Promise<AccountInfo> {
    return axios.get(`get/account-info?account=${account}`).then(response => {
      return response.data;
    });
  }

  public getPassword(account: LoginInfoDTO): Promise<string> {
    return axios
      .get(`get/password?account=${account}`)
      .then(response => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
  }
}
