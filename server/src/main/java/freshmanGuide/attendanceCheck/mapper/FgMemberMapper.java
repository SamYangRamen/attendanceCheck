package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FgMemberMapper {

    void save(FgMemberDTO.FgMemberInfoDTO dto);

    FgMemberDTO.FgMemberInfoDTO findByFgMemberId(Integer fgMemberId);

    void updateByFgMemberId(FgMemberDTO.PutFgMemberInfoDTO dto);

    List<FgMemberDTO.FgMemberInfoDTO> findByGeneration(Integer Generation);

    List<FgMemberDTO.FgMemberTableInfoDTO> findFgMemberInfoTableByGeneration(Integer generation);

    List<FgMemberDTO.FgMemberSearchInfoDTO> findByGenerationAndPositionAndFgMemberName(FgMemberDTO.FgMemberSearchInfoDTO dto);

    List<FgMemberDTO.FgMemberTableInfoDTO> findByFgMemberIdAndGenerationAndFgMemberNameAndPositionAndState(FgMemberDTO.FgMemberInfoDTO dto);

    void deleteByFgMemberId(Integer fgMemberId);
}
