package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.EventDTO;

import java.util.List;

public interface EventService {
    List<EventDTO.EventTableInfoDTO> getEventTableInfoOfMonthForCalendarService(Integer year, Integer month, String eventType);

    List<EventDTO.EventTableInfoDTO> getEventTableInfoOfDayService(Integer year, Integer month, Integer day, String eventType);

    Boolean postEventInfoService(EventDTO.EventInfoDTO dto);

    Boolean deleteEventInfoByEventIdxService(Integer eventIdx);
}
