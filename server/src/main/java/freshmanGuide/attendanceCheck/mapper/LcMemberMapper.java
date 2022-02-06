package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LcMemberMapper {

    void save(LcMemberDTO.LcMemberInfoDTO dto);

    LcMemberDTO.LcMemberInfoDTO findByLcMemberId(Integer lcMemberId);

    void deleteByLcMemberId(Integer lcMemberId);

    List<LcMemberDTO.LcMemberInfoDTO> findAll();

    List<LcMemberDTO.LcMemberInfoDTO> findByYearAndLc(LcDTO.LcFKDTO dto);

    List<LcMemberDTO.LcMemberTableInfoDTO> findByYearAndLcAndDepartmentAndGenderAndLcMemberName(LcMemberDTO.LcMemberTableInfoDTO dto);

    void updateByLcMemberId(LcMemberDTO.PutLcMemberInfoDTO dto);
}