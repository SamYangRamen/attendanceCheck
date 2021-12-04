import RepositoryStore from './RepositoryStore';
import ValueStore from './ValueStore';

export default interface RootStore {
  valueStore: ValueStore;
  repositoryStore: RepositoryStore;
}
