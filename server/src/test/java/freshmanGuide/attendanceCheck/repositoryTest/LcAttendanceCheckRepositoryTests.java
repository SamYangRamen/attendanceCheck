package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.*;
import freshmanGuide.attendanceCheck.repository.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
public class LcAttendanceCheckRepositoryTests {

    LcRepository lcRepository;
    LcMemberRepository lcMemberRepository;
    EventRepository eventRepository;
    LcAttendanceCheckRepository lcAttendanceCheckRepository;

    @Autowired
    public LcAttendanceCheckRepositoryTests(
            LcRepository lcRepository,
            LcMemberRepository lcMemberRepository,
            LcAttendanceCheckRepository lcAttendanceCheckRepository,
            EventRepository eventRepository
    ) {
        this.lcRepository = lcRepository;
        this.lcMemberRepository = lcMemberRepository;
        this.lcAttendanceCheckRepository = lcAttendanceCheckRepository;
        this.eventRepository = eventRepository;
    }

    @Test
    public void test() {
        try {
            String testDateString = "2999-12-31";
            SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date timeStamp = transFormat.parse(testDateString);

            try {
                lcRepository.postLc(new LcDTO.LcFKDTO(2099, "999"));

                lcMemberRepository.postLcMemberInfo(new LcMemberDTO.LcMemberInfoDTO(
                        2099,
                        "999",
                        "화학공학과",
                        "여",
                        "전지현",
                        "010-2222-2222"
                ));

                eventRepository.postEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));

                lcAttendanceCheckRepository.postLcAttendanceCheckInfo(new LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO(
                        2020999999,
                        "testEventName",
                        timeStamp,
                        "출석"
                ));

                LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO data = lcAttendanceCheckRepository.getMostRecentAttendanceCheckInfo(2020999999);

                Assertions.assertEquals(data.getEventName(), "testEventName");
                Assertions.assertEquals(data.getLcMemberId(), 2020999999);

                lcRepository.deleteLcInfo(new LcDTO.LcFKDTO(2099, "999"));
                eventRepository.deleteEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));

                Assertions.assertEquals(lcRepository.getLcListByYear(2099).isEmpty(), true);
                Assertions.assertEquals(lcMemberRepository.getLcMemberInfo(2020999999), null);
                Assertions.assertEquals(eventRepository.getEventNameListByEventDate(timeStamp).isEmpty(), true);
                Assertions.assertEquals(lcAttendanceCheckRepository.getMostRecentAttendanceCheckInfo(2020999999), null);
            } catch (Exception e) {
                e.printStackTrace();
                lcRepository.deleteLcInfo(new LcDTO.LcFKDTO(2099, "999"));
                lcMemberRepository.deleteLcMemberInfoByLcMemberId(2020999999);
                eventRepository.deleteEventInfo(new EventDTO.EventInfoDTO("testEventName", "fg", timeStamp));
                lcAttendanceCheckRepository.deleteAttendanceCheckInfo(2020999999);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
