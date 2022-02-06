import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Table,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EventTableInfo } from '../../repository/EventReposptory';
import { LcFKTableInfo } from '../../repository/LcRepository';
import useStore from '../../store/useStore';
import contactAutoWriter from '../../util/contactAutoWriter';
import { columnType } from '../table/EditableTable';
import LcAttendanceCheckTableComponent from './LcAttendanceCheckTableComponent';

const { Option } = Select;

interface Props {
  eventInfo: EventTableInfo;
  lcFKTableInfo: LcFKTableInfo | undefined;
  isLcAttendanceManagementModalVisible: boolean | undefined;
  setIsLcAttendanceManagementModalVisible: (
    value: React.SetStateAction<boolean | undefined>
  ) => void;
}

const LcAttendanceManagementComponent: React.FC<Props> = ({
  eventInfo,
  lcFKTableInfo,
  isLcAttendanceManagementModalVisible,
  setIsLcAttendanceManagementModalVisible,
}: Props) => {
  const closeModal = () => {
    setIsLcAttendanceManagementModalVisible(false);
  };

  return (
    <Modal
      title="출결 확인"
      width={'100%'}
      visible={isLcAttendanceManagementModalVisible}
      onCancel={closeModal}
      footer={[
        <Button type="primary" onClick={closeModal}>
          닫기
        </Button>,
      ]}
    >
      <LcAttendanceCheckTableComponent
        eventInfo={eventInfo}
        lcFKTableInfo={lcFKTableInfo}
      ></LcAttendanceCheckTableComponent>
    </Modal>
  );
};

export default LcAttendanceManagementComponent;
