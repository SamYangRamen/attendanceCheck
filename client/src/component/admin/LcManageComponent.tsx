import React, { useEffect, useState } from 'react';
import DropdownContainer from '../../container/DropdownContainer';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import LcRegisterComponent from '../connect/LcRegisterComponent';
import LcTableComponent from './LcTableComponent';

interface Props {
  year: number;
}

const LcManageComponent: React.FC<Props> = ({ year }: Props) => {
  return (
    <div>
      <LcTableComponent year={year}></LcTableComponent>
    </div>
  );
};

export default LcManageComponent;
