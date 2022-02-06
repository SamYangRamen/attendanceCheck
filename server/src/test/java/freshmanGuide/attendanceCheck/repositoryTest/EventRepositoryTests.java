package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.EventDTO;
import freshmanGuide.attendanceCheck.repository.EventRepository;
import freshmanGuide.attendanceCheck.service.LcAttendanceCheckService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class EventRepositoryTests {

    EventRepository eventRepository;
    LcAttendanceCheckService attendanceCheckService;

    @Autowired
    public EventRepositoryTests(
            EventRepository eventRepository,
            LcAttendanceCheckService attendanceCheckService
    ) {
        this.eventRepository = eventRepository;
        this.attendanceCheckService = attendanceCheckService;
    }

    @Test
    public void test() {
        try {
            String testDateString = "2999-12-31";
            SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date timeStamp = transFormat.parse(testDateString);
            
            try {
                eventRepository.postEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));

                try {
                    List<EventDTO.EventInfoDTO> data = eventRepository.getEventInfoList();
                    Assertions.assertEquals(data.get(0).getEventName(), "testEventName");
                    Assertions.assertEquals(data.get(0).getEventDate(), timeStamp);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                try {
                    eventRepository.deleteEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));
                    Assertions.assertEquals(eventRepository.getEventNameListByEventDate(timeStamp).isEmpty(), true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } catch (Exception e) {
                e.printStackTrace();
                eventRepository.deleteEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
