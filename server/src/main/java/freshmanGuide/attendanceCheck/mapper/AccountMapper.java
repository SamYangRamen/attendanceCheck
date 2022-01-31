package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {

    void save(AccountDTO.AccountInfoDTO dto);

    AccountDTO.AccountInfoDTO findByFgMemberId(Integer fgMemberId);

    AccountDTO.AccountInfoDTO findByMail(String mail);

    String findPasswordByFgMemberId(Integer fgMemberId);

    String findPasswordByMail(String mail);

    AccountDTO.AccountCheckInfoDTO findAccountCheckInfoByFgMemberId(Integer fgMemberId);

    AccountDTO.AccountCheckInfoDTO findAccountCheckInfoByMail(String mail);

    void updateIsAdmin(Integer fgMemberId);

    void updateRegisterApproval(Integer fgMemberId);

    void deleteByFgMemberId(Integer fgMemberId);
}
