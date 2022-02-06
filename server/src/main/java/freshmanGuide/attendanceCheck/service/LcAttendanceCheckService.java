package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

public interface LcAttendanceCheckService {
    Date getTimeStamp();

    List<LcAttendanceCheckDTO.LcAttendanceCheckTableInfoDTO> getLcAttendanceCheckTableInfoBySearchService(Integer year, String lc, Integer eventIdx);

    Boolean deleteLcAttendanceCheckInfoService(Integer lcMemberId, Integer eventIdx);

    Boolean postLcAttendanceCheckInfoService(LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto);

    Boolean putLcAttendanceCheckInfoService(LcAttendanceCheckDTO.PutLcAttendanceCheckInfoDTO dto);
}
