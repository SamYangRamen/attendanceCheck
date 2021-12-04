package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;

public interface FgMemberService {

    public Boolean postFgMemberInfoService(BasicDTO.FgMemberInfoDTO dto);

    public Boolean getIsFgMemberInfoCorrectService(BasicDTO.FgMemberInfoDTO dto);
}
