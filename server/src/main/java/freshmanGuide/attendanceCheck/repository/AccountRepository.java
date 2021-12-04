package freshmanGuide.attendanceCheck.repository;

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

    public void postAccountInfo(BasicDTO.AccountInfoDTO dto) {
        accountMapper.save(dto);
    }

    public BasicDTO.AccountInfoDTO getAccountInfoByFgMemberId(Integer fgMemberId) {
        return accountMapper.findByFgMemberId(fgMemberId);
    }

    public BasicDTO.AccountInfoDTO getAccountInfoByMail(String mail) {
        return accountMapper.findByMail(mail);
    }

    public String getPassword(Integer fgMemberId) {
        return accountMapper.findPasswordByFgMemberId(fgMemberId);
    }

    public BasicDTO.AccountCheckInfoDTO getPasswordAndIsAdminAndRegisterApprovalByFgMemberId(Integer fgMemberId) {
        return accountMapper.findAccountCheckInfoByFgMemberId(fgMemberId);
    }

    public BasicDTO.AccountCheckInfoDTO getPasswordAndIsAdminAndRegisterApprovalByMail(String mail) {
        return accountMapper.findAccountCheckInfoByMail(mail);
    }

    public void putIsAdmin(Integer fgMemberId) {
        accountMapper.updateIsAdmin(fgMemberId);
    }

    public void deleteAccountInfo(Integer fgMemberId) {
        accountMapper.deleteByFgMemberId(fgMemberId);
    }
}
