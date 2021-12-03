package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface EventMapper {
    void save(BasicDTO.EventInfoDTO dto);

    List<BasicDTO.EventInfoDTO> findAll();

    void deleteByEventNameAndEventDate(BasicDTO.EventInfoDTO dto);

    List<String> findEventNameByEventDate(Date eventDate);
}
