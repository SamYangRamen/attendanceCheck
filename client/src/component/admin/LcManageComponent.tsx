import React from 'react';
import LcTableComponent from 'component/admin/LcTableComponent';

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
