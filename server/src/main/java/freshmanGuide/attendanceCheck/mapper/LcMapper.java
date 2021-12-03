package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LcMapper {

    void save(BasicDTO.LcInfoDTO dto);

    List<BasicDTO.LcInfoDTO> findAll();

    List<String> findLcByYear(Integer year);

    void deleteByYearAndLc(BasicDTO.LcInfoDTO dto);
}

