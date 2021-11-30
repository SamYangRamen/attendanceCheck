package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LCMemberMapper {

    @Insert("INSERT INTO lc_member VALUES (#{lcMemberId}, #{lcMemberName}, #{year}, #{lc}, #{isPearLeader}, #{contact})")
    void save(
            @Param("lcMemberId") Integer lcMemberId,
            @Param("lcMemberName") String lcMemberName,
            @Param("year") Integer year,
            @Param("lc") String lc,
            @Param("isPearLeader") String isPearLeader,
            @Param("contact") String contact
    );

    @Select("SELECT * FROM lc_member WHERE lcMemberId=#{lcMemberId}")
    BasicDTO.LCMemberInfoDTO findByLcMemberId(@Param("lcMemberId") Integer lcMemberId);

    @Delete("DELETE FROM lc_member WHERE lcMemberId=#{lcMemberId}")
    void deleteByLcMemberId(@Param("lcMemberId") Integer lcMemberId);
}