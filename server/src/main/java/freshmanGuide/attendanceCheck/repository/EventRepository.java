package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.EventDTO;
import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import freshmanGuide.attendanceCheck.mapper.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Repository
public class EventRepository {

    EventMapper eventMapper;

    @Autowired
    public EventRepository(EventMapper eventMapper) {
        this.eventMapper = eventMapper;
    }

    public void postEventInfo(EventDTO.EventInfoDTO dto) {
        eventMapper.save(dto);
    }

    public List<EventDTO.EventInfoDTO> getEventInfoList() {
        return eventMapper.findAll();
    }

    public void deleteEventInfo(EventDTO.EventInfoDTO dto) {
        eventMapper.deleteByEventNameAndEventDate(dto);
    }

    public List<String> getEventNameListByEventDate(Date eventDate) {
        return eventMapper.findEventNameByEventDate(java.sql.Date.valueOf((new SimpleDateFormat("yyyy-MM-dd")).format(eventDate)));
    }
}
