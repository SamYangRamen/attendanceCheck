import { timeStamp } from 'console';

export default class ValueStore {
  private connectedFgMemberId: number | null = null;
  private isAdmin: boolean | null = null;

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
}
