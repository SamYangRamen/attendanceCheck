package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.FgMemberMapper;
import freshmanGuide.attendanceCheck.mapper.LcAttendanceCheckMapper;
import freshmanGuide.attendanceCheck.mapper.LcMapper;
import freshmanGuide.attendanceCheck.mapper.LcMemberMapper;
import freshmanGuide.attendanceCheck.service.AttendanceCheckService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BasicInsertAndDeleteTest {

    FgMemberMapper fgMemberMapper;
    LcMapper lcMapper;
    LcMemberMapper lcMemberMapper;
    LcAttendanceCheckMapper lcAttendanceCheckMapper;
    AttendanceCheckService attendanceCheckService;

    @Autowired
    public BasicInsertAndDeleteTest(
            FgMemberMapper fgMemberMapper,
            LcMapper lcMapper,
            LcMemberMapper lcMemberMapper,
            LcAttendanceCheckMapper lcAttendanceCheckMapper,
            AttendanceCheckService attendanceCheckService
    ) {
        this.fgMemberMapper = fgMemberMapper;
        this.lcMapper = lcMapper;
        this.lcMemberMapper = lcMemberMapper;
        this.lcAttendanceCheckMapper = lcAttendanceCheckMapper;
        this.attendanceCheckService = attendanceCheckService;
    }

    @Test
    public void insertFGMemberInfoAndDeleteTest() {
        try {
            fgMemberMapper.save(new BasicDTO.FgMemberInfoDTO(
                    123,
                    13,
                    "testName",
                    null,
                    null,
                    "010-1111-1111"
            ));
            System.out.println("FGMember data insert success.");

            BasicDTO.FgMemberInfoDTO fgMemberInfo = fgMemberMapper.findByFgMemberId(123);
            System.out.println(fgMemberInfo.getFgMemberName());
            System.out.println("FGMember name print success.");

            fgMemberMapper.deleteByFgMemberId(123);
            System.out.println("FGMember data delete success.");

        } catch (Exception e) {
            System.out.println("ERROR");
            e.printStackTrace();
        }
    }

    @Test
    public void insertLCListAndInsertLCMemberAndDeleteTest() {

        try {
            System.out.println("Insert lc_list Test");
            lcMapper.save(new BasicDTO.LcInfoDTO(
                    2021,
                    "93",
                    null,
                    null
            ));
            System.out.println("Insert lc_list finish");
        } catch (Exception e) {
            System.out.println("Insert lc_list Test Error");
            e.printStackTrace();
        }
        try {
            System.out.println("Insert lc_member Test");
            lcMemberMapper.save(new BasicDTO.LcMemberInfoDTO(
                    2021999999,
                    "전지현",
                    2021,
                    "93",
                    "N",
                    "010-1111-1111"
            ));
            System.out.println("Insert lc_member finish");

        } catch (Exception e) {
            System.out.println("Insert lc_member Test Error");
            e.printStackTrace();
        }

        try {
            System.out.println("Insert lc_member_attendance_check Test");

            lcAttendanceCheckMapper.save(new BasicDTO.LcAttendanceCheckInfoDTO(
                    2021999999,
                    attendanceCheckService.getTimeStamp(),
                    "출석"
            ));

            System.out.println("Insert lc_member_attendance_check Finish");
        } catch (Exception e) {
            System.out.println("Insert lc_member_attendance_check Error");
            e.printStackTrace();
        }

        try {
            System.out.println("find and print Test");

            BasicDTO.LcMemberInfoDTO lcMemberInfo = lcMemberMapper.findByLcMemberId(2021999999);

            System.out.printf("%s\n", lcMemberInfo.getLcMemberName());

            BasicDTO.LcAttendanceCheckInfoDTO lcAttendanceCheckInfo = lcAttendanceCheckMapper.findFirstByOrderByLcMemberIdDesc(2021999999);
            System.out.println(lcAttendanceCheckInfo.getDate().toString());

            System.out.println("find and print finish");
        } catch (Exception e) {
            System.out.println("find and print Test Error");
            e.printStackTrace();
        }

        try {
            System.out.println("delete Test");

            lcAttendanceCheckMapper.deleteByLcMemberId(2021999999);

            lcMemberMapper.deleteByLcMemberId(2020111111);
            System.out.println("delete lc_member finish");

            lcMapper.deleteByYearAndLc(new BasicDTO.LcInfoPKDTO(2021, "93"));
            System.out.println("delete lc_list finish");

            System.out.println("delete Test success");
        } catch (Exception e) {
            System.out.println("delete Test Error");
            e.printStackTrace();
        }
    }
}
