package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import freshmanGuide.attendanceCheck.mapper.LcAttendanceCheckMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;

@Slf4j
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

    public void postLcAttendanceCheckInfo(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto) {
        lcAttendanceCheckMapper.save(dto);
    }

    public LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO getMostRecentAttendanceCheckInfo(Integer lcMemberId) {
        return lcAttendanceCheckMapper.findFirstByOrderByLcMemberIdDesc(lcMemberId);
    }

    public void deleteAttendanceCheckInfo(Integer lcMemberId) {
        lcAttendanceCheckMapper.deleteByLcMemberId(lcMemberId);
    }

    public List<LcAttendanceCheckDTO.LcAttendanceCheckTableInfoDTO> getLcAttendanceCheckTableInfoBySearch(Integer year, String lc, Integer eventIdx) {
        HashMap dataList = new HashMap();

        dataList.put("year", year);
        dataList.put("lc", lc);
        dataList.put("eventIdx", eventIdx);

        return lcAttendanceCheckMapper.findDepartmentAndGenderAndLcMemberNameAndStateAndNoteByYearAndLcAndEventIdx(dataList);
    }

    public void deleteLcAttendanceCheckInfo(Integer lcMemberId, Integer eventIdx) {
        HashMap dataList = new HashMap();

        dataList.put("lcMemberId", lcMemberId);
        dataList.put("eventIdx", eventIdx);

        lcAttendanceCheckMapper.deleteByLcMemberIdAndEventIdx(dataList);
    }

    public void postLcAttendanceCheckTableInfo(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto) {
        lcAttendanceCheckMapper.save(dto);
    }

    public void putLcAttendanceCheckTableInfo(LcAttendanceCheckDTO.PutLcAttendanceCheckInfoDTO dto) {
        lcAttendanceCheckMapper.updateByLcMemberIdAndEventIdx(dto);
    }
}