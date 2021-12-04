package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("post/account-info")
    @ResponseBody
    public Boolean postAccountInfo(@RequestBody BasicDTO.AccountInfoDTO dto) {
        return accountService.postAccountInfoService(dto);
    }

    @GetMapping("get/account-info")
    @ResponseBody
    public BasicDTO.AccountInfoDTO getAccountInfo(@RequestParam("account") String account) {
        return accountService.getAccountInfoService(account);
    }

    @GetMapping("get/is-login-info-correct")
    @ResponseBody
    public Boolean getIsLoginInfoCorrect(BasicDTO.LoginInfoDTO dto) {
        return accountService.getIsLoginInfoCorrectService(dto);
    }
}
