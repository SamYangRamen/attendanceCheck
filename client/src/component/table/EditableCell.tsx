import React, { useContext, useState, useEffect, useRef, ReactText } from 'react';
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  InputNumber,
  Select,
  Checkbox,
  Switch,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { EditableContext } from './EditableFormRow';
import {
  FgMemberSearchInfo,
  FgMemberTableInfo,
  PutFgMemberInfo,
} from '../../repository/FgMemberRepository';
import useStore from '../../store/useStore';
import { LcInfoWithFgMemberName } from '../../repository/LcRepository';
import LcManagerSearchComponent from '../admin/LcManagerSearchComponent';
import { LcMemberTableInfo } from '../../repository/LcMemberRepository';
import {
  LcAttendanceCheckInfo,
  LcAttendanceCheckTableInfo,
  PutLcAttendanceCheckInfo,
} from 'repository/LcAttendanceCheckRepository';

const { Option } = Select;

type Item =
  | FgMemberTableInfo
  | LcInfoWithFgMemberName
  | FgMemberSearchInfo
  | LcMemberTableInfo
  | LcAttendanceCheckTableInfo;

interface EditableCellProps {
  children: React.ReactNode;
  record: Item;
  editable: string;
  tableIndex: string;
  dataIndex: keyof Item;
  title: React.ReactNode;
  handleSave: (record: Item) => void;
  min: number;
  max: number;
  dropdownContents: string[];
  required: boolean;
}

const attendanceCheckButton = [
  {
    backgroundColor: '#F5F5F5', // 회색 계열
    borderColor: '#D9D9D9',
  },
  {
    backgroundColor: '#F6FFED', // 녹색 계열
    borderColor: '#B7EB8F',
  },
  {
    backgroundColor: '#FFFBE6', // 노란색 계열
    borderColor: '#FFE58F',
  },
];

const EditableCell: React.FC<EditableCellProps> = ({
  children,
  record,
  editable,
  tableIndex,
  dataIndex,
  title,
  handleSave,
  min,
  max,
  required,
  ...restProps
}) => {
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();
  const accountRepo = repositoryStore.getAccountRepository();
  const lcRepo = repositoryStore.getLcRepository();
  const lcAttendanceCheckRepo = repositoryStore.getLcAttendanceCheckRepository();

  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    let savedValues: Item;
    try {
      const values: Item = await form.validateFields();
      if (editable != 'checkbox') toggleEdit();
      savedValues = { ...record, ...values };

      switch (tableIndex) {
        case 'fg_member_info':
          fgMemberRepo.putFgMemberInfo({
            fgMemberId: (record as FgMemberTableInfo).key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
          break;
        case 'lc_member_info':
          lcMemberRepo.putLcMemberInfo({
            lcMemberId: (record as LcMemberTableInfo).key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
          break;
        case 'account_info':
          accountRepo.putAccountInfo({
            fgMemberId: (record as FgMemberTableInfo).key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
          break;
        case 'lc_attendance_check_info':
          if (editable == 'attendanceCheckButton') {
            (savedValues as LcAttendanceCheckTableInfo).state =
              (record as LcAttendanceCheckTableInfo).state == undefined
                ? 0
                : ((record as LcAttendanceCheckTableInfo).state! + 1) % 3;
          } else {
            (savedValues as LcAttendanceCheckTableInfo).state = (
              record as LcAttendanceCheckTableInfo
            ).state;
          }
          if (
            !(savedValues as LcAttendanceCheckTableInfo).state &&
            !(savedValues as LcAttendanceCheckTableInfo).note
          ) {
            lcAttendanceCheckRepo.deleteLcAttendanceCheckInfo(
              parseInt(((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[0]),
              parseInt(((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[1])
            );
          } else if (
            ((record as LcAttendanceCheckTableInfo).state! == 0 &&
              (savedValues as LcAttendanceCheckTableInfo).state == 1 &&
              !(savedValues as LcAttendanceCheckTableInfo).note) ||
            ((record as LcAttendanceCheckTableInfo).state! == 0 &&
              !(record as LcAttendanceCheckTableInfo).note &&
              (savedValues as LcAttendanceCheckTableInfo).note)
          ) {
            lcAttendanceCheckRepo.postLcAttendanceCheckInfo({
              lcMemberId: parseInt(
                ((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[0]
              ),
              eventIdx: parseInt(
                ((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[1]
              ),
              state: (savedValues as LcAttendanceCheckTableInfo).state || 0,
              note: (savedValues as LcAttendanceCheckTableInfo).note,
            } as LcAttendanceCheckInfo);
          } else {
            lcAttendanceCheckRepo.putLcAttendanceCheckInfo({
              lcMemberId: parseInt(
                ((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[0]
              ),
              eventIdx: parseInt(
                ((savedValues as LcAttendanceCheckTableInfo).key as string).split('|')[1]
              ),
              columnName: dataIndex as string,
              value: savedValues[dataIndex] as string,
            } as PutLcAttendanceCheckInfo);
          }
          break;
      }

      handleSave(savedValues);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const saveInModal = async (changedData?: any) => {
    const savedValues = { ...record, [dataIndex]: changedData.fgMemberName as string };
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });

    switch (tableIndex) {
      case 'lc_info':
        lcRepo.putLcInfo({
          lcIdx: (record as LcInfoWithFgMemberName).key as number,
          columnName: 'fgMemberId' + (dataIndex as string)[(dataIndex as string).length - 1],
          fgMemberId: changedData.fgMemberId as number | null,
        });
        break;
    }

    handleSave(savedValues);
  };

  let childNode = children;
  let childrenConsiderNull = (children as Array<string>)[1] ? children : '-';

  if (editable == 'checkbox') {
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Checkbox defaultChecked={!!record[dataIndex]} onChange={save}></Checkbox>
      </Form.Item>
    );
  } else if (editable == 'switch') {
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Switch defaultChecked={!!record[dataIndex]} onChange={save}></Switch>
      </Form.Item>
    );
  } else if (editable == 'attendanceCheckButton') {
    const state: number = ((record as LcAttendanceCheckTableInfo)[dataIndex] as number) || 0;
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Button
          type="text"
          style={{
            backgroundColor: attendanceCheckButton[state].backgroundColor,
            borderColor: attendanceCheckButton[state].borderColor,
          }}
          onClick={save}
        >
          {state == 0 ? '결석' : state == 1 ? '출석' : state == 2 ? '지각' : '결석'}
        </Button>
      </Form.Item>
    );
  } else if (editable == 'lcModal') {
    childNode = (
      <div className={record ? 'editable-cell-value-wrap' : ''}>
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <LcManagerSearchComponent save={saveInModal}>
            {childrenConsiderNull}
          </LcManagerSearchComponent>
        </Form.Item>
      </div>
    );
  } else if (editing) {
    switch (editable) {
      case 'input':
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: required,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input onPressEnter={save} onBlur={save} autoFocus />
          </Form.Item>
        );
        break;
      case 'inputNumber':
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: required,
                message: `${title} is required.`,
              },
            ]}
          >
            <InputNumber onPressEnter={save} onBlur={save} min={min} max={max} autoFocus />
          </Form.Item>
        );
        break;
      case 'select':
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: required,
                message: `${title} is required.`,
              },
            ]}
          >
            <Select
              open
              autoFocus
              showSearch
              optionFilterProp="children"
              onSelect={save}
              onBlur={toggleEdit}
            >
              {restProps.dropdownContents.map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
        );
        break;
      default:
        break;
    }
  } else {
    childNode = (
      <div
        className={record ? 'editable-cell-value-wrap' : ''}
        style={{ paddingRight: /*24*/ 1 }}
        onClick={record ? toggleEdit : undefined}
      >
        {childrenConsiderNull}
      </div>
    );
  }

  return (
    <td className="editableCell" {...restProps}>
      {childNode}
    </td>
  );
};

export default EditableCell;
