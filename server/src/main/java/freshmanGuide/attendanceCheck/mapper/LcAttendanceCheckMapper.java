package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LcAttendanceCheckMapper {

    void save(BasicDTO.LcAttendanceCheckInfoDTO dto);

    BasicDTO.LcAttendanceCheckInfoDTO findFirstByOrderByLcMemberIdDesc(Integer lcMemberId);

    void deleteByLcMemberId(Integer lcMemberId);
}