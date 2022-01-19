import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownContainer from '../../container/DropdownContainer';
import FgMemberRegisterComponent from '../connect/FgMemberRegisterComponent';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import FgMemberTableComponent from './FgMemberTableComponent';
import LcTableComponent from './LcTableComponent';

const FgMemberManageComponent: React.FC = () => {
  const maxGeneration: number = new Date().getFullYear() - 2006;
  const [generation, setGeneration] = useState<number>(0);
  const [onOff, setOnOff] = useState<boolean>(false);

  const generationList: JSX.Element[] = Array.from({ length: maxGeneration }, (_, i) => (
    <div
      onClick={e => {
        if (e.currentTarget.textContent) setGeneration(parseInt(e.currentTarget.textContent));
      }}
    >
      {i + 1}
    </div>
  ));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneration(parseInt(e.target.value));
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == 'generation') setGeneration(parseInt(e.target.value));
  };

  useEffect(() => {
    if (!generation) {
      setGeneration(0);
    }
  }, [generation]);

  return (
    <div>
      <div className="table">
        <div className="tableContents">
          <div className="tableUtils">
            <DropdownContainer
              name="generation"
              value={generation}
              contents={Array.from({ length: maxGeneration + 1 }, (_, i) => (i == 0 ? '' : i))}
              onChange={onSelectChange}
            />
            <input
              name="generation"
              value={generation == 0 ? '' : generation}
              onChange={onInputChange}
            />
            <FgMemberRegisterComponent buttonName="등록"></FgMemberRegisterComponent>
            <FgMemberRegisterComponent buttonName="등록"></FgMemberRegisterComponent>
            <FgMemberRegisterComponent buttonName="등록"></FgMemberRegisterComponent>
          </div>
          <FgMemberTableComponent generation={generation}>
            <></>
          </FgMemberTableComponent>
        </div>
      </div>
    </div>
  );
};

export default FgMemberManageComponent;
