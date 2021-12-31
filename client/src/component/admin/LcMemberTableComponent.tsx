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
            <td>학번</td>
            <td>기수</td>
            <td>이름</td>
            <td>직위</td>
            <td>상태</td>
            <td>전화번호</td>
            <td>이메일</td>
            <td>관리자</td>
            <td>등록</td>
          </tr>
        </thead>
      </table>
      ;
    </div>
  );
};

export default LcMemberTableComponent;
