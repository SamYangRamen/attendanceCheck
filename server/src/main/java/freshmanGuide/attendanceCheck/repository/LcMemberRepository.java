package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.LcMemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LcMemberRepository {

    LcMemberMapper lcMemberMapper;

    @Autowired
    public LcMemberRepository(LcMemberMapper lcMemberMapper) {
        this.lcMemberMapper = lcMemberMapper;
    }

    public void postLcMemberInfo(BasicDTO.LcMemberInfoDTO dto) {
        lcMemberMapper.save(dto);
    }

    public BasicDTO.LcMemberInfoDTO getLcMemberInfo(Integer lcMemberId) {
        return lcMemberMapper.findByLcMemberId(lcMemberId);
    }

    public void deleteLcMemberInfo(Integer lcMemberId) {
        lcMemberMapper.deleteByLcMemberId(lcMemberId);
    }

    public List<BasicDTO.LcMemberInfoDTO> getLcMemberInfoList() {
        return lcMemberMapper.findAll();
    }

    public List<BasicDTO.LcMemberInfoDTO> getLcMemberInfoListByYearAndLc(Integer year, String lc) {
        return lcMemberMapper.findByYearAndLc(new BasicDTO.LcInfoPKDTO(year, lc));
    }
}
