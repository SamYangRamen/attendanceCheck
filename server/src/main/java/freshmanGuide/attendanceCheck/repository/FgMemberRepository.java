package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
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

    public void postFgMemberInfo(BasicDTO.FgMemberInfoDTO dto) {
        fgMemberMapper.save(dto);
    }

    public BasicDTO.FgMemberInfoDTO getFgMemberInfo(Integer fgMemberId) {
        return fgMemberMapper.findByFgMemberId(fgMemberId);
    }

    public void deleteFgMemberInfo(Integer fgMemberId) {
        fgMemberMapper.deleteByFgMemberId(fgMemberId);
    }

    public Boolean putFgMemberInfo(BasicDTO.PutFgMemberInfoDTO dto) {
        try {
            System.out.println(dto.getColumnName().length());
            System.out.println(dto.getColumnName() + "AAAA");
            System.out.println("isAdmin" + "AAAA");

            if(dto.getColumnName() == "isAdmin")
                System.out.println("ABABABABABABABABABABABABABABAB");
            else
                System.out.println("cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd");

            if (dto.getColumnName().equals("isAdmin")) {
                System.out.println(dto.getColumnName() + "-------------------------------------AAAAAAAAAAA-----------------------------------------");
                accountMapper.updateIsAdmin(dto.getFgMemberId());
            } else if (dto.getColumnName().equals("registerApproval")) {
                System.out.println(dto.getColumnName() + "-------------------------------------AAAAAAAAAAA-----------------------------------------");
                accountMapper.updateRegisterApproval(dto.getFgMemberId());
            } else {
                fgMemberMapper.updateByFgMemberId(dto);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoList() {
        return fgMemberMapper.findAll();
    }

    public List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoListByGeneration(Integer generation) {
        return fgMemberMapper.findByGeneration(generation);
    }

    public List<BasicDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGeneration(Integer generation) {
        return fgMemberMapper.findFgMemberInfoTableByGeneration(generation);
    }
}
