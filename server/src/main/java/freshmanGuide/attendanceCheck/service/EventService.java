package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.EventDTO;

import java.util.List;

public interface EventService {
    List<EventDTO.EventTableInfoDTO> getEventTableInfoByYearAndMonthService(Integer year, Integer month);

    Boolean postEventInfoService(EventDTO.EventInfoDTO dto);

    Boolean deleteEventInfoByEventIdxService(Integer eventIdx);
}
