import AccountRepository from '../repository/AccountRepository';
import FgMemberRepository from '../repository/FgMemberRepository';
import LcMemberRepository from '../repository/LcMemberRepository';
import LcRepository from '../repository/LcRepository';

export default class RepositoryStore {
  private baseUrl: string = 'http://localhost:4000/';
  private accountRepository: AccountRepository = new AccountRepository(this.baseUrl);
  private fgMemberRepository: FgMemberRepository = new FgMemberRepository(this.baseUrl);
  private lcMemberRepository: LcMemberRepository = new LcMemberRepository(this.baseUrl);
  private lcRepository: LcRepository = new LcRepository(this.baseUrl);

  public getAccountRepository(): AccountRepository {
    return this.accountRepository;
  }

  public getFgMemberRepository(): FgMemberRepository {
    return this.fgMemberRepository;
  }

  public getLcMemberRepository(): LcMemberRepository {
    return this.lcMemberRepository;
  }

  public getLcRepository(): LcRepository {
    return this.lcRepository;
  }
}
