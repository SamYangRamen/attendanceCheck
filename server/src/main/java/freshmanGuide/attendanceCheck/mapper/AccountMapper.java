package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {

    void save(BasicDTO.AccountInfoDTO dto);

    String findPassword(Integer fgMemberId);

    BasicDTO.AccountAdminInfoDTO findPasswordAndIsAdmin(Integer fgMemberId);

    void updateIsAdmin(Integer fgMemberId);

    void deleteByFgMemberId(Integer fgMemberId);
}
