package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.EventDTO;
import freshmanGuide.attendanceCheck.repository.EventRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class EventServiceImpl implements EventService {

    EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<EventDTO.EventTableInfoDTO> getEventTableInfoOfMonthForCalendarService(Integer year, Integer month, String eventType) {
        try {
            return eventRepository.getEventTableInfoOfMonthForCalendar(year, month, eventType);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<EventDTO.EventTableInfoDTO> getEventTableInfoOfDayService(Integer year, Integer month, Integer day, String eventType) {
        try {
            return eventRepository.getEventTableInfoOfDay(year, month, day, eventType);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean postEventInfoService(EventDTO.EventInfoDTO dto) {
        try {
            eventRepository.postEventInfo(dto);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean deleteEventInfoByEventIdxService(Integer eventIdx) {
        try {
            eventRepository.deleteEventInfoByEventIdx(eventIdx);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
