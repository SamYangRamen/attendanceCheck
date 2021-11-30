package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.mapper.FGMemberMapper;
import freshmanGuide.attendanceCheck.mapper.LCAttendanceCheckMapper;
import freshmanGuide.attendanceCheck.mapper.LCListMapper;
import freshmanGuide.attendanceCheck.mapper.LCMemberMapper;
import freshmanGuide.attendanceCheck.service.AttendanceCheckService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
public class BasicInsertAndDeleteTest {

    FGMemberMapper fgMemberMapper;
    LCListMapper lcListMapper;
    LCMemberMapper lcMemberMapper;
    LCAttendanceCheckMapper lcAttendanceCheckMapper;
    AttendanceCheckService attendanceCheckService;

    @Autowired
    public BasicInsertAndDeleteTest(
            FGMemberMapper fgMemberMapper,
            LCListMapper lcListMapper,
            LCMemberMapper lcMemberMapper,
            LCAttendanceCheckMapper lcAttendanceCheckMapper,
            AttendanceCheckService attendanceCheckService
    ) {
        this.fgMemberMapper = fgMemberMapper;
        this.lcListMapper = lcListMapper;
        this.lcMemberMapper = lcMemberMapper;
        this.lcAttendanceCheckMapper = lcAttendanceCheckMapper;
        this.attendanceCheckService = attendanceCheckService;
    }

    @Test
    public void insertFGMemberInfoAndDeleteTest() {
        try {
            fgMemberMapper.save(new BasicDTO.FGMemberInfoDTO(
                    123,
                    13,
                    "testName",
                    null,
                    null,
                    "010-1111-1111"
            ));
            System.out.println("FGMember data insert success.");

            BasicDTO.FGMemberInfoDTO fgMemberInfo = fgMemberMapper.findByFgMemberId(123);
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
            lcListMapper.save(new BasicDTO.LCInfoDTO(
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
            lcMemberMapper.save(new BasicDTO.LCMemberInfoDTO(
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

            lcAttendanceCheckMapper.save(new BasicDTO.LCAttendanceCheckInfoDTO(
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

            BasicDTO.LCMemberInfoDTO lcMemberInfo = lcMemberMapper.findByLcMemberId(2021999999);

            System.out.printf("%s\n", lcMemberInfo.getLcMemberName());

            BasicDTO.LCAttendanceCheckInfoDTO lcAttendanceCheckInfo = lcAttendanceCheckMapper.findFirstByOrderByLcMemberIdDesc(2021999999);
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

            lcListMapper.deleteByYearAndLc(new BasicDTO.LCInfoPKDTO(2021, "93"));
            System.out.println("delete lc_list finish");

            System.out.println("delete Test success");
        } catch (Exception e) {
            System.out.println("delete Test Error");
            e.printStackTrace();
        }
    }
}
