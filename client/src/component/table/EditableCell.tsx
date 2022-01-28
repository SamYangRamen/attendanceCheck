import React, { useContext, useState, useEffect, useRef, ReactText } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Select, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { EditableContext } from './EditableFormRow';
import { FgMemberSearchInfo, FgMemberTableInfo } from '../../repository/FgMemberRepository';
import useStore from '../../store/useStore';
import { LcInfoWithFgMemberName } from '../../repository/LcRepository';
import LcManagerSearchComponent from '../admin/LcManagerSearchComponent';

const { Option } = Select;

type Item = FgMemberTableInfo | LcInfoWithFgMemberName | FgMemberSearchInfo;

interface EditableCellProps {
  title: React.ReactNode;
  editable: string;
  children: React.ReactNode;
  tableIndex: string;
  dataIndex: keyof Item;
  record: Item;
  dropdownContents: string[];
  min: number;
  max: number;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  tableIndex,
  dataIndex,
  record,
  min,
  max,
  handleSave,
  ...restProps
}) => {
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();
  const accountRepo = repositoryStore.getAccountRepository();
  const lcRepo = repositoryStore.getLcRepository();

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
            fgMemberId: record.key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
          break;
        case 'lc_member_info':
          lcMemberRepo.putLcMemberInfo({
            lcMemberId: record.key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
          break;
        case 'account_info':
          accountRepo.putAccountInfo({
            fgMemberId: record.key as number,
            columnName: dataIndex as string,
            value: savedValues[dataIndex] as string,
          });
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
          lcIdx: record.key as number,
          columnName: 'fgMemberId' + (dataIndex as string)[(dataIndex as string).length - 1],
          fgMemberId: changedData.fgMemberId as number,
        });
        break;
    }

    handleSave(savedValues);
  };

  let childNode = children;
  let childrenConsiderNull = (children as Array<string>)[1] ? children : '-';

  /*
  (children as Array<string>)[1];
  console.log(
    (children as []).map((value, index) => {
      console.log(index.toString() + ' | ' + value);
    })
  );
  */

  if (editable == 'checkbox') {
    childNode = (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Checkbox defaultChecked={!!record[dataIndex]} onChange={save}></Checkbox>
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
                required: true,
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
                required: true,
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
                required: true,
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
