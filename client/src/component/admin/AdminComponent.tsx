import React, { useEffect, useState } from 'react';
import FgMemberTableComponent from './FgMemberTableComponent';

const AdminComponent: React.FC = () => {
  const maxGeneration: number = new Date().getFullYear() - 2006;
  const [generation, setGeneration] = useState<number>(0);

  const yearList: JSX.Element[] = Array.from({ length: maxGeneration }, (_, i) => (
    <div
      onClick={e => {
        if (e.currentTarget.textContent) setGeneration(parseInt(e.currentTarget.textContent));
      }}
    >
      {i + 1}
    </div>
  ));

  /*
  useEffect(() => {
    for (let i = 0; i < new Date().getFullYear() - 2006; i++) {
      yearList.push(<div onClick={onClick}>{i + 1}</div>);
    }
  }, []);


  const onClsick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) setGeneration(parseInt(e.currentTarget.textContent));
  };
*/

  return (
    <div>
      {yearList}
      <FgMemberTableComponent generation={generation}></FgMemberTableComponent>
    </div>
  );
};

export default AdminComponent;
