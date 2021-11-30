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

    public BasicDTO.LcInfoDTO getLcInfo(Integer year, String lc) {
        return lcMapper.findByYearAndLc(new BasicDTO.LcInfoPKDTO(year, lc));
    }

    public void deleteLcInfo(Integer year, String lc) {
        lcMapper.deleteByYearAndLc(new BasicDTO.LcInfoPKDTO(year, lc));
    }

    public List<String> getLcListByYear(Integer year) {
        return lcMapper.findLcByYear(year);
    }

    public List<BasicDTO.FgMemberInfoDTO> getChargingFgMemberInfoList(Integer year, String lc) {
        return lcMapper.findFgMemberInfoList(new BasicDTO.LcInfoPKDTO(year, lc));
    }
}
