import React, { useContext } from 'react';
import { Form, Select, Modal, Button, Input, Table } from 'antd';
import { ChangeEventHandler, useState } from 'react';
import useStore from '../../store/useStore';
import { FgMemberSearchInfo } from '../../repository/FgMemberRepository';
import { EditableContext } from '../table/EditableFormRow';
import EditableTable, { columnType } from '../table/EditableTable';

const { Option } = Select;

interface Props {
  children: React.ReactNode;
  save: (changedData?: any) => void;
}

const LcManagerSearchComponent: React.FC<Props> = ({ children, save }: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchGeneration, setSearchGeneration] = useState<number>(0);
  const [searchPosition, setSearchPosition] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [fgMemberSearchInfoList, setFgMemberSearchInfoList] = useState<FgMemberSearchInfo[]>([]);
  const [selectedSearchInfo, setSelectedSearchInfo] = useState<FgMemberSearchInfo | undefined>();

  const maxGeneration = new Date().getFullYear() - 2006;

  const columns: columnType[] = [
    {
      title: '기수',
      tableIndex: 'null',
      dataIndex: 'generation',
    },
    {
      title: '학번',
      tableIndex: 'null',
      dataIndex: 'fgMemberId',
    },
    {
      title: '이름',
      tableIndex: 'null',
      dataIndex: 'fgMemberName',
    },
    {
      title: '직위',
      tableIndex: 'null',
      dataIndex: 'position',
    },
  ];

  const fgGenerationList: JSX.Element[] = Array.from({ length: maxGeneration + 1 }, (_, i) => (
    <Option value={i}>{i ? `${i}기 (${2006 + i}년)` : ' '}</Option>
  ));

  const fgPositionList: JSX.Element[] = ['', '회장', '부회장', '팀장', '부원'].map<JSX.Element>(
    value => <Option value={value}>{value}</Option>
  );

  const onChangeGeneration = (value: string) => {
    setSearchGeneration(parseInt(value));
  };

  const onChangePosition = (value: string) => {
    setSearchPosition(value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fgMemberRepo
      .getFgMemberSearchInfoListBySearch(searchGeneration, searchPosition, searchName)
      .then(response => {
        setFgMemberSearchInfoList(response);
      })
      .catch(e => {
        alert(e);
      });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const onRowSelect = (e: FgMemberSearchInfo) => {
    setSelectedSearchInfo(e);
  };

  const onFinish = async (e: React.MouseEvent<HTMLElement>) => {
    if (!!selectedSearchInfo)
      save({
        fgMemberId: selectedSearchInfo?.fgMemberId as number,
        fgMemberName: selectedSearchInfo?.fgMemberName as string,
      });
    else
      save({
        fgMemberId: null as null,
        fgMemberName: '' as string,
      });
    closeModal();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {<div onClick={openModal}>{children ? children : ''}</div>}
      <Modal
        width={'800px'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            form="lcManagerModify"
            type="primary"
            htmlType="submit"
            disabled={!selectedSearchInfo}
          >
            완료
          </Button>,
          <Button
            form="lcManagerModify"
            type="primary"
            htmlType="submit"
            disabled={!!selectedSearchInfo}
          >
            삭제
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form
          id="lcManagerModify"
          form={form}
          onFinish={onFinish}
          layout="inline"
          initialValues={{ layout: 'inline' }}
        >
          <Form.Item label="기수" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ minWidth: 130 }}
              placeholder="기수 선택"
              optionFilterProp="children"
              onChange={onChangeGeneration}
              allowClear
            >
              {fgGenerationList}
            </Select>
          </Form.Item>
          <Form.Item label="직위" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ minWidth: 130 }}
              placeholder="직위 선택"
              optionFilterProp="children"
              onChange={onChangePosition}
              allowClear
            >
              {fgPositionList}
            </Select>
          </Form.Item>
          <Form.Item label="이름" rules={[{ required: true }]}>
            <Input style={{ width: 130 }} onChange={onChangeName} allowClear></Input>
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Button type="primary" onClick={onClick}>
              {searchGeneration > 0 || searchPosition || searchName ? '검색' : '전체 검색'}
            </Button>
          </Form.Item>
        </Form>
        <br />
        <Form>
          <Form.Item rules={[{ required: true }]}>
            <Table
              rowSelection={{
                type: 'radio',
                onSelect: onRowSelect,
              }}
              columns={columns}
              dataSource={fgMemberSearchInfoList}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LcManagerSearchComponent;
