package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;

import java.util.List;

public interface FgMemberService {

    Boolean postFgMemberInfoService(BasicDTO.FgMemberInfoDTO dto);

    Boolean getIsFgMemberInfoCorrectService(BasicDTO.FgMemberInfoDTO dto);

    Boolean putFgMemberInfoService(BasicDTO.PutFgMemberInfoDTO dto);

    List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoListByGenerationService(Integer generation);

    List<BasicDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGenerationService(Integer generation);

    List<BasicDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearchService(BasicDTO.FgMemberSearchInfoDTO dto);

    List<BasicDTO.FgMemberTableInfoDTO> getFgMemberInfoListBySearchService(BasicDTO.FgMemberInfoDTO dto);

    Boolean deleteFgMemberInfoByFgMemberIdListService(List<Integer> fgMemberIdList);
}
