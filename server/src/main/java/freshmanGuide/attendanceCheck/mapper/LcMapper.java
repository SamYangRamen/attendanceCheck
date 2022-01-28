package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LcMapper {

    void save(BasicDTO.LcDTO dto);

    List<BasicDTO.LcInfoDTO> findAll();

    List<String> findLcByYear(Integer year);

    void deleteByYearAndLc(BasicDTO.LcDTO dto);

    List<BasicDTO.LcInfoDTO> findAllByYear(Integer year);

    List <BasicDTO.LcInfoWithFgMemberNameDTO> findByYearAndLcAndFgMemberNames(BasicDTO.LcSearchInfoDTO dto);

    void updateFgMemberNameByFgMemberId(BasicDTO.PutLcInfoDTO dto);

    void deleteByLcIdx(Integer lcIdx);
}

