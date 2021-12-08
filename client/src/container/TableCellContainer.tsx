import DropdownContainer from './DropdownContainer';
import { ColumnInfo } from './TableContainer';

interface Props {
  columnInfo: ColumnInfo;
  cellIndex: { row: number; col: string };
  clickedTableCellIndex: { row: number; col: string };
  tableCellInput: string;
  value: number | string;
  eventHandler: {
    onDivClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onInputClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };
}

const TableCellContainer: React.FC<Props> = ({
  columnInfo,
  cellIndex,
  clickedTableCellIndex,
  tableCellInput,
  value,
  eventHandler: { onDivClick, onInputClick, onInputChange, onSelectChange, onKeyPress },
}: Props): JSX.Element => {
  return (
    <td>
      <div>
        {columnInfo.type == 'checkbox' ? (
          <input
            id={`${cellIndex.row},${cellIndex.col}`}
            type="checkbox"
            value={value ? 1 : 0}
            name={columnInfo.name}
            onClick={onInputClick}
            checked={value == 1 ? true : false}
          />
        ) : clickedTableCellIndex.row == cellIndex.row &&
          clickedTableCellIndex.col == cellIndex.col ? (
          columnInfo.tagName == 'input' && columnInfo.type == 'text' ? (
            <input
              type="text"
              value={tableCellInput}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              autoFocus
            />
          ) : columnInfo.tagName == 'select' ? (
            <DropdownContainer
              name={columnInfo.name}
              value={tableCellInput}
              contents={columnInfo.contents}
              onChange={onSelectChange}
            />
          ) : (
            <></>
          )
        ) : (
          <div id={`${cellIndex.row},${cellIndex.col}`} onClick={onDivClick}>
            {value}
          </div>
        )}
      </div>
    </td>
  );
};

export default TableCellContainer;
