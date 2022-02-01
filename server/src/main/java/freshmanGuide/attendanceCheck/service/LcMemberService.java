package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;

import java.util.List;

public interface LcMemberService {
    Boolean postLcMemberInfoService(LcMemberDTO.LcMemberInfoDTO dto);

    List<LcMemberDTO.LcMemberTableInfoDTO> getLcMemberTableInfoListBySearchService(LcMemberDTO.LcMemberTableInfoDTO dto);

    Boolean deleteLcMemberInfoByLcMemberIdListService(List<Integer> lcMemberIdList);
}
