import { autorun, keys, values } from 'mobx';
import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { errorMonitor } from 'stream';
import TableCellContainer from '../../container/TableCellContainer';
import TableContainer, { ColumnInfo } from '../../container/TableContainer';
import { FgMemberInfo } from '../../repository/AccountRepository';
import { FgMemberInfoMap, FgMemberTableInfo } from '../../repository/FgMemberRepository';
import useStore from '../../store/useStore';

interface Props {
  generation: number;
  children: JSX.Element;
}

const FgMemberTableComponent: React.FC<Props> = ({ generation, children }: Props) => {
  const { repositoryStore, valueStore } = useStore();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();
  const [fgMemberTableInfo, setFgMemberTableInfo] = useState<Array<FgMemberTableInfo>>([]);
  const [tableContents, setTableContents] = useState<JSX.Element[]>([]);
  const [clickedTableCellIndex, setClickedTableCellIdx] = useState<{ row: number; col: string }>({
    row: -1,
    col: '',
  });
  const [tableCellInput, setTableCellInput] = useState<string>('');

  const updateTable = (value: string, row: number, col: string) => {
    const fgMemberId = fgMemberTableInfo[row].fgMemberId;

    fgMemberRepo
      .putFgMemberInfo({
        fgMemberId,
        columnName: col,
        value,
      })
      .then(response => {
        if (response) {
          setFgMemberTableInfo(
            col == 'generation'
              ? fgMemberTableInfo.filter(item => item.fgMemberId !== fgMemberId)
              : col == 'isAdmin'
              ? fgMemberTableInfo.map(item =>
                  item.fgMemberId === fgMemberId ? { ...item, [col]: !item.isAdmin } : item
                )
              : fgMemberTableInfo.map(item =>
                  item.fgMemberId === fgMemberId ? { ...item, [col]: value } : item
                )
          );
        } else {
          alert('수정할 수 없는 데이터입니다.');
        }
      });

    setClickedTableCellIdx({ row: -1, col: '' });
    setTableCellInput('');
  };

  const onDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTableCellInput(e.currentTarget.innerHTML == '-' ? '' : e.currentTarget.innerHTML);

    const [row, col] = e.currentTarget.id.split(',');
    setClickedTableCellIdx({ row: parseInt(row), col: col });
  };

  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const [row, col] = e.currentTarget.id.split(',');
    //setClickedTableCellIdx({ row: parseInt(row), col: col });
    // updateTable(e.currentTarget.checked ? '1' : '0');
    updateTable(e.currentTarget.checked ? '1' : '0', parseInt(row), col);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableCellInput(e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTableCellInput(e.target.value);
    updateTable(e.target.value, clickedTableCellIndex.row, clickedTableCellIndex.col);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      updateTable(e.currentTarget.value, clickedTableCellIndex.row, clickedTableCellIndex.col);
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTableCellInput('');
    setClickedTableCellIdx({ row: -1, col: '' });
  };

  const makeTwoDimArray = (data: Array<any>): Array<Array<any>> => {
    return Array.from({ length: data.length }, (_, i) => Object.values(data[i]));
  };

  useEffect(() => {
    fgMemberRepo.getFgMemberTableInfoListByGeneration(generation).then(response => {
      setFgMemberTableInfo(response);
    });
  }, [generation]);

  /*
  useEffect(() => {
    const data: Array<any> = Array.from({ length: fgMemberInfo.length }, (_, i) => (
      <tbody>
        {Object.values(fgMemberInfo[i]).map((value, j) => (
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: j }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={value}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
        ))}
      </tbody>
    ));

    setTableContents(data);
  }, [fgMemberInfo, clickedTableCellIndex, tableCellInput]);
  /*
      Array.from({ length: fgMemberInfo.length }, (_, i) => (
        <tbody>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 0 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].fgMemberId}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 1 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].generation}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 2 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].fgMemberName}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 3 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].position}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 4 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].state}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 5 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].contact}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
          <td>
            <TableCellContainer
              cellIndex={{ row: i, col: 6 }}
              clickedTableCellIndex={clickedTableCellIndex}
              tableCellInput={tableCellInput}
              value={fgMemberInfo[i].mail}
              onClick={onClick}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </td>
        </tbody>
      ))
      */

  // valueStore.setFgMemberInfoList(response);

  /*
        tableContents = [];
        for (let i = 0; i < response.length; i++) {
          tableContents.push(
            <tbody>
              <td>{response[i].fgMemberId}</td>
              <td>{response[i].generation}</td>
              <td>{response[i].fgMemberName}</td>
              <td>{response[i].position}</td>
              <td>{response[i].state}</td>
              <td>{response[i].contact}</td>
              <td>{response[i].mail}</td>
            </tbody>
          );
        }
        
  }, [generation, fgMemberInfo, clickedTableCellIndex, tableCellInput]);
  */

  let columnInfoList: Array<ColumnInfo> = [
    {
      tagName: 'input',
      type: 'text',
      name: 'fgMemberId',
    },
    {
      tagName: 'select',
      type: 'dropdown',
      name: 'generation',
      contents: Array.from({ length: new Date().getFullYear() - 2005 }, (_, i) =>
        i == 0 ? '' : i
      ),
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'fgMemberName',
    },
    {
      tagName: 'select',
      type: 'dropdown',
      name: 'position',
      contents: [' ', '회장', '부회장', '팀장', '부원'],
    },
    {
      tagName: 'select',
      type: 'dropdown',
      name: 'state',
      contents: [' ', '재학', '휴학', '유학', '졸업'],
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'contact',
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'mail',
    },
    {
      tagName: 'input',
      type: 'checkbox',
      name: 'isAdmin',
    },
    {
      tagName: 'input',
      type: 'checkbox',
      name: 'registerApproval',
    },
  ];
  return (
    <div>
      <div className="tableUtils">{children}</div>
      <div className="tableColumns">
        <table>
          <thead>
            <tr>
              <th className="fgMemberId">학번</th>
              <th className="generation">기수</th>
              <th className="fgMemberName">이름</th>
              <th className="position">직위</th>
              <th className="state">상태</th>
              <th className="contact">전화번호</th>
              <th className="mail">이메일</th>
              <th className="isAdmin">관리자</th>
              <th className="registerApproval">등록</th>
            </tr>
          </thead>
          <TableContainer
            tableData={fgMemberTableInfo}
            columnInfoList={columnInfoList}
            clickedTableCellIndex={clickedTableCellIndex}
            tableCellInput={tableCellInput}
            eventHandler={{
              onDivClick,
              onInputClick,
              onInputChange,
              onSelectChange,
              onKeyPress,
              onBlur,
            }}
          ></TableContainer>
        </table>
      </div>
    </div>
  );
};

export default React.memo(FgMemberTableComponent);
