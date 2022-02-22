package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;

import java.util.List;

public interface FgMemberService {

    Boolean postFgMemberInfoService(FgMemberDTO.FgMemberInfoDTO dto);

    Boolean putFgMemberInfoService(FgMemberDTO.PutFgMemberInfoDTO dto);

    List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGenerationService(Integer generation);

    List<FgMemberDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearchService(FgMemberDTO.FgMemberSearchInfoDTO dto);

    List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListBySearchService(FgMemberDTO.FgMemberInfoDTO dto);

    Boolean deleteFgMemberInfoByFgMemberIdListService(List<Integer> fgMemberIdList);
}
