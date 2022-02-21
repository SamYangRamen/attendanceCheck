package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;
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

    public void postLcMemberInfo(LcMemberDTO.LcMemberInfoDTO dto) {
        lcMemberMapper.save(dto);
    }

    public LcMemberDTO.LcMemberInfoDTO getLcMemberInfo(Integer lcMemberId) {
        return lcMemberMapper.findByLcMemberId(lcMemberId);
    }

    public void deleteLcMemberInfoByLcMemberId(Integer lcMemberId) {
        lcMemberMapper.deleteByLcMemberId(lcMemberId);
    }

    public List<LcMemberDTO.LcMemberTableInfoDTO> getLcMemberTableInfoListBySearch(LcMemberDTO.LcMemberTableInfoDTO dto) {
        return lcMemberMapper.findByYearAndLcAndDepartmentAndGenderAndLcMemberName(dto);
    }

    public void putLcMemberInfo(LcMemberDTO.PutLcMemberInfoDTO dto) {
        lcMemberMapper.updateByLcMemberId(dto);
    }
}
