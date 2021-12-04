import AccountRepository from '../repository/AccountRepository';

export default class RepositoryStore {
  private baseUrl: string = 'http://localhost:4000/';
  private accountRepository: AccountRepository = new AccountRepository(this.baseUrl);

  public getConnectRepository(): AccountRepository {
    return this.accountRepository;
  }
}
