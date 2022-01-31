package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LcAttendanceCheckMapper {

    void save(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto);

    LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO findFirstByOrderByLcMemberIdDesc(Integer lcMemberId);

    void deleteByLcMemberId(Integer lcMemberId);
}