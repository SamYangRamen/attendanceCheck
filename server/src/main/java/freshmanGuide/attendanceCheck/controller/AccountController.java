package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
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

    @PostMapping("account-info")
    @ResponseBody
    public Boolean postAccountInfo(@RequestBody AccountDTO.AccountInfoDTO dto) {
        return accountService.postAccountInfoService(dto);
    }

    @GetMapping("account-info")
    @ResponseBody
    public AccountDTO.AccountInfoDTO getAccountInfo(@RequestParam("account") String account) {
        return accountService.getAccountInfoService(account);
    }

    @PutMapping("account-info")
    @ResponseBody
    public Boolean putAccountInfo(@RequestBody AccountDTO.PutAccountInfoDTO dto) {
        return accountService.putAccountInfoService(dto);
    }
}
