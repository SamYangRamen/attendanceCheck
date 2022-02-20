import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { LcMemberInfo } from 'repository/LcMemberRepository';
import useStore from 'store/useStore';

import * as xlsx from 'xlsx';

const TestComponent: React.FC = () => {
  const { repositoryStore } = useStore();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();

  const [file, setFile] = useState<any | undefined>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      const workBook = xlsx.read(data, { type: 'binary' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const csv = xlsx.utils.sheet_to_csv(workSheet);
      const csvStrList = csv.split('\n');

      csvStrList.forEach(value => {
        const dataArray = value.split(',');

        const lcMemberInfo: LcMemberInfo = {
          year: new Date().getFullYear(),
          lc: dataArray[1],
          department: dataArray[2],
          gender: dataArray[3],
          lcMemberName: dataArray[4],
          contact: dataArray[5],
        };

        console.log('DATA: ' + lcMemberInfo);
        lcMemberRepo.postLcMemberInfo(lcMemberInfo);
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Input type="file" onChange={onChange}></Input>
      <Button type="primary" onClick={onClick}>
        upload
      </Button>
    </>
  );
};

export default TestComponent;
