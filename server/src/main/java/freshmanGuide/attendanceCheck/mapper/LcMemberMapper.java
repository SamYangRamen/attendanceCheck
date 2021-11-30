package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LcMemberMapper {

    void save(BasicDTO.LcMemberInfoDTO dto);

    BasicDTO.LcMemberInfoDTO findByLcMemberId(Integer lcMemberId);

    void deleteByLcMemberId(Integer lcMemberId);

    List<BasicDTO.LcMemberInfoDTO> findAll();

    List<BasicDTO.LcMemberInfoDTO> findByYearAndLc(BasicDTO.LcInfoPKDTO dto);
}