package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.EventDTO;
import freshmanGuide.attendanceCheck.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class EventController {

    EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/event-info/table/calendar")
    @ResponseBody
    public List<EventDTO.EventTableInfoDTO> getEventTableInfoOfMonthForCalendar(@RequestParam Integer year, @RequestParam Integer month, @RequestParam String eventType) {
        return eventService.getEventTableInfoOfMonthForCalendarService(year, month, eventType);
    }

    @GetMapping("/event-info/table")
    @ResponseBody
    public List<EventDTO.EventTableInfoDTO> getEventTableInfoOfDay(@RequestParam Integer year, @RequestParam Integer month, @RequestParam Integer day, @RequestParam String eventType) {
        return eventService.getEventTableInfoOfDayService(year, month, day, eventType);
    }

    @PostMapping("/event-info")
    @ResponseBody
    public Boolean postEventInfo(@RequestBody EventDTO.EventInfoDTO dto) {
        return eventService.postEventInfoService(dto);
    }

    @DeleteMapping("/event-info")
    @ResponseBody
    public Boolean deleteEventInfoByEventIdx(@RequestParam Integer eventIdx) {
        return eventService.deleteEventInfoByEventIdxService(eventIdx);
    }
}
