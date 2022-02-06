package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import freshmanGuide.attendanceCheck.repository.LcAttendanceCheckRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Slf4j
@Service
public class LcAttendanceCheckServiceImpl implements LcAttendanceCheckService {

    LcAttendanceCheckRepository lcAttendanceCheckRepository;

    @Autowired
    public LcAttendanceCheckServiceImpl(LcAttendanceCheckRepository lcAttendanceCheckRepository) {
        this.lcAttendanceCheckRepository = lcAttendanceCheckRepository;
    }

    private static final String DATE_FORMAT = "yyyy-MM-DD";

    @Override
    public Date getTimeStamp() {
        final SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        final String utcTime = sdf.format(new Date());

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
            return (Date)dateFormat.parse(utcTime);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<LcAttendanceCheckDTO.LcAttendanceCheckTableInfoDTO> getLcAttendanceCheckTableInfoBySearchService(Integer year, String lc, Integer eventIdx) {
        return lcAttendanceCheckRepository.getLcAttendanceCheckTableInfoBySearch(year, lc, eventIdx);
    }

    @Override
    public Boolean deleteLcAttendanceCheckInfoService(Integer lcMemberId, Integer eventIdx) {
        try {
            lcAttendanceCheckRepository.deleteLcAttendanceCheckInfo(lcMemberId, eventIdx);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    @Override
    public Boolean postLcAttendanceCheckInfoService(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto) {
        try {
            lcAttendanceCheckRepository.postLcAttendanceCheckTableInfo(dto);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    @Override
    public Boolean putLcAttendanceCheckInfoService(LcAttendanceCheckDTO.PutLcAttendanceCheckInfoDTO dto) {
        try {
            lcAttendanceCheckRepository.putLcAttendanceCheckTableInfo(dto);
            return true;
        } catch(Exception e) {
            try {
                if(dto.getColumnName() == "state") {
                    lcAttendanceCheckRepository.postLcAttendanceCheckTableInfo(new LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO(dto.getLcMemberId(), dto.getEventIdx(), Integer.parseInt(dto.getValue()), null));
                } else if(dto.getColumnName() == "note") {
                    lcAttendanceCheckRepository.postLcAttendanceCheckTableInfo(new LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO(dto.getLcMemberId(), dto.getEventIdx(), null, dto.getValue()));
                } else {
                    return false;
                }
                return true;
            } catch(Exception e2) {
                return false;
            }
        }
    }
}
