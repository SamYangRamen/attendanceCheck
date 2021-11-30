package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface FGMemberMapper {

    @Insert("INSERT INTO fg_member VALUES (#{fgMemberId}, #{generation}, #{fgMemberName}, #{position}, #{state}, #{contact})")
    void save(
            @Param("fgMemberId") Integer fgMemberId,
            @Param("generation") Integer generation,
            @Param("fgMemberName") String fgMemberName,
            @Param("position") String position,
            @Param("state") String state,
            @Param("contact") String contact
    );

    @Select("SELECT * FROM fg_member WHERE fgMemberId=#{fgMemberId}")
    BasicDTO.FGMemberInfoDTO findByFgMemberId(@Param("fgMemberId") Integer fgMemberId);

    @Delete("DELETE FROM fg_member WHERE fgMemberId=#{fgMemberId}")
    void deleteByFgMemberId(@Param("fgMemberId") Integer fgMemberId);
}
