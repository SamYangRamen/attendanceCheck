import { Button, Input, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { LcMemberInfo } from 'repository/LcMemberRepository';
import useStore from 'store/useStore';

import * as xlsx from 'xlsx';

interface Props {
  children: JSX.Element;
  tableName: string;
}

const ImportExcelComponent: React.FC<Props> = ({ children, tableName }: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();

  const [file, setFile] = useState<any | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  const onFinish = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;

      const workBook = xlsx.read(data, { type: 'binary' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const csv = xlsx.utils.sheet_to_csv(workSheet);
      const csvStrList = csv.split('\n');

      if (tableName == 'lc_member_info') {
        csvStrList.forEach(value => {
          const dataArray = value.split(',');

          const lcMemberInfo: LcMemberInfo = {
            year: new Date().getFullYear(),
            lc: dataArray[1],
            department: dataArray[2],
            gender: dataArray[3],
            lcMemberName: dataArray[4],
            contact: dataArray[5],
          };

          lcMemberRepo.postLcMemberInfo(lcMemberInfo);
        });
      }
    };

    reader.readAsBinaryString(file);
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
        title="엑셀로 추가"
        width={'400px'}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button form="uploadLcMemberInfoList" type="primary" htmlType="submit" disabled={!file}>
            업로드
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form id="uploadLcMemberInfoList" form={form} onFinish={onFinish}>
          <Form.Item rules={[{ required: true }]}>
            <Input type="file" onChange={onChange} accept=".xlsx,.csv,.xls"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ImportExcelComponent;
