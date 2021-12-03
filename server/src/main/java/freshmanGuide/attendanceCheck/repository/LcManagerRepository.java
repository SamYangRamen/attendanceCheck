package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.LcManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LcManagerRepository {

    LcManagerMapper lcManagerMapper;

    @Autowired
    public LcManagerRepository(LcManagerMapper lcManagerMapper) {
        this.lcManagerMapper = lcManagerMapper;
    }

    public void postLcManagerInfo(BasicDTO.LcManagerInfoDTO dto) {
        lcManagerMapper.save(dto);
    }

    public List<Integer> getFgMemberIdList(BasicDTO.LcInfoDTO dto) {
        return lcManagerMapper.findFgMemberIdListByYearAndLc(dto);
    }

    public void deleteLcManagerInfoByYearAndLc(BasicDTO.LcInfoDTO dto) {
        lcManagerMapper.deleteByYearAndLc(dto);
    }

    public void deleteLcManagerInfoByFgMemberId(Integer fgMemberId) {
        lcManagerMapper.deleteByFgMemberId(fgMemberId);
    }
}
