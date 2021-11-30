package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.entity.*;
import freshmanGuide.attendanceCheck.repository.FGMemberRepository;
import freshmanGuide.attendanceCheck.repository.LCAttendanceCheckRepository;
import freshmanGuide.attendanceCheck.repository.LCListRepository;
import freshmanGuide.attendanceCheck.repository.LCMemberRepository;
import freshmanGuide.attendanceCheck.service.AttendanceCheckService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
public class BasicInsertAndDeleteTest {

    FGMemberRepository fgMemberRepository;
    LCListRepository lcListRepository;
    LCMemberRepository lcMemberRepository;
    LCAttendanceCheckRepository lcAttendanceCheckRepository;
    AttendanceCheckService attendanceCheckService;

    @Autowired
    public BasicInsertAndDeleteTest(
            FGMemberRepository fgMemberRepository,
            LCListRepository lcListRepository,
            LCMemberRepository lcMemberRepository,
            LCAttendanceCheckRepository lcAttendanceCheckRepository,
            AttendanceCheckService attendanceCheckService
    ) {
        this.fgMemberRepository = fgMemberRepository;
        this.lcListRepository = lcListRepository;
        this.lcMemberRepository = lcMemberRepository;
        this.lcAttendanceCheckRepository = lcAttendanceCheckRepository;
        this.attendanceCheckService = attendanceCheckService;
    }

    @Test
    public void insertFGMemberInfoAndDeleteTest() {
        try {
            fgMemberRepository.save(new FGMemberEntity(
                    123,
                    13,
                    "testName",
                    null,
                    null,
                    "010-1111-1111"
            ));
            System.out.println("FGMember data insert success.");

            FGMemberEntity fgMemberInfo = fgMemberRepository.findByFgMemberId(123);
            System.out.println(fgMemberInfo.getFgMemberName());
            System.out.println("FGMember name print success.");

            fgMemberRepository.deleteByFgMemberId(123);
            System.out.println("FGMember data delete success.");

        } catch (Exception e) {
            System.out.println("ERROR");
        }
    }

    @Test
    public void insertLCListAndInsertLCMemberAndDeleteTest() {

        try {
            System.out.println("Insert lc_list Test");
            lcListRepository.save(new LCListEntity(
                    2021,
                    "93",
                    null,
                    null
            ));
            System.out.println("Insert lc_list finish");
        } catch (Exception e) {
                System.out.println("Insert lc_list Test Error");
            }
        try {
            System.out.println("Insert lc_member Test");
            lcMemberRepository.save(new LCMemberEntity(
                    2021999999,
                    "전지현",
                    2021,
                    "93",
                    "N",
                    "010-1111-1111",
                    lcListRepository.getById(new LCListEntityPK(2021, "93"))
            ));
            System.out.println("Insert lc_member finish");

        } catch (Exception e) {
            System.out.println("Insert lc_member Test Error");
        }

        try {
            System.out.println("Insert lc_member_attendance_check Test");

            lcAttendanceCheckRepository.save(
                    new LCAttendanceCheckEntity(
                            2021999999,
                            attendanceCheckService.getTimeStamp(),
                            "출석",
                            lcMemberRepository.getById(2021999999)
                    )
            );

            System.out.println("Insert lc_member_attendance_check Finish");
        } catch (Exception e) {
            System.out.println("Insert lc_member_attendance_check Error");
        }

        try {
            System.out.println("find and print Test");

            LCMemberEntity lcMemberInfo = lcMemberRepository.findByLcMemberId(2021999999);

            System.out.printf("%s\n", lcMemberInfo.getLcMemberName());

            LCAttendanceCheckEntity lcAttendanceCheckInfo = lcAttendanceCheckRepository.findFirstByOrderByLcMemberIdDesc(2021999999);
            System.out.println(lcAttendanceCheckInfo.getDate().toString());

            System.out.println("find and print finish");
        } catch (Exception e) {
            System.out.println("find and print Test Error");
        }

        try {
            System.out.println("delete Test");

            lcAttendanceCheckRepository.deleteByLcMemberId(2021999999);
/*
            lcMemberRepository.deleteById(2020111111);
            System.out.println("delete lc_member finish");

            lcListRepository.deleteById(new LCListEntityPK(2021, "93"));
            System.out.println("delete lc_list finish");
*/
            System.out.println("delete Test success");
        } catch (Exception e) {
            System.out.println("delete Test Error");
        }
    }
}
