package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FgMemberMapper {

    void save(BasicDTO.FgMemberInfoDTO dto);

    BasicDTO.FgMemberInfoDTO findByFgMemberId(Integer fgMemberId);

    void deleteByFgMemberId(Integer fgMemberId);

    List<BasicDTO.FgMemberInfoDTO> findAll();

    List<BasicDTO.FgMemberInfoDTO> findByGeneration(Integer Generation);
}
