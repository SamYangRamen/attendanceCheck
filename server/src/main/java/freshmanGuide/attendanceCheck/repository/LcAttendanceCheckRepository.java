package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.LcAttendanceCheckMapper;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Repository
public class LcAttendanceCheckRepository {

    LcAttendanceCheckMapper lcAttendanceCheckMapper;

    public LcAttendanceCheckRepository(LcAttendanceCheckMapper lcAttendanceCheckMapper) {
        this.lcAttendanceCheckMapper = lcAttendanceCheckMapper;
    }

    public Date getCurrentTime() {
        final String DATE_FORMAT = "yyyy-MM-DD";

        final SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        final String utcTime = sdf.format(new Date());

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
            return (Date)dateFormat.parse(utcTime);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void postLcAttendanceCheckInfo(BasicDTO.LcAttendanceCheckInfoDTO dto) {
        lcAttendanceCheckMapper.save(dto);
    }

    public BasicDTO.LcAttendanceCheckInfoDTO getMostRecentAttendanceCheckInfo(Integer lcMemberId) {
        return lcAttendanceCheckMapper.findFirstByOrderByLcMemberIdDesc(lcMemberId);
    }

    public void deleteAttendanceCheckInfo(Integer lcMemberId) {
        lcAttendanceCheckMapper.deleteByLcMemberId(lcMemberId);
    }
}
