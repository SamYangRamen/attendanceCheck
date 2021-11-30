package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.Date;

@Mapper
public interface LCAttendanceCheckMapper {

    @Insert("INSERT INTO lc_attendance_check VALUES (#{lcMemberId}, #{date}, #{state})")
    void save(
            @Param("lcMemberId") Integer lcMemberId,
            @Param("date") Date date,
            @Param("state") String state
    );

    @Select("SELECT * FROM lc_attendance_check WHERE lcMemberId=#{lcMemberId} ORDER BY date DESC LIMIT 1")
    BasicDTO.LCAttendanceCheckInfoDTO findFirstByOrderByLcMemberIdDesc(@Param("lcMemberId") Integer lcMemberId);

    @Delete("DELETE FROM lc_attendance_check WHERE lcMemberId=#{lcMemberId}")
    void deleteByLcMemberId(@Param("lcMemberId") Integer lcMemberId);
}