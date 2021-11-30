package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LCListMapper {

    // @Insert("INSERT INTO lc_list VALUES (#{year}, #{lc}, #{fgMemberId1}, #{fgMemberId2})")
    void save(BasicDTO.LCInfoDTO dto);

    // @Select("SELECT * FROM lc_list WHERE year=#{year} AND lc=#{lc}")
    BasicDTO.LCInfoDTO findByYearAndLc(BasicDTO.LCInfoPKDTO dto);

    // @Delete("DELETE FROM lc_list WHERE year=#{year} AND lc=#{lc}")
    void deleteByYearAndLc(BasicDTO.LCInfoPKDTO dto);
}

