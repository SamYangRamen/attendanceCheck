package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;

import java.util.List;

public interface LcService {

    Boolean postLcRangeService(BasicDTO.PostLcRangeDTO dto);

    List<BasicDTO.LcInfoDTO> getLcListInfoByYearService(Integer year);

    List<String> getLcListByYearService(Integer year);
}
