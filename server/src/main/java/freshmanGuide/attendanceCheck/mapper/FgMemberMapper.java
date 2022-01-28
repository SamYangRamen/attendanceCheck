package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FgMemberMapper {

    void save(BasicDTO.FgMemberInfoDTO dto);

    BasicDTO.FgMemberInfoDTO findByFgMemberId(Integer fgMemberId);

    void updateByFgMemberId(BasicDTO.PutFgMemberInfoDTO dto);

    List<BasicDTO.FgMemberInfoDTO> findAll();

    List<BasicDTO.FgMemberInfoDTO> findByGeneration(Integer Generation);

    List<BasicDTO.FgMemberTableInfoDTO> findFgMemberInfoTableByGeneration(Integer generation);

    List<BasicDTO.FgMemberSearchInfoDTO> findByGenerationAndPositionAndFgMemberName(BasicDTO.FgMemberSearchInfoDTO dto);

    List<BasicDTO.FgMemberTableInfoDTO> findByFgMemberIdAndGenerationAndFgMemberNameAndPositionAndState(BasicDTO.FgMemberInfoDTO dto);

    void deleteByFgMemberId(Integer fgMemberId);
}
