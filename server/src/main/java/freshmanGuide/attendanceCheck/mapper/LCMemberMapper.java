package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LCMemberMapper {

    // @Insert("INSERT INTO lc_member VALUES (#{lcMemberId}, #{lcMemberName}, #{year}, #{lc}, #{isPearLeader}, #{contact})")
    void save(BasicDTO.LCMemberInfoDTO dto);

    // @Select("SELECT * FROM lc_member WHERE lcMemberId=#{lcMemberId}")
    BasicDTO.LCMemberInfoDTO findByLcMemberId(Integer lcMemberId);

    // @Delete("DELETE FROM lc_member WHERE lcMemberId=#{lcMemberId}")
    void deleteByLcMemberId(Integer lcMemberId);
}