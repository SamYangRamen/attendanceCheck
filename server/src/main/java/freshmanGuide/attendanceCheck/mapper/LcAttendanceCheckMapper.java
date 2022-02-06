package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface LcAttendanceCheckMapper {

    void save(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto);

    LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO findFirstByOrderByLcMemberIdDesc(Integer lcMemberId);

    void deleteByLcMemberId(Integer lcMemberId);

    List<LcAttendanceCheckDTO.LcAttendanceCheckTableInfoDTO> findDepartmentAndGenderAndLcMemberNameAndStateAndNoteByYearAndLcAndEventIdx(HashMap dataList);

    void deleteByLcMemberIdAndEventIdx(HashMap dataList);

    void updateByLcMemberIdAndEventIdx(LcAttendanceCheckDTO.PutLcAttendanceCheckInfoDTO dto);
}