import { useEffect, useState } from 'react';
import TableContainer, { ColumnInfo } from '../../container/TableContainer';
import { LcInfo } from '../../repository/LcRepository';
import useStore from '../../store/useStore';

interface Props {
  year: number;
}

const LcTableComponent: React.FC<Props> = ({ year }: Props) => {
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();
  const [lcTableInfo, setLcTableInfo] = useState<Array<LcInfo>>([]);
  const [clickedTableCellIndex, setClickedTableCellIdx] = useState<{ row: number; col: string }>({
    row: -1,
    col: '',
  });
  const [tableCellInput, setTableCellInput] = useState<string>('');

  const updateTable = (value: string, row: number, col: string) => {
    setClickedTableCellIdx({ row: -1, col: '' });
    setTableCellInput('');
  };

  const onDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTableCellInput(e.currentTarget.innerHTML);

    const [row, col] = e.currentTarget.id.split(',');
    setClickedTableCellIdx({ row: parseInt(row), col: col });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableCellInput(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      updateTable(e.currentTarget.value, clickedTableCellIndex.row, clickedTableCellIndex.col);
    }
  };

  useEffect(() => {
    lcRepo
      .getLcInfoListByYear(year)
      .then(response => {
        setLcTableInfo(response);
      })
      .catch(e => {
        alert('Error');
      });
  }, [year]);

  let columnInfoList: Array<ColumnInfo> = [
    {
      name: 'year',
    },
    {
      name: 'lc',
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'fgMemberName1',
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'fgMemberName2',
    },
  ];

  return (
    <div>
      {year}
      <table>
        <thead>
          <tr>
            <td>년도</td>
            <td>LC</td>
            <td>담당자1</td>
            <td>담당자2</td>
          </tr>
        </thead>
        <TableContainer
          tableData={lcTableInfo}
          columnInfoList={columnInfoList}
          clickedTableCellIndex={clickedTableCellIndex}
          tableCellInput={tableCellInput}
          eventHandler={{ onDivClick, onInputChange, onKeyPress }}
        ></TableContainer>
      </table>
      ;
    </div>
  );
};

export default LcTableComponent;
