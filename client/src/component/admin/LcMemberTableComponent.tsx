interface Props {
  generation: number;
}

const LcMemberTableComponent: React.FC<Props> = props => {
  return (
    <div>
      {props.generation}
      <table>
        <thead>
          <tr>
            <th>학번</th>
            <th>기수</th>
            <th>이름</th>
            <th>직위</th>
            <th>상태</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>관리자</th>
            <th>등록</th>
          </tr>
        </thead>
      </table>
      ;
    </div>
  );
};

export default LcMemberTableComponent;
