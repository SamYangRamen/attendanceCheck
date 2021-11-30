package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LCListMapper {

    @Insert("INSERT INTO lc_list VALUES (#{year}, #{lc}, #{fgMemberId1}, #{fgMemberId2})")
    void save(
            @Param("year") Integer year,
            @Param("lc") String lc,
            @Param("fgMemberId1") Integer fgMemberId1,
            @Param("fgMemberId2") Integer fgMemberId2
    );

    @Select("SELECT * FROM lc_list WHERE year=#{year} AND lc=#{lc}")
    BasicDTO.LCInfoDTO findByYearAndLc(@Param("year") Integer year, @Param("lc") String lc);

    @Delete("DELETE FROM lc_list WHERE year=#{year} AND lc=#{lc}")
    void deleteByYearAndLc(@Param("year") Integer year, @Param("lc") String lc);
}

