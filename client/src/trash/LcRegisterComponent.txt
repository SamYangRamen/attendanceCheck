import React, { useState, useEffect, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto, { randomBytes } from 'crypto';
import DropdownContainer from '../../container/DropdownContainer';

interface Props {
  setOnOff: (value: React.SetStateAction<boolean>) => void;
}

const LcRegisterComponent: React.FC<Props> = ({ setOnOff }: Props) => {
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

  const [year, setYear] = useState<number>(0);
  const [yearMessage, setYearMessage] = useState<string>('');
  const [lcDepartment, setLcDepartment] = useState<string>('');
  const [startLcNumber, setStartLcNumber] = useState<number>(1);
  const [endLcNumber, setEndLcNumber] = useState<number>(1);
  const [lcMessage, setLcMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const generationDropdownContents: JSX.Element[] = [];

  for (let i = 0; i < new Date().getFullYear() - 2006; i++) {
    generationDropdownContents.push(<option value={i + 1}>{i + 1}</option>);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'lcDepartment') setLcDepartment(e.target.value);
    else if (e.target.name == 'startLcNumber') {
      if (parseInt(e.target.value)) setStartLcNumber(parseInt(e.target.value));
      else if (e.target.value == '' || e.target.value == undefined) setStartLcNumber(0);
    } else if (e.target.name == 'endLcNumber') {
      if (parseInt(e.target.value)) setEndLcNumber(parseInt(e.target.value));
      else if (e.target.value == '' || e.target.value == undefined) setEndLcNumber(0);
    }
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name == 'year') setYear(parseInt(e.target.value));
  };

  const onClick = (e: any) => {
    lcRepo
      .postLcRange({
        year: year,
        lcDepartment: lcDepartment,
        startLcNumber: startLcNumber,
        endLcNumber: endLcNumber,
      })
      .then(response => {
        if (response == false) {
          alert('오류로 인해 입력에 실패했습니다.');
        }
      });
  };

  useEffect(() => {
    if (!year) {
      setYearMessage(' 년도를 선택해주세요.');
    } else {
      setYearMessage('');
    }
  }, [year]);

  useEffect(() => {
    if (!(startLcNumber >= 1 && startLcNumber <= endLcNumber)) {
      setLcMessage(' LC 범위를 바르게 입력해주세요.');
    } else {
      setLcMessage('');
    }
  }, [startLcNumber, endLcNumber]);

  useEffect(() => {
    if (yearMessage == '' && lcMessage == '') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [yearMessage, lcMessage]);

  return (
    <div>
      년　　도{' '}
      <DropdownContainer
        name="year"
        value={year}
        contents={Array.from({ length: new Date().getFullYear() - 1970 }, (_, i) =>
          i == 0 ? '' : i + 1971
        )}
        onChange={onSelectChange}
      />
      {yearMessage}
      <br />
      학부기호{' '}
      <input type="text" name="lcDepartment" value={lcDepartment} onChange={onInputChange} />
      <br />
      ＬＣ범위{' '}
      <input type="text" name="startLcNumber" value={startLcNumber} onChange={onInputChange} />
      ~
      <input type="text" name="endLcNumber" value={endLcNumber} onChange={onInputChange} />
      {lcMessage}
      <br />
      <input type="button" name="register" value="확인" onClick={onClick}></input>
      <input type="button" name="cancel" value="취소" onClick={() => setOnOff(false)}></input>
    </div>
  );
};

export default LcRegisterComponent;
