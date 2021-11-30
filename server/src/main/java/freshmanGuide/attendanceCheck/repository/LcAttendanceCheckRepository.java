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
        final String DATE_FORMAT = "yyyy-MM-DD HH:mm:ss.sss";

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

    public void postLcAttendanceCheckInfoByTime(Integer lcMemberId, Date checkTime) {
        Date currentTime = getCurrentTime();


        if(currentTime == null) {
            return;
        }
        else if(checkTime.compareTo(currentTime) >= 0) {
            // 현재 시간이 지정된 출석체크 시간보다 더 과거일 경우
            lcAttendanceCheckMapper.save(new BasicDTO.LcAttendanceCheckInfoDTO(lcMemberId, currentTime, "출석"));
        }
        else {
            lcAttendanceCheckMapper.save(new BasicDTO.LcAttendanceCheckInfoDTO(lcMemberId, currentTime, "지각"));
        }
    }

    public void postLcAttendanceCheckInfo(Integer lcMemberId) {
        lcAttendanceCheckMapper.save(new BasicDTO.LcAttendanceCheckInfoDTO(lcMemberId, getCurrentTime(), "출석"));
    }

    public BasicDTO.LcAttendanceCheckInfoDTO getMostRecentAttendanceCheckInfo(Integer lcMemberId) {
        return lcAttendanceCheckMapper.findFirstByOrderByLcMemberIdDesc(lcMemberId);
    }

    public void deleteAttendanceCheckInfo(Integer lcMemberId) {
        lcAttendanceCheckMapper.deleteByLcMemberId(lcMemberId);
    }
}
