import { Alert, Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { FgMemberTableInfo } from 'repository/FgMemberRepository';
import useStore from 'store/useStore';
import EditableTable, { columnType, DataType } from 'component/table/EditableTable';
import FgMemberTableSearchComponent from './FgMemberTableSearchComponent';
import ExportExcelComponent from './ExportExcelComponent';

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
    required: true,
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
    required: true,
  },
  {
    title: '이름',
    tableIndex: 'fg_member_info',
    dataIndex: 'fgMemberName',
    sorter: (a, b) => a.fgMemberName.toString().localeCompare(b.fgMemberName.toString()),
    editable: 'input',
    width: '12%',
    required: true,
  },
  {
    title: '직책',
    tableIndex: 'fg_member_info',
    dataIndex: 'position',
    editable: 'select',
    dropdownContents: ['회장', '부회장', '팀장', '부원'],
    width: '7%',
    required: true,
  },
  {
    title: '상태',
    tableIndex: 'fg_member_info',
    dataIndex: 'state',
    editable: 'select',
    dropdownContents: ['재학', '휴학', '유학', '졸업'],
    width: '7%',
    required: true,
  },
  {
    title: '연락처',
    tableIndex: 'fg_member_info',
    dataIndex: 'contact',
    editable: 'input',
    width: '15%',
    required: true,
  },
  {
    title: '이메일',
    tableIndex: 'fg_member_info',
    dataIndex: 'mail',
    editable: 'input',
    width: '20%',
    required: true,
  },
  {
    title: '관리자',
    tableIndex: 'account_info',
    dataIndex: 'isAdmin',
    editable: 'switch',
    width: '7%',
  },
  {
    title: '등록',
    tableIndex: 'account_info',
    dataIndex: 'registerApproval',
    editable: 'switch',
    width: '7%',
  },
];

const FgMemberTableCompnent: React.FC<Props> = ({ generation }: Props) => {
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();
  const [fgMemberTableInfo, setFgMemberTableInfo] = useState<DataType[]>([]);

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
      <Form
        layout="inline"
        style={{
          width: '100%',
          justifyContent: window.innerWidth <= 640 ? 'center' : 'right',
        }}
      >
        <Form.Item>
          <FgMemberTableSearchComponent
            openGenerationSearch={openGenerationSearch}
            setFgMemberTableInfo={setFgMemberTableInfo}
          >
            <Button type="primary">검색</Button>
          </FgMemberTableSearchComponent>
        </Form.Item>
        <Form.Item>
          <ExportExcelComponent rowList={fgMemberTableInfo}></ExportExcelComponent>
        </Form.Item>
        <Form.Item>
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
