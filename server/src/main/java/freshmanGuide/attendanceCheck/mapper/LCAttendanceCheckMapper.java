package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.Date;

@Mapper
public interface LCAttendanceCheckMapper {

    // @Insert("INSERT INTO lc_attendance_check VALUES (#{lcMemberId}, #{date}, #{state})")
    void save(BasicDTO.LCAttendanceCheckInfoDTO dto);

    // @Select("SELECT * FROM lc_attendance_check WHERE lcMemberId=#{lcMemberId} ORDER BY date DESC LIMIT 1")
    BasicDTO.LCAttendanceCheckInfoDTO findFirstByOrderByLcMemberIdDesc(Integer lcMemberId);

    // @Delete("DELETE FROM lc_attendance_check WHERE lcMemberId=#{lcMemberId}")
    void deleteByLcMemberId(Integer lcMemberId);
}