import { useEffect, useState } from 'react';
import { LcInfoWithFgMemberName } from 'repository/LcRepository';
import useStore from 'store/useStore';

import { Input, Button, Form } from 'antd';
import EditableTable, { columnType, DataType } from 'component/table/EditableTable';
import LcAddComponent from 'component/admin/LcAddComponent';
import LcTableSearchComponent from 'component/admin/LcTableSearchComponent';
import ExportExcelComponent from './ExportExcelComponent';

interface Props {
  year: number;
}

const columns: columnType[] = [
  {
    title: '년도',
    dataIndex: 'year',
    width: '8%',
    sorter: (a, b) => a.year.toString().localeCompare(b.year.toString()),
  },
  {
    title: 'LC',
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

const LcTableComponent: React.FC<Props> = ({ year }: Props) => {
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

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

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const lcIdxList: number[] = selectedRowKeys as number[];

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
      <Form
        layout="inline"
        style={{
          width: '100%',
          justifyContent: window.innerWidth <= 640 ? 'center' : 'right',
        }}
      >
        <Form.Item>
          <LcTableSearchComponent openYearSearch={openYearSearch} setLcTableInfo={setLcTableInfo}>
            <Button className="manageButton" type="primary">
              검색
            </Button>
          </LcTableSearchComponent>
        </Form.Item>
        <Form.Item>
          <ExportExcelComponent rowList={lcTableInfo}></ExportExcelComponent>
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Form layout="inline" initialValues={{ layout: 'inline' }}>
            <Form.Item name={'insertLc'}>
              <LcAddComponent>
                <Button className="manageButton" type="primary">
                  추가
                </Button>
              </LcAddComponent>
            </Form.Item>
            <Form.Item name={'deleteLc'}>
              <Button
                className="manageButton"
                type="primary"
                onClick={onDeleteClick}
                disabled={!selectedRowKeys.length}
              >
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
