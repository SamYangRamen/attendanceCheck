import { Button, Form, Input, Modal } from 'antd';
import { DataType } from 'component/table/EditableTable';
import { useState } from 'react';
import useStore from 'store/useStore';

interface Props {
  children: JSX.Element;
  openYearSearch: boolean;
  setLcTableInfo: (value: React.SetStateAction<DataType[]>) => void;
}

const LcTableSearchComponent: React.FC<Props> = ({
  children,
  openYearSearch,
  setLcTableInfo,
}: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

  const [yearSearch, setYearSearch] = useState<number>(0);
  const [lcSearch, setLcSearch] = useState<string>('');
  const [fgMemberName1Search, setFgMemberName1Search] = useState<string>('');
  const [fgMemberName2Search, setFgMemberName2Search] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const onFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <Button form="lcTableInfoSearch" type="primary" htmlType="submit">
            {yearSearch > 0 || lcSearch || fgMemberName1Search || fgMemberName2Search
              ? '검색'
              : '전체 검색'}
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form id="lcTableInfoSearch" form={form} onFinish={onFinish}>
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
        </Form>
      </Modal>
    </div>
  );
};

export default LcTableSearchComponent;
