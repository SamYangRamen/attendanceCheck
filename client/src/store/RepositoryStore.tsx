import AccountRepository from '../repository/AccountRepository';
import FgMemberRepository from '../repository/FgMemberRepository';

export default class RepositoryStore {
  private baseUrl: string = 'http://localhost:4000/';
  private accountRepository: AccountRepository = new AccountRepository(this.baseUrl);
  private fgMemberRepository: FgMemberRepository = new FgMemberRepository(this.baseUrl);

  public getAccountRepository(): AccountRepository {
    return this.accountRepository;
  }

  public getFgMemberRepository(): FgMemberRepository {
    return this.fgMemberRepository;
  }
}
