import React, { useEffect, useState } from 'react';
import DropdownContainer from '../../container/DropdownContainer';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import LcRegisterComponent from '../connect/LcRegisterComponent';
import FgMemberTableComponent from './FgMemberTableComponent';
import LcTableComponent from './LcTableComponent';

const LcManageComponent: React.FC = () => {
  const maxYear: number = new Date().getFullYear();
  const [year, setYear] = useState<number>(0);
  const [onOff, setOnOff] = useState<boolean>(false);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == 'year') setYear(parseInt(e.target.value));
  };

  /*
  const yearList: JSX.Element[] = Array.from({ length: maxYear - 1970 }, (_, i) => (
    <div
      onClick={e => {
        if (e.currentTarget.textContent) setYear(parseInt(e.currentTarget.textContent));
      }}
    >
      {i + 1971}
    </div>
  ));
*/

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value));
  };

  useEffect(() => {
    if (!year) {
      setYear(0);
    }
  }, [year]);

  return (
    <div>
      <DropdownContainer
        name="year"
        value={year}
        contents={Array.from({ length: maxYear - 1970 }, (_, i) => i + 1971)}
        onChange={onSelectChange}
      />
      <input name="year" value={year == 0 ? '' : year} onChange={onInputChange} />
      <LcTableComponent year={year}></LcTableComponent>
      <input
        type="button"
        value="ON/OFF"
        onClick={e => {
          setOnOff(!onOff);
        }}
      />
      {onOff ? <LcRegisterComponent setOnOff={setOnOff} /> : <></>}
    </div>
  );
};

export default LcManageComponent;
