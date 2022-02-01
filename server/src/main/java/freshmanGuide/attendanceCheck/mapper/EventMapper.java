package freshmanGuide.attendanceCheck.mapper;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.EventDTO;
import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface EventMapper {
    void save(EventDTO.EventInfoDTO dto);

    List<EventDTO.EventInfoDTO> findAll();

    void deleteByEventNameAndEventDate(EventDTO.EventInfoDTO dto);

    List<String> findEventNameByEventDate(Date eventDate);

    List<EventDTO.EventTableInfoDTO> findByYearAndMonth(HashMap dataList);

    void deleteByEventIdx(Integer eventIdx);
}
