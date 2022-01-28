package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface LcService {

    Boolean postLcRangeService(BasicDTO.PostLcRangeDTO dto);

    List<BasicDTO.LcInfoDTO> getLcListInfoByYearService(Integer year);

    List<String> getLcListByYearService(Integer year);

    List<BasicDTO.LcInfoWithFgMemberNameDTO> getLcListInfoBySearchService(Integer year, String lc, String fgMemberName1, String fgMemberName2);

    Boolean putLcInfoService(BasicDTO.PutLcInfoDTO dto);

    Boolean deleteLcInfoByLcIdxListService(List<Integer> lcIdxList);
}
