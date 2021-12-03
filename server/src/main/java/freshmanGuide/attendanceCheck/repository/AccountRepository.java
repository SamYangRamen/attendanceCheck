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

    public String getPassword(Integer fgMemberId) {
        return accountMapper.findPassword(fgMemberId);
    }

    public BasicDTO.AccountAdminInfoDTO getPasswordAndIsAdmin(Integer fgMemberId) {
        return accountMapper.findPasswordAndIsAdmin(fgMemberId);
    }

    public void putIsAdmin(Integer fgMemberId) {
        accountMapper.updateIsAdmin(fgMemberId);
    }

    public void deleteAccountInfo(Integer fgMemberId) {
        accountMapper.deleteByFgMemberId(fgMemberId);
    }
}
