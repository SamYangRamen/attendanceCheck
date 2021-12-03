package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.LcMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LcRepository {

    LcMapper lcMapper;

    public LcRepository(LcMapper lcMapper) {
        this.lcMapper = lcMapper;
    }

    public void postLcInfo(BasicDTO.LcInfoDTO dto) {
        lcMapper.save(dto);
    }

    public List<BasicDTO.LcInfoDTO> getLcInfoList() {
        return lcMapper.findAll();
    }

    public List<String> getLcListByYear(Integer year) {
        return lcMapper.findLcByYear(year);
    }

    public void deleteLcInfo(BasicDTO.LcInfoDTO dto) {
        lcMapper.deleteByYearAndLc(dto);
    }
}
