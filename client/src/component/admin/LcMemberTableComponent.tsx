import { Button, Form, Input, Select } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useContext, useEffect, useState } from 'react';
import { FgMemberTableInfo } from '../../repository/FgMemberRepository';
import { LcMemberTableInfo } from '../../repository/LcMemberRepository';
import useStore from '../../store/useStore';
import { EditableContext } from '../table/EditableFormRow';
import EditableTable, { columnType, DataType } from '../table/EditableTable';
import FgMemberAddComponent from './FgMemberAddComponent';
import LcMemberAddComponent from './LcMemberAddComponent';

const { Option } = Select;

interface Props {
  year: number;
}

const columns: columnType[] = [
  {
    title: '년도',
    tableIndex: 'lc_member_info',
    dataIndex: 'year',
    sorter: (a, b) => a.year.toString().localeCompare(b.year.toString()),
    width: '10%',
  },
  {
    title: 'LC',
    tableIndex: 'lc_member_info',
    dataIndex: 'lc',
    sorter: (a, b) => a.lc.toString().localeCompare(b.lc.toString()),
    width: '10%',
  },
  {
    title: '계열',
    tableIndex: 'lc_member_info',
    dataIndex: 'department',
    sorter: (a, b) => a.department.toString().localeCompare(b.department.toString()),
    editable: 'input',
    width: '25%',
  },
  {
    title: '성별',
    tableIndex: 'lc_member_info',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.toString().localeCompare(b.gender.toString()),
    editable: 'select',
    dropdownContents: ['남', '여'],
    width: '10%',
  },
  {
    title: '이름',
    tableIndex: 'lc_member_info',
    dataIndex: 'lcMemberName',
    sorter: (a, b) => a.lcMemberName.toString().localeCompare(b.lcMemberName.toString()),
    editable: 'input',
    width: '17%',
  },
  {
    title: '연락처',
    tableIndex: 'lc_member_info',
    dataIndex: 'contact',
    editable: 'input',
    width: '25%',
  },
];

const LcMemberTableCompnent: React.FC<Props> = ({ year }: Props) => {
  const { repositoryStore } = useStore();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();
  const [lcMemberTableInfo, setLcMemberTableInfo] = useState<DataType[]>([]);

  const [yearSearch, setYearSearch] = useState<number>(0);
  const [lcSearch, setLcSearch] = useState<string>('');
  const [departmentSearch, setDepartmentSearch] = useState<string>('');
  const [genderSearch, setGenderSearch] = useState<string>('');
  const [lcMemberNameSearch, setLcMemberNameSearch] = useState<string>('');

  const [openYearSearch, setOpenYearSearch] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<React.Key>>([]);

  useEffect(() => {
    setOpenYearSearch(year <= 0 ? true : false);

    if (year != -1) {
      lcMemberRepo.getLcMemberTableInfoListBySearch(year, '', '', '', '').then(response => {
        setLcMemberTableInfo(response);
      });
    }
  }, [year]);

  const onSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    lcMemberRepo
      .getLcMemberTableInfoListBySearch(
        yearSearch,
        lcSearch.trim(),
        departmentSearch.trim(),
        genderSearch.trim(),
        lcMemberNameSearch.trim()
      )
      .then(response => {
        setLcMemberTableInfo(response);
      });
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fgMemberIdList: number[] = selectedRowKeys as number[];

    if (!fgMemberIdList.length) {
      alert('삭제할 LC 멤버 정보가 없습니다.');
    } else {
      lcMemberRepo
        .deleteLcMemberInfoByLcMemberIdList(fgMemberIdList)
        .then(response => {
          setSelectedRowKeys([]);
          if (response) {
            alert('LC 멤버 정보가 성공적으로 삭제되었습니다.');
          } else {
            alert('오류가 발생하였습니다.');
          }
        })
        .catch(e => {
          alert('오류가 발생하였습니다.');
        });

      setLcMemberTableInfo(
        (lcMemberTableInfo as LcMemberTableInfo[]).filter(
          data => !fgMemberIdList.includes(data.key as number)
        )
      );
    }
  };

  return (
    <div>
      <Form layout="inline" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Form.Item style={{ margin: 0 }}>
          <Form layout="inline" initialValues={{ layout: 'inline' }}>
            {openYearSearch ? (
              <Form.Item label="년도">
                <Input
                  value={yearSearch ? yearSearch : ''}
                  name="yearSearch"
                  style={{ width: 130 }}
                  onChange={e => {
                    setYearSearch(parseInt(e.target.value));
                  }}
                  allowClear
                ></Input>
              </Form.Item>
            ) : (
              <></>
            )}
            <Form.Item label="LC">
              <Input
                value={lcSearch ? lcSearch : ''}
                style={{ width: 130 }}
                onChange={e => {
                  setLcSearch(e.target.value);
                }}
                allowClear
              ></Input>
            </Form.Item>
            <Form.Item label="계열">
              <Input
                value={departmentSearch ? departmentSearch : ''}
                style={{ width: 130 }}
                onChange={e => {
                  setDepartmentSearch(e.target.value);
                }}
                allowClear
              ></Input>
            </Form.Item>
            <Form.Item label="성별">
              <Select
                style={{ width: 130 }}
                showSearch
                optionFilterProp="children"
                onChange={value => {
                  setGenderSearch(value);
                }}
              >
                {['', '남', '여'].map<JSX.Element>(value => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="이름">
              <Input
                value={lcMemberNameSearch}
                style={{ width: 130 }}
                onChange={e => {
                  setLcMemberNameSearch(e.target.value);
                }}
                allowClear
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onSearchClick}>
                {yearSearch > 0 ||
                lcSearch ||
                departmentSearch ||
                genderSearch ||
                lcMemberNameSearch
                  ? '검색'
                  : '전체 검색'}
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Form layout="inline" initialValues={{ layout: 'inline' }}>
            <Form.Item name={'insertLcMember'}>
              <LcMemberAddComponent>
                <Button type="primary">추가</Button>
              </LcMemberAddComponent>
            </Form.Item>
            <Form.Item name={'deleteLcMember'}>
              <Button type="primary" onClick={onDeleteClick} disabled={!selectedRowKeys.length}>
                삭제
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
      </Form>
      <br />
      <EditableTable
        columns={columns}
        dataSource={lcMemberTableInfo}
        setDataSource={setLcMemberTableInfo}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      ></EditableTable>
    </div>
  );
};

export default LcMemberTableCompnent;
