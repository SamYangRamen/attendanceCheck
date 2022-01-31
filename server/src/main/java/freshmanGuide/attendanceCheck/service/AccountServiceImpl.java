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
    public Boolean getIsLoginInfoCorrectService(AccountDTO.LoginInfoDTO dto) {
        if(Pattern.matches(dto.getAccount(), "^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+.[a-zA-Z]{2,6}$")) {
            AccountDTO.AccountCheckInfoDTO data = accountRepository.getPasswordAndIsAdminAndRegisterApprovalByMail(dto.getAccount());

            if(data == null)
                return false;

            if(dto.getIsAdmin() && !data.getIsAdmin()) { // 관리자 로그인을 시도했는데 관리자 계정이 아니라면
                return false;
            }
            
            if(data.getPassword() == dto.getPassword())
                return true;
        }

        if(Pattern.matches(dto.getAccount(), "^[0-9]{10}$")) {
            AccountDTO.AccountCheckInfoDTO data = accountRepository.getPasswordAndIsAdminAndRegisterApprovalByFgMemberId(Integer.parseInt(dto.getAccount()));

            if(data == null)
                return false;

            if(dto.getIsAdmin() && !data.getIsAdmin()) { // 관리자 로그인을 시도했는데 관리자 계정이 아니라면
                return false;
            }

            if(data.getPassword() == dto.getPassword())
                return true;
        }

        return false;
    }

    @Override
    public Boolean putAccountInfoService(AccountDTO.PutAccountInfoDTO dto) {
        return accountRepository.putAccountInfo(dto);
    }
}
