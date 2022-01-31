package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AccountRepository {

    AccountMapper accountMapper;

    @Autowired
    public AccountRepository(AccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public void postAccountInfo(AccountDTO.AccountInfoDTO dto) {
        accountMapper.save(dto);
    }

    public AccountDTO.AccountInfoDTO getAccountInfoByFgMemberId(Integer fgMemberId) {
        return accountMapper.findByFgMemberId(fgMemberId);
    }

    public AccountDTO.AccountInfoDTO getAccountInfoByMail(String mail) {
        return accountMapper.findByMail(mail);
    }

    public String getPassword(Integer fgMemberId) {
        return accountMapper.findPasswordByFgMemberId(fgMemberId);
    }

    public AccountDTO.AccountCheckInfoDTO getPasswordAndIsAdminAndRegisterApprovalByFgMemberId(Integer fgMemberId) {
        return accountMapper.findAccountCheckInfoByFgMemberId(fgMemberId);
    }

    public AccountDTO.AccountCheckInfoDTO getPasswordAndIsAdminAndRegisterApprovalByMail(String mail) {
        return accountMapper.findAccountCheckInfoByMail(mail);
    }

    public void putIsAdmin(Integer fgMemberId) {
        accountMapper.updateIsAdmin(fgMemberId);
    }

    public void deleteAccountInfo(Integer fgMemberId) {
        accountMapper.deleteByFgMemberId(fgMemberId);
    }

    public Boolean putAccountInfo(AccountDTO.PutAccountInfoDTO dto) {
        try {
            if (dto.getColumnName().equals("isAdmin")) {
                accountMapper.updateIsAdmin(dto.getFgMemberId());
            } else if (dto.getColumnName().equals("registerApproval")) {
                accountMapper.updateRegisterApproval(dto.getFgMemberId());
            }
            else {
                return false;
            }
        } catch(Exception e) {
            return false;
        }

        return true;
    }
}
