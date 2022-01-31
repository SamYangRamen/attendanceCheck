package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import freshmanGuide.attendanceCheck.mapper.AccountMapper;
import freshmanGuide.attendanceCheck.mapper.FgMemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class FgMemberRepository {

    FgMemberMapper fgMemberMapper;
    AccountMapper accountMapper;

    @Autowired
    public FgMemberRepository(FgMemberMapper fgMemberMapper, AccountMapper accountMapper) {
        this.fgMemberMapper = fgMemberMapper;
        this.accountMapper = accountMapper;
    }

    public void postFgMemberInfo(FgMemberDTO.FgMemberInfoDTO dto) {
        fgMemberMapper.save(dto);
    }

    public FgMemberDTO.FgMemberInfoDTO getFgMemberInfo(Integer fgMemberId) {
        return fgMemberMapper.findByFgMemberId(fgMemberId);
    }

    public void deleteFgMemberInfo(Integer fgMemberId) {
        fgMemberMapper.deleteByFgMemberId(fgMemberId);
    }

    public Boolean putFgMemberInfo(FgMemberDTO.PutFgMemberInfoDTO dto) {
        try {
            if (dto.getColumnName().equals("isAdmin")) {
                accountMapper.updateIsAdmin(dto.getFgMemberId());
            } else if (dto.getColumnName().equals("registerApproval")) {
                accountMapper.updateRegisterApproval(dto.getFgMemberId());
            } else {
                fgMemberMapper.updateByFgMemberId(dto);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<FgMemberDTO.FgMemberInfoDTO> getFgMemberInfoList() {
        return fgMemberMapper.findAll();
    }

    public List<FgMemberDTO.FgMemberInfoDTO> getFgMemberInfoListByGeneration(Integer generation) {
        return fgMemberMapper.findByGeneration(generation);
    }

    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGeneration(Integer generation) {
        return fgMemberMapper.findFgMemberInfoTableByGeneration(generation);
    }

    public List<FgMemberDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearch(FgMemberDTO.FgMemberSearchInfoDTO dto) {
        return fgMemberMapper.findByGenerationAndPositionAndFgMemberName(dto);
    }

    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberInfoListBySearch(FgMemberDTO.FgMemberInfoDTO dto) {
        return fgMemberMapper.findByFgMemberIdAndGenerationAndFgMemberNameAndPositionAndState(dto);
    }

    public void deleteFgMemberInfoByFgMemberId(Integer fgMemberId) {
        fgMemberMapper.deleteByFgMemberId(fgMemberId);
    }
}
