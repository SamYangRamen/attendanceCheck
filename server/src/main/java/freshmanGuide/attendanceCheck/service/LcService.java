package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface LcService {

    Boolean postLcRangeService(LcDTO.PostLcRangeDTO dto);

    List<LcDTO.LcInfoWithFgMemberNameDTO> getLcInfoListWithFgMemberNameBySearchService(Integer year, String lc, String fgMemberName1, String fgMemberName2);

    Boolean putLcInfoService(LcDTO.PutLcInfoDTO dto);

    Boolean deleteLcInfoByLcIdxListService(List<Integer> lcIdxList);

    List<LcDTO.LcFKTableDTO> getLcFKTableInfoListByFgMemberIdAndYearService(Integer fgMemberId, Integer year);
}
