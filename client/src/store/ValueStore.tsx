import { FgMemberInfo } from '../repository/AccountRepository';
import { observer } from 'mobx-React';
import { observable, makeObservable } from 'mobx';

export default class ValueStore {
  private connectedFgMemberId: number | null = null;
  @observable private isAdmin: boolean | null = null;
  @observable private fgMemberInfoList: Array<FgMemberInfo> | null = null;

  public constructor() {
    makeObservable(this);
  }

  public getFgMemberId(): number | null {
    return this.connectedFgMemberId;
  }
  public setFgMemberId(connectedFgMemberId: number | null) {
    this.connectedFgMemberId = connectedFgMemberId;
  }

  public getIsAdmin(): boolean | null {
    return this.isAdmin;
  }
  public setIsAdmin(isAdmin: boolean | null) {
    this.isAdmin = isAdmin;
  }

  public getFgMemberInfoList(): Array<FgMemberInfo> | null {
    return this.fgMemberInfoList;
  }

  public setFgMemberInfoList(fgMemberInfoList: Array<FgMemberInfo>) {
    this.fgMemberInfoList = fgMemberInfoList;
  }
}
