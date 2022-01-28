import { Modal } from 'antd';
import { useState } from 'react';

interface Props {
  children: JSX.Element;
}
const FgMemberAddComponent: React.FC<Props> = ({ children }: Props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [fgMemberId, setFgMemberId] = useState<number>(0);
  const [fgMemberIdMessage, setFgMemberIdMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<string>('');
  const [passwordValidMessage, setPasswordValidMessage] = useState<string>('');
  const [generation, setGeneration] = useState<number>(0);
  const [generationMessage, setGenerationMessage] = useState<string>('');
  const [fgMemberName, setFgMemberName] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [positionMessage, setPositionMessage] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [stateMessage, setStateMessage] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [mailMessage, setMailMessage] = useState<string>('');

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
        width={'800px'}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      ></Modal>
    </div>
  );
};

export default FgMemberAddComponent;
