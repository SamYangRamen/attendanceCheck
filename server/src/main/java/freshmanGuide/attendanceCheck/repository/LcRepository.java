package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.mapper.LcMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LcRepository {

    LcMapper lcMapper;

    public LcRepository(LcMapper lcMapper) {
        this.lcMapper = lcMapper;
    }

    public void postLc(LcDTO.LcFKDTO dto) {
        lcMapper.save(dto);
    }

    public List<LcDTO.LcInfoDTO> getLcInfoList() {
        return lcMapper.findAll();
    }

    public List<String> getLcListByYear(Integer year) {
        return lcMapper.findLcByYear(year);
    }

    public List<LcDTO.LcInfoDTO> getLcInfoListByYear(Integer year) { return lcMapper.findAllByYear(year); }

    public void deleteLcInfo(LcDTO.LcFKDTO dto) {
        lcMapper.deleteByYearAndLc(dto);
    }

    public List <LcDTO.LcInfoWithFgMemberNameDTO> getLcListInfoBySearch(LcDTO.LcSearchInfoDTO dto) {
        return lcMapper.findByYearAndLcAndFgMemberNames(dto);
    }

    public void updateFgMemberNameByFgMemberId(LcDTO.PutLcInfoDTO dto) {
        lcMapper.updateFgMemberNameByFgMemberId(dto);
    }

    public void deleteLcInfoByLcIdx(Integer lcIdx) {
        lcMapper.deleteByLcIdx(lcIdx);
    }
}
