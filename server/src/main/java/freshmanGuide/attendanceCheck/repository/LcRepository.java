package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.mapper.LcMapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
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

    public List<String> getLcListByYear(Integer year) {
        return lcMapper.findLcByYear(year);
    }

    public void deleteLcInfo(LcDTO.LcFKDTO dto) {
        lcMapper.deleteByYearAndLc(dto);
    }

    public List<LcDTO.LcInfoWithFgMemberNameDTO> getLcListInfoBySearch(LcDTO.LcSearchInfoDTO dto) {
        return lcMapper.findByYearAndLcAndFgMemberNames(dto);
    }

    public void putFgMemberNameByFgMemberId(LcDTO.PutLcInfoDTO dto) {
        lcMapper.updateFgMemberNameByFgMemberId(dto);
    }

    public void deleteLcInfoByLcIdx(Integer lcIdx) {
        lcMapper.deleteByLcIdx(lcIdx);
    }

    public List<LcDTO.LcFKTableDTO> getLcFKTableInfoListByFgMemberIdAndYear(Integer fgMemberId, Integer year) {
        HashMap dataList = new HashMap();

        dataList.put("fgMemberId", fgMemberId);
        dataList.put("year", year);

        return lcMapper.findLcFKInfoByFgMemberIdAndYear(dataList);
    }
}
