package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.FgMemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class FgMemberRepository {

    FgMemberMapper fgMemberMapper;

    @Autowired
    public FgMemberRepository(FgMemberMapper fgMemberMapper) {
        this.fgMemberMapper = fgMemberMapper;
    }

    public void postFgMemberInfo(BasicDTO.FgMemberInfoDTO dto) {
        fgMemberMapper.save(dto);
    }

    public BasicDTO.FgMemberInfoDTO getFgMemberInfo(Integer fgMemberId) {
        return fgMemberMapper.findByFgMemberId(fgMemberId);
    }

    public void deleteFgMemberInfo(Integer fgMemberId) {
        fgMemberMapper.deleteByFgMemberId(fgMemberId);
    }

    public List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoList() {
        return fgMemberMapper.findAll();
    }

    public List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoListByGeneration(Integer generation) {
        return fgMemberMapper.findByGeneration(generation);
    }
}
