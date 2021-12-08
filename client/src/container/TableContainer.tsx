import { JsxEmit } from 'typescript';
import { AccountInfo } from '../repository/AccountRepository';
import { FgMemberInfo, FgMemberTableInfo } from '../repository/FgMemberRepository';
import TableCellContainer from './TableCellContainer';

type TableInfo = FgMemberInfo | FgMemberTableInfo | AccountInfo;

export interface ColumnInfo {
  tagName: string;
  type?: string;
  name?: string;
  value?: string;
  contents?: Array<string | number>;
}

interface Props {
  tableData: Array<TableInfo>;
  columnInfoList: Array<ColumnInfo>;
  clickedTableCellIndex: { row: number; col: string };
  tableCellInput: string;
  eventHandler: {
    onDivClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onInputClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };
}

const TableContainer: React.FC<Props> = ({
  tableData,
  columnInfoList,
  clickedTableCellIndex,
  tableCellInput,
  eventHandler,
}: Props): JSX.Element => {
  // const keys = Object.entries(tableData[i]).map(value) {
  return (
    <>
      {Array.from({ length: tableData.length }, (_, i) => (
        <tbody>
          {Object.entries(tableData[i]).map((kv, j) => (
            <td>
              <TableCellContainer
                columnInfo={columnInfoList[j]}
                cellIndex={{ row: i, col: kv[0] }}
                clickedTableCellIndex={clickedTableCellIndex}
                tableCellInput={tableCellInput}
                value={kv[1] as string}
                eventHandler={eventHandler}
              />
            </td>
          ))}
        </tbody>
      ))}
    </>
  );
};

export default TableContainer;
