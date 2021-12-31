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

    public void postLc(BasicDTO.LcDTO dto) {
        lcMapper.save(dto);
    }

    public List<BasicDTO.LcInfoDTO> getLcInfoList() {
        return lcMapper.findAll();
    }

    public List<String> getLcListByYear(Integer year) {
        return lcMapper.findLcByYear(year);
    }

    public List<BasicDTO.LcInfoDTO> getLcInfoListByYear(Integer year) { return lcMapper.findAllByYear(year); }

    public void deleteLcInfo(BasicDTO.LcDTO dto) {
        lcMapper.deleteByYearAndLc(dto);
    }
}
