import EditableTable, { columnType, DataType } from 'component/table/EditableTable';
import { useEffect, useState } from 'react';
import { EventTableInfo } from 'repository/EventReposptory';
import { LcAttendanceCheckTableInfo } from 'repository/LcAttendanceCheckRepository';
import { LcFKTableInfo } from 'repository/LcRepository';
import useStore from 'store/useStore';

interface Props {
  eventInfo: EventTableInfo | undefined;
  lcFKTableInfo: LcFKTableInfo | undefined;
}

const columns: columnType[] = [
  {
    title: '계열',
    dataIndex: 'department',
    sorter: (a, b) => a.department.toString().localeCompare(b.department.toString()),
    width: '20%',
  },
  {
    title: '성별',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.toString().localeCompare(b.gender.toString()),
    width: '10%',
  },
  {
    title: '이름',
    dataIndex: 'lcMemberName',
    sorter: (a, b) => a.lcMemberName.toString().localeCompare(b.lcMemberName.toString()),
    width: '20%',
  },
  {
    title: '출석체크',
    tableIndex: 'lc_attendance_check_info',
    dataIndex: 'state',
    editable: 'attendanceCheckButton',
    width: '10%',
  },
  {
    title: '비고',
    tableIndex: 'lc_attendance_check_info',
    dataIndex: 'note',
    editable: 'input',
    width: '40%',
  },
];

const LcAttendanceCheckTableComponent: React.FC<Props> = ({ eventInfo, lcFKTableInfo }: Props) => {
  const { repositoryStore } = useStore();
  const lcAttendanceCheckRepo = repositoryStore.getLcAttendanceCheckRepository();
  const [lcAttendanceCheckTableInfo, setLcAttendanceCheckTableInfo] = useState<DataType[]>([]);

  useEffect(() => {
    if (!!eventInfo && !!lcFKTableInfo) {
      lcAttendanceCheckRepo
        .getLcAttendanceCheckTableInfoBySearch(
          lcFKTableInfo.year,
          lcFKTableInfo.lc,
          eventInfo.key as number
        )
        .then(response => {
          setLcAttendanceCheckTableInfo(response);
        });
    }
  }, [eventInfo, lcFKTableInfo]);

  return (
    <EditableTable
      columns={columns}
      dataSource={lcAttendanceCheckTableInfo}
      setDataSource={setLcAttendanceCheckTableInfo}
    ></EditableTable>
  );
};

export default LcAttendanceCheckTableComponent;
