import { Button, Form, Input, Modal, Select } from 'antd';
import { DataType } from 'component/table/EditableTable';
import { useState } from 'react';
import useStore from 'store/useStore';

const { Option } = Select;

interface Props {
  children: JSX.Element;
  openGenerationSearch: boolean;
  setFgMemberTableInfo: (value: React.SetStateAction<DataType[]>) => void;
}

const FgMemberTableSearchComponent: React.FC<Props> = ({
  children,
  openGenerationSearch,
  setFgMemberTableInfo,
}: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();

  const [fgMemberIdSearch, setFgMemberIdSearch] = useState<number>(0);
  const [generationSearch, setGenerationSearch] = useState<number>(0);
  const [fgMemberNameSearch, setFgMemberNameSearch] = useState<string>('');
  const [positionSearch, setPositionSearch] = useState<string>('');
  const [stateSearch, setStateSearch] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    closeModal();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {<div onClick={openModal}>{children ? children : ''}</div>}
      <Modal
        title="FG 멤버 검색"
        width={'400px'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button form="fgMemberTableInfoSearch" type="primary" htmlType="submit">
            {fgMemberIdSearch ||
            generationSearch > 0 ||
            fgMemberNameSearch ||
            positionSearch ||
            stateSearch
              ? '검색'
              : '전체 검색'}
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form id="fgMemberTableInfoSearch" form={form} onFinish={onFinish}>
          {openGenerationSearch ? (
            <Form.Item label="기수">
              <Input
                style={{ width: '50%' }}
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
              style={{ width: '100%' }}
              value={fgMemberIdSearch ? fgMemberIdSearch : ''}
              onChange={e => {
                setFgMemberIdSearch(parseInt(e.target.value) || 0);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item label="이름">
            <Input
              style={{ width: '70%' }}
              value={fgMemberNameSearch}
              onChange={e => {
                setFgMemberNameSearch(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item label="직책">
            <Select
              style={{ width: '50%' }}
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
              style={{ width: '50%' }}
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
        </Form>
      </Modal>
    </div>
  );
};

export default FgMemberTableSearchComponent;
