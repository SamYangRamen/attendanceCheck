import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto, { randomBytes } from 'crypto';

const RegisterComponent: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const { repositoryStore } = useStore();
  const repo = repositoryStore.getConnectRepository();

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
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const generationDropdownContents: JSX.Element[] = [];

  for (let i = 0; i < new Date().getFullYear() - 2006; i++) {
    generationDropdownContents.push(<option value={i + 1}>{i + 1}</option>);
  }

  const positionDropdownContents: JSX.Element[] = [
    <option value=""> </option>,
    <option value="회장">회장</option>,
    <option value="부회장">부회장</option>,
    <option value="팀장">팀장</option>,
    <option value="부원">부원</option>,
  ];

  const stateDropdownContents: JSX.Element[] = [
    <option value=""> </option>,
    <option value="재학">재학</option>,
    <option value="휴학">휴학</option>,
    <option value="유학">유학</option>,
    <option value="졸업">졸업</option>,
  ];

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'fgMemberId') {
      if (parseInt(e.target.value)) setFgMemberId(parseInt(e.target.value));
      else if (e.target.value == '' || e.target.value == undefined) setFgMemberId(0);
    } else if (e.target.name == 'password') setPassword(e.target.value);
    else if (e.target.name == 'passwordValid') setPasswordValid(e.target.value);
    else if (e.target.name == 'fgMemberName') setFgMemberName(e.target.value);
    else if (e.target.name == 'state') setState(e.target.value);
    else if (e.target.name == 'contact') setContact(e.target.value);
    else if (e.target.name == 'mail') setMail(e.target.value);
  };

  const onDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == 'generation') setGeneration(parseInt(e.target.value));
    else if (e.target.name == 'position') setPosition(e.target.value);
    else if (e.target.name == 'state') setState(e.target.value);
  };

  const onClick = (e: any) => {
    if (e.target.name == 'register') {
      if (isCorrect) {
        const salt = crypto.randomBytes(64).toString('base64');
        const hashedPassword = crypto
          .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
          .toString('hex');

        repo
          .postFgMemberInfo({
            fgMemberId,
            generation,
            fgMemberName,
            position,
            state,
            contact,
            mail,
          })
          .then(response => {
            if (response == true) {
              repo
                .postAccountInfo({
                  fgMemberId,
                  password: hashedPassword,
                  salt: salt,
                  isAdmin: false,
                  registerApproval: false,
                })
                .then(response => {
                  if (response == true) {
                    alert(
                      '회원가입 신청이 완료되었습니다.\n관리자의 승인이 이루어지면 메일을 통해 알려드리겠습니다.'
                    );
                    history.push('/');
                  }
                })
                .catch(e => {
                  alert(e);
                });
            } else {
              alert('이미 가입되어 있는 학번입니다.');
            }
          })
          .catch(e => {
            alert(e);
          });
      } else alert('가입정보를 모두 입력해주세요.');
    } else if (e.target.name == 'cancel') history.goBack();
  };

  useEffect(() => {
    // 테스트용 useEffect이므로 완성 시 삭제 요망

    setFgMemberId(2013312848);
    setGeneration(15);
    setFgMemberName('김성보');
    setPosition('회장');
    setState('재학');
    setContact('010-1111-1111');
    setMail('abc@naver.com');

    setPassword('777777');
    setPasswordValid('777777');
    setIsCorrect(true);
  }, []);

  useEffect(() => {
    if (!fgMemberId || !fgMemberId.toString().match(/(19|20)[0-9]{2}31[0-9]{4}/g)) {
      setFgMemberIdMessage(' 학번을 올바르게 입력해주세요.');
    } else {
      setFgMemberIdMessage('');
    }
  }, [fgMemberId]);

  useEffect(() => {
    if (!password || password.length < 6) {
      setPasswordMessage(' 6자 이상의 비밀번호를 입력해주세요.');
    } else {
      setPasswordMessage('');
    }
  }, [password]);

  useEffect(() => {
    if (passwordMessage == '' && password != passwordValid) {
      setPasswordValidMessage(' 비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordValidMessage('');
    }
  }, [passwordMessage, passwordValid]);

  useEffect(() => {
    if (!generation) {
      setGenerationMessage(' 기수를 선택해주세요.');
    } else {
      setGenerationMessage('');
    }
  }, [generation]);

  useEffect(() => {
    if (fgMemberName?.length == 0) {
      setNameMessage(' 이름을 입력해주세요.');
    } else {
      setNameMessage('');
    }
  }, [fgMemberName]);

  useEffect(() => {
    if (!position) {
      setPositionMessage(' 직위를 선택해주세요.');
    } else {
      setPositionMessage('');
    }
  }, [position]);

  useEffect(() => {
    if (!state) {
      setStateMessage(' 상태를 선택해주세요.');
    } else {
      setStateMessage('');
    }
  }, [state]);

  useEffect(() => {
    if (!contact?.toString().match(/^\d{2,3}-\d{3,4}-\d{4}$/g)) {
      setContactMessage(' 전화번호를 올바르게 입력해주세요. (예:010-1111-1111)');
    } else {
      setContactMessage('');
    }
  }, [contact]);

  useEffect(() => {
    if (
      !(mail && mail.match(/^[0-9A-Za-z\-\.\_]*@[0-9A-Za-z\-\.\_]*[A-Za-z]{2,6}.[A-Za-z]{2,6}$/g))
    ) {
      setMailMessage(' 메일주소를 올바르게 입력해주세요.');
    } else {
      setMailMessage('');
    }
  }, [mail]);

  useEffect(() => {
    if (
      fgMemberIdMessage == '' &&
      passwordMessage == '' &&
      passwordValidMessage == '' &&
      generationMessage == '' &&
      nameMessage == '' &&
      positionMessage == '' &&
      stateMessage == '' &&
      contactMessage == '' &&
      mailMessage == ''
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [
    fgMemberIdMessage,
    passwordMessage,
    passwordValidMessage,
    generationMessage,
    nameMessage,
    positionMessage,
    stateMessage,
    contactMessage,
    mailMessage,
  ]);

  return (
    <div>
      학　　번{' '}
      <input
        type="text"
        name="fgMemberId"
        value={fgMemberId == 0 ? '' : fgMemberId}
        onChange={onInputChange}
      ></input>{' '}
      {fgMemberIdMessage}
      <br />
      비　　번{' '}
      <input type="password" name="password" value={password} onChange={onInputChange}></input>
      {passwordMessage}
      <br />
      비번확인{' '}
      <input
        type="password"
        name="passwordValid"
        value={passwordValid}
        onChange={onInputChange}
        disabled={passwordMessage ? true : false}
      ></input>{' '}
      {passwordValidMessage}
      <br />
      기　　수{' '}
      <select name="generation" value={generation} onChange={onDropdownChange}>
        <option value=""> </option>
        {generationDropdownContents}
        {}
      </select>
      {generationMessage}
      <br />
      이　　름{' '}
      <input type="text" name="fgMemberName" value={fgMemberName} onChange={onInputChange}></input>
      {nameMessage}
      <br />
      직　　위{' '}
      <select name="position" value={position} onChange={onDropdownChange}>
        {positionDropdownContents}
      </select>
      {positionMessage}
      <br />
      상　　태{' '}
      <select name="state" value={state} onChange={onDropdownChange}>
        {stateDropdownContents}
      </select>
      {stateMessage}
      <br />
      전화번호 <input type="text" name="contact" value={contact} onChange={onInputChange}></input>
      {contactMessage}
      <br />
      메일주소 <input type="text" name="mail" value={mail} onChange={onInputChange}></input>
      {mailMessage}
      <br />
      <input type="button" name="register" value="확인" onClick={onClick}></input>
      <Link to="/">
        <input type="button" name="cancel" value="취소" onClick={onClick}></input>
      </Link>
    </div>
  );
};

export default RegisterComponent;
