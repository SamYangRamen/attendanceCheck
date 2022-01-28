package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.springframework.web.bind.annotation.RequestBody;

public interface AccountService {

    Boolean postAccountInfoService(BasicDTO.AccountInfoDTO dto);

    BasicDTO.AccountInfoDTO getAccountInfoService(String account);

    Boolean getIsLoginInfoCorrectService(BasicDTO.LoginInfoDTO dto);

    Boolean putAccountInfoService(BasicDTO.PutAccountInfoDTO dto);
}
