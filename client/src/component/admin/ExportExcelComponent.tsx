import { Button, Input } from 'antd';
import { DataType } from 'component/table/EditableTable';
import moment from 'moment';
import React from 'react';
import * as xlsx from 'xlsx';

interface Props {
  rowList: DataType[];
}

const ExportExcelComponent: React.FC<Props> = ({ rowList }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // interface에서 key attribute를 제거하여 생성한 2차원 배열
    const rowListAsTwoDimArray = rowList.map(value => {
      return Object.entries(value)
        .slice(1)
        .map(value => {
          return value[1];
        });
    });

    /*
    const workSheet = xlsx.utils.json_to_sheet(rowList, {
      skipHeader: true,
    });
    */
    const workSheet = xlsx.utils.aoa_to_sheet(rowListAsTwoDimArray);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1');

    const fileNameFromDate = moment(new Date()).format('YYYY-MM-DD-hh-mm-ss-SSSSSS');
    xlsx.writeFile(workBook, `${fileNameFromDate}.xlsx`);
  };

  return (
    <Button className="manageButton" type="primary" onClick={onClick} disabled={!rowList.length}>
      엑셀로 저장
    </Button>
  );
};

export default ExportExcelComponent;
