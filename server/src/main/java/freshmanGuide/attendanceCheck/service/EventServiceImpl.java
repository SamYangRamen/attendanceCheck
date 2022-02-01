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
    public List<EventDTO.EventTableInfoDTO> getEventTableInfoByYearAndMonthService(Integer year, Integer month) {
        try {
            return eventRepository.getEventTableInfoByYearAndMonth(year, month);
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
