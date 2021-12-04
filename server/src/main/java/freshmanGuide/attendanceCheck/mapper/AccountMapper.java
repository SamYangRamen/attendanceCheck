package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {

    void save(BasicDTO.AccountInfoDTO dto);

    BasicDTO.AccountInfoDTO findByFgMemberId(Integer fgMemberId);

    BasicDTO.AccountInfoDTO findByMail(String mail);

    String findPasswordByFgMemberId(Integer fgMemberId);

    String findPasswordByMail(String mail);

    BasicDTO.AccountCheckInfoDTO findAccountCheckInfoByFgMemberId(Integer fgMemberId);

    BasicDTO.AccountCheckInfoDTO findAccountCheckInfoByMail(String mail);

    void updateIsAdmin(Integer fgMemberId);

    void updateRegisterApproval(Integer fgMemberId);

    void deleteByFgMemberId(Integer fgMemberId);
}
