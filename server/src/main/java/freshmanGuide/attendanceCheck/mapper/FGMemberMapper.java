package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface FGMemberMapper {

    //@Insert("INSERT INTO fg_member VALUES (#{fgMemberId}, #{generation}, #{fgMemberName}, #{position}, #{state}, #{contact})")
    void save(BasicDTO.FGMemberInfoDTO dto);

    //@Select("SELECT * FROM fg_member WHERE fgMemberId=#{fgMemberId}")
    BasicDTO.FGMemberInfoDTO findByFgMemberId(Integer fgMemberId);

    //@Delete("DELETE FROM fg_member WHERE fgMemberId=#{fgMemberId}")
    void deleteByFgMemberId(Integer fgMemberId);
}
