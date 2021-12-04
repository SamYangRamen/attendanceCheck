package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;

public interface AccountService {

    Boolean postAccountInfoService(BasicDTO.AccountInfoDTO dto);

    BasicDTO.AccountInfoDTO getAccountInfoService(String account);

    Boolean getIsLoginInfoCorrectService(BasicDTO.LoginInfoDTO dto);
}
