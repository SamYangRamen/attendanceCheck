import { Button, Form, Input, Modal, Select } from 'antd';
import { DataType } from 'component/table/EditableTable';
import { useState } from 'react';
import useStore from 'store/useStore';

const { Option } = Select;

interface Props {
  children: JSX.Element;
  openYearSearch: boolean;
  setLcMemberTableInfo: (value: React.SetStateAction<DataType[]>) => void;
}

const LcMemberTableSearchComponent: React.FC<Props> = ({
  children,
  openYearSearch,
  setLcMemberTableInfo,
}: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();

  const [yearSearch, setYearSearch] = useState<number>(0);
  const [lcSearch, setLcSearch] = useState<string>('');
  const [departmentSearch, setDepartmentSearch] = useState<string>('');
  const [genderSearch, setGenderSearch] = useState<string>('');
  const [lcMemberNameSearch, setLcMemberNameSearch] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        title="LC 멤버 검색"
        width={'400px'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button form="lcMemberTableInfoSearch" type="primary" htmlType="submit">
            {yearSearch > 0 || lcSearch || departmentSearch || genderSearch || lcMemberNameSearch
              ? '검색'
              : '전체 검색'}
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form id="lcMemberTableInfoSearch" form={form} onFinish={onFinish}>
          {openYearSearch ? (
            <Form.Item className="searchInput" label="년도">
              <Input
                className="searchInput"
                value={yearSearch ? yearSearch : ''}
                name="yearSearch"
                onChange={e => {
                  setYearSearch(parseInt(e.target.value));
                }}
                allowClear
              ></Input>
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item className="searchInput" label="LC">
            <Input
              value={lcSearch ? lcSearch : ''}
              onChange={e => {
                setLcSearch(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item className="searchInput" label="계열">
            <Input
              value={departmentSearch ? departmentSearch : ''}
              onChange={e => {
                setDepartmentSearch(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item className="searchInput" label="성별">
            <Select
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
          <Form.Item className="searchInput" label="이름">
            <Input
              value={lcMemberNameSearch}
              onChange={e => {
                setLcMemberNameSearch(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LcMemberTableSearchComponent;
