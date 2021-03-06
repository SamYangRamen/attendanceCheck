import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import EditableRow, { EditableContext } from './EditableFormRow';
import EditableCell from './EditableCell';
import { FgMemberSearchInfo, FgMemberTableInfo } from '../../repository/FgMemberRepository';
import useStore from '../../store/useStore';
import { LcInfoWithFgMemberName } from '../../repository/LcRepository';
import { LcMemberTableInfo } from '../../repository/LcMemberRepository';
import { LcAttendanceCheckTableInfo } from 'repository/LcAttendanceCheckRepository';

// type EditableTableProps = Parameters<typeof Table>[0];

export type DataType =
  | FgMemberTableInfo
  | LcInfoWithFgMemberName
  | FgMemberSearchInfo
  | LcMemberTableInfo
  | LcAttendanceCheckTableInfo;

interface Props {
  columns: columnType[];
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: (value: React.SetStateAction<React.Key[]>) => void;
}

export interface columnType {
  title: string;
  tableIndex?: string;
  dataIndex: string;
  width?: string;
  editable?: string;
  sorter?: (a: any, b: any) => number;
  min?: number;
  max?: number;
  dropdownContents?: (string | number)[];
  required?: boolean;
}

// type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableTable: React.FC<Props> = ({
  columns,
  dataSource,
  setDataSource,
  selectedRowKeys,
  setSelectedRowKeys,
  ...props
}: Props) => {
  const handleSave = (savedValues: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => savedValues.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...savedValues,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const resultColumns = (columns as columnType[]).map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        tableIndex: col.tableIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        sorter: col.sorter,
        min: col.min,
        max: col.max,
        dropdownContents: col.dropdownContents || undefined,
        required: col.required,
      }),
    };
  });

  let rowSelection = undefined;

  if (!!setSelectedRowKeys) {
    rowSelection = {
      selectedRowKeys,
      onChange: (newSelectedRowKeys: Array<React.Key>) => setSelectedRowKeys(newSelectedRowKeys),
      selections: [
        {
          key: 'allSelectTrue',
          text: '?????? ??????',
          onSelect: () => {
            const newSelectedRowKeys: Array<React.Key> = dataSource.map(data => {
              return data.key;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
        {
          key: 'allSelectFalse',
          text: '?????? ?????? ??????',
          onSelect: () => {
            setSelectedRowKeys([]);
          },
        },
      ],
    };
  }

  return (
    <div>
      <Table
        className="table"
        rowSelection={rowSelection}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={resultColumns}
      />
    </div>
  );
};

export default EditableTable;
