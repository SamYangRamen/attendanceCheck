package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface LcMapper {

    void save(LcDTO.LcFKDTO dto);

    List<LcDTO.LcInfoDTO> findAll();

    List<String> findLcByYear(Integer year);

    void deleteByYearAndLc(LcDTO.LcFKDTO dto);

    List<LcDTO.LcInfoDTO> findAllByYear(Integer year);

    List<LcDTO.LcInfoWithFgMemberNameDTO> findByYearAndLcAndFgMemberNames(LcDTO.LcSearchInfoDTO dto);

    void updateFgMemberNameByFgMemberId(LcDTO.PutLcInfoDTO dto);

    void deleteByLcIdx(Integer lcIdx);

    List<LcDTO.LcFKTableDTO> findLcFKInfoByFgMemberIdAndYear(HashMap dataList);
}

