import { useEffect, useState } from 'react';
import TableContainer, { ColumnInfo } from '../../container/TableContainer';
import { LcInfo, LcInfoWithFgMemberName } from '../../repository/LcRepository';
import useStore from '../../store/useStore';

import { Table, Input, Button, Form, Select } from 'antd';
import EditableTable, { columnType, DataType } from '../table/EditableTable';
import LcAddComponent from './LcAddComponent';

interface Props {
  year: number;
}

const LcTableComponent: React.FC<Props> = ({ year }: Props) => {
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

  const columns: columnType[] = [
    {
      title: '년도',
      tableIndex: 'lc_info',
      dataIndex: 'year',
      width: '8%',
      sorter: (a, b) => a.year.toString().localeCompare(b.year.toString()),
    },
    {
      title: 'LC',
      tableIndex: 'lc_info',
      dataIndex: 'lc',
      width: '9%',
      sorter: (a, b) => a.lc.toString().localeCompare(b.lc.toString()),
    },
    {
      title: '담당자1',
      tableIndex: 'lc_info',
      dataIndex: 'fgMemberName1',
      editable: 'lcModal',
      width: '20%',
    },
    {
      title: '담당자2',
      tableIndex: 'lc_info',
      dataIndex: 'fgMemberName2',
      editable: 'lcModal',
      width: '20%',
    },
    {
      title: '담당자3',
      tableIndex: 'lc_info',
      dataIndex: 'fgMemberName3',
      editable: 'lcModal',
      width: '20%',
    },
    {
      title: '담당자4',
      tableIndex: 'lc_info',
      dataIndex: 'fgMemberName4',
      editable: 'lcModal',
      width: '20%',
    },
  ];

  const [yearSearch, setYearSearch] = useState<number>(0);
  const [lcSearch, setLcSearch] = useState<string>('');
  const [fgMemberName1Search, setFgMemberName1Search] = useState<string>('');
  const [fgMemberName2Search, setFgMemberName2Search] = useState<string>('');
  const [lcTableInfo, setLcTableInfo] = useState<DataType[]>([]);

  const [openYearSearch, setOpenYearSearch] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<React.Key>>([]);

  useEffect(() => {
    setOpenYearSearch(year <= 0 ? true : false);

    if (year != -1)
      lcRepo.getLcInfoListWithFgMemberNameBySearch(year, '', '', '').then(response => {
        setLcTableInfo(
          /*
          response.map<LcInfoWithFgMemberName>((value, index) => {
            return Object.assign({ key: index }, value);
          })
          */
          response
        );
      });
  }, [year]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'yearSearch') {
      setYearSearch(parseInt(e.target.value));
    } else if (e.target.name == 'lcSearch') {
      setLcSearch(e.target.value);
    } else if (e.target.name == 'fg1Search') {
      setFgMemberName1Search(e.target.value);
    } else if (e.target.name == 'fg2Search') {
      setFgMemberName2Search(e.target.value);
    }
  };

  const onSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    lcRepo
      .getLcInfoListWithFgMemberNameBySearch(
        yearSearch == -1 ? 0 : yearSearch,
        lcSearch.trim(),
        fgMemberName1Search.trim(),
        fgMemberName2Search.trim()
      )
      .then(response => {
        setLcTableInfo(
          response
          /*
          response.map<LcInfoWithFgMemberName>((value, index) => {
            return Object.assign({ key: index }, value);
          })
          */
        );
      });
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const lcIdxList: number[] = selectedRowKeys as number[];

    console.log(lcIdxList);
    if (!lcIdxList.length) {
      alert('삭제할 LC 정보가 없습니다.');
    } else {
      lcRepo
        .deleteLcInfoByLcIdxList(lcIdxList)
        .then(response => {
          if (response) {
            setSelectedRowKeys([]);
            alert('LC 정보가 성공적으로 삭제되었습니다.');
          } else {
            alert('오류가 발생하였습니다.');
          }
        })
        .catch(e => {
          alert('오류가 발생하였습니다.');
        });

      setLcTableInfo(
        (lcTableInfo as LcInfoWithFgMemberName[]).filter(
          data => !lcIdxList.includes(data.key as number)
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
                  onChange={onChange}
                  allowClear
                ></Input>
              </Form.Item>
            ) : (
              <></>
            )}
            <Form.Item label="LC">
              <Input name="lcSearch" style={{ width: 130 }} onChange={onChange} allowClear></Input>
            </Form.Item>
            <Form.Item label="FG명 1">
              <Input name="fg1Search" style={{ width: 130 }} onChange={onChange} allowClear></Input>
            </Form.Item>
            <Form.Item label="FG명 2">
              <Input name="fg2Search" style={{ width: 130 }} onChange={onChange} allowClear></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onSearchClick}>
                {yearSearch > 0 || lcSearch || fgMemberName1Search || fgMemberName2Search
                  ? '검색'
                  : '전체 검색'}
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Form layout="inline" initialValues={{ layout: 'inline' }}>
            <Form.Item name={'insertLc'}>
              <LcAddComponent>
                <Button type="primary">추가</Button>
              </LcAddComponent>
            </Form.Item>
            <Form.Item name={'deleteLc'}>
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
        dataSource={lcTableInfo}
        setDataSource={setLcTableInfo}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      ></EditableTable>
    </div>
  );
};

export default LcTableComponent;
