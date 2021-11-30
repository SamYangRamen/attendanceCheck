package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LcMapper {

    void save(BasicDTO.LcInfoDTO dto);

    BasicDTO.LcInfoDTO findByYearAndLc(BasicDTO.LcInfoPKDTO dto);

    void deleteByYearAndLc(BasicDTO.LcInfoPKDTO dto);

    List<String> findLcByYear(Integer year);

    List<BasicDTO.FgMemberInfoDTO> findFgMemberInfoList(BasicDTO.LcInfoPKDTO dto);
}

