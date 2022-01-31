package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.springframework.web.bind.annotation.RequestBody;

public interface AccountService {

    Boolean postAccountInfoService(AccountDTO.AccountInfoDTO dto);

    AccountDTO.AccountInfoDTO getAccountInfoService(String account);

    Boolean getIsLoginInfoCorrectService(AccountDTO.LoginInfoDTO dto);

    Boolean putAccountInfoService(AccountDTO.PutAccountInfoDTO dto);
}
