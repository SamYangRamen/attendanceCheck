import { useContext, createContext } from 'react';
import RootStore from './RootStore';
import { StoreContext } from './StoreProvider';

const useStore = (): RootStore => useContext(StoreContext);

export default useStore;
