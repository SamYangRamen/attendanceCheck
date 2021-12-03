package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LcManagerMapper {
    void save(BasicDTO.LcManagerInfoDTO dto);

    List<Integer> findFgMemberIdListByYearAndLc(BasicDTO.LcInfoDTO dto);

    void deleteByYearAndLc(BasicDTO.LcInfoDTO dto);

    void deleteByFgMemberId(Integer fgMemberId);
}
