import { Button, Form, Input, Select } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useContext, useEffect, useState } from 'react';
import { FgMemberTableInfo } from '../../repository/FgMemberRepository';
import useStore from '../../store/useStore';
import { EditableContext } from '../table/EditableFormRow';
import EditableTable, { columnType, DataType } from '../table/EditableTable';
import FgMemberAddComponent from './FgMemberAddComponent';

const { Option } = Select;

interface Props {
  generation: number;
}

const columns: columnType[] = [
  {
    title: '학번',
    tableIndex: 'fg_member_info',
    dataIndex: 'fgMemberId',
    sorter: (a, b) => a.fgMemberId.toString().localeCompare(b.fgMemberId.toString()),
    editable: 'input',
    width: '15%',
  },
  {
    title: '기수',
    tableIndex: 'fg_member_info',
    dataIndex: 'generation',
    sorter: (a, b) => a.generation.toString().localeCompare(b.generation.toString()),
    editable: 'inputNumber',
    width: '7%',
    min: 1,
    max: new Date().getFullYear() - 2006,
  },
  {
    title: '이름',
    tableIndex: 'fg_member_info',
    dataIndex: 'fgMemberName',
    sorter: (a, b) => a.fgMemberName.toString().localeCompare(b.fgMemberName.toString()),
    editable: 'input',
    width: '12%',
  },
  {
    title: '직책',
    tableIndex: 'fg_member_info',
    dataIndex: 'position',
    editable: 'select',
    dropdownContents: ['회장', '부회장', '팀장', '부원'],
    width: '7%',
  },
  {
    title: '상태',
    tableIndex: 'fg_member_info',
    dataIndex: 'state',
    editable: 'select',
    dropdownContents: ['재학', '휴학', '유학', '졸업'],
    width: '7%',
  },
  {
    title: '연락처',
    tableIndex: 'fg_member_info',
    dataIndex: 'contact',
    editable: 'input',
    width: '15%',
  },
  {
    title: '이메일',
    tableIndex: 'fg_member_info',
    dataIndex: 'mail',
    editable: 'input',
    width: '20%',
  },
  {
    title: '관리자',
    tableIndex: 'account_info',
    dataIndex: 'isAdmin',
    editable: 'checkbox',
    width: '7%',
  },
  {
    title: '등록',
    tableIndex: 'account_info',
    dataIndex: 'registerApproval',
    editable: 'checkbox',
    width: '7%',
  },
];

const FgMemberTableCompnent: React.FC<Props> = ({ generation }: Props) => {
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();
  const [fgMemberTableInfo, setFgMemberTableInfo] = useState<DataType[]>([]);

  const [fgMemberIdSearch, setFgMemberIdSearch] = useState<number>(0);
  const [generationSearch, setGenerationSearch] = useState<number>(0);
  const [fgMemberNameSearch, setFgMemberNameSearch] = useState<string>('');
  const [positionSearch, setPositionSearch] = useState<string>('');
  const [stateSearch, setStateSearch] = useState<string>('');

  const [openGenerationSearch, setOpenGenerationSearch] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<React.Key>>([]);

  useEffect(() => {
    setOpenGenerationSearch(generation <= 0 ? true : false);

    if (generation != -1) {
      fgMemberRepo.getFgMemberTableInfoListByGeneration(generation).then(response => {
        setFgMemberTableInfo(response);
      });
    }
  }, [generation]);

  const onSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fgMemberRepo
      .getFgMemberInfoListBySearch(
        fgMemberIdSearch,
        generationSearch,
        fgMemberNameSearch.trim(),
        positionSearch.trim(),
        stateSearch.trim()
      )
      .then(response => {
        setFgMemberTableInfo(response);
      });
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fgMemberIdList: number[] = selectedRowKeys as number[];

    if (!fgMemberIdList.length) {
      alert('삭제할 FG 멤버 정보가 없습니다.');
    } else {
      fgMemberRepo
        .deletefgMemberInfoByfgMemberIdList(fgMemberIdList)
        .then(response => {
          setSelectedRowKeys([]);
          if (response) {
            alert('FG 멤버 정보가 성공적으로 삭제되었습니다.');
          } else {
            alert('오류가 발생하였습니다.');
          }
        })
        .catch(e => {
          alert('오류가 발생하였습니다.');
        });

      setFgMemberTableInfo(
        (fgMemberTableInfo as FgMemberTableInfo[]).filter(
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
            {openGenerationSearch ? (
              <Form.Item label="기수">
                <Input
                  value={generationSearch ? generationSearch : ''}
                  style={{ width: 130 }}
                  onChange={e => {
                    setGenerationSearch(parseInt(e.target.value) || 0);
                  }}
                  allowClear
                ></Input>
              </Form.Item>
            ) : (
              <></>
            )}
            <Form.Item label="학번">
              <Input
                value={fgMemberIdSearch ? fgMemberIdSearch : ''}
                style={{ width: 130 }}
                onChange={e => {
                  setFgMemberIdSearch(parseInt(e.target.value) || 0);
                }}
                allowClear
              ></Input>
            </Form.Item>
            <Form.Item label="이름">
              <Input
                value={fgMemberNameSearch}
                style={{ width: 130 }}
                onChange={e => {
                  setFgMemberNameSearch(e.target.value);
                }}
                allowClear
              ></Input>
            </Form.Item>
            <Form.Item label="직책">
              <Select
                style={{ width: 130 }}
                showSearch
                optionFilterProp="children"
                onChange={value => {
                  setPositionSearch(value);
                }}
              >
                {['', '회장', '부회장', '팀장', '부원'].map<JSX.Element>(value => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="상태">
              <Select
                style={{ width: 130 }}
                showSearch
                optionFilterProp="children"
                onChange={value => {
                  setStateSearch(value);
                }}
              >
                {['', '재학', '휴학', '유학', '졸업'].map<JSX.Element>(value => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onSearchClick}>
                {fgMemberIdSearch ||
                generationSearch > 0 ||
                fgMemberNameSearch ||
                positionSearch ||
                stateSearch
                  ? '검색'
                  : '전체 검색'}
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Form layout="inline" initialValues={{ layout: 'inline' }}>
            <Form.Item name={'deleteFgMember'}>
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
        dataSource={fgMemberTableInfo}
        setDataSource={setFgMemberTableInfo}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      ></EditableTable>
    </div>
  );
};

export default FgMemberTableCompnent;
