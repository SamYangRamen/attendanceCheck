package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Boolean postAccountInfoService(AccountDTO.AccountInfoDTO dto) {
        try {
            accountRepository.postAccountInfo(dto);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    @Override
    public AccountDTO.AccountInfoDTO getAccountInfoService(String account) {
        try {
            Integer fgMemberId = Integer.parseInt(account);
            return accountRepository.getAccountInfoByFgMemberId(fgMemberId);
        } catch (Exception e) {

        }

        try {
            return accountRepository.getAccountInfoByMail(account);
        } catch (Exception e) {

        }

        return null;
    }

    @Override
    public Boolean putAccountInfoService(AccountDTO.PutAccountInfoDTO dto) {
        return accountRepository.putAccountInfo(dto);
    }
}
