package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import freshmanGuide.attendanceCheck.repository.LcManagerRepository;
import freshmanGuide.attendanceCheck.repository.LcRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class LcManagerRepositoryTests {

    FgMemberRepository fgMemberRepository;
    LcRepository lcRepository;
    LcManagerRepository lcManagerRepository;

    @Autowired
    public LcManagerRepositoryTests(
            FgMemberRepository fgMemberRepository,
            LcRepository lcRepository,
            LcManagerRepository lcManagerRepository
    ) {
        this.fgMemberRepository = fgMemberRepository;
        this.lcRepository = lcRepository;
        this.lcManagerRepository = lcManagerRepository;
    }

    @Test
    public void test() {
        try {
            fgMemberRepository.postFgMemberInfo(new BasicDTO.FgMemberInfoDTO(
                    2020999999,
                    999,
                    "전지현",
                    "부회장",
                    "재학",
                    "010-1111-1111",
                    "aaa@naver.com"
            ));

            lcRepository.postLcInfo(new BasicDTO.LcInfoDTO(
                    2099, "999"
            ));

            lcManagerRepository.postLcManagerInfo(new BasicDTO.LcManagerInfoDTO(2099, "999", 2020999999));

            List<Integer> data = lcManagerRepository.getFgMemberIdList(new BasicDTO.LcInfoDTO(2099, "999"));

            Assertions.assertEquals(data.get(0), 2020999999);

            fgMemberRepository.deleteFgMemberInfo(2020999999);
            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));

            Assertions.assertEquals(fgMemberRepository.getFgMemberInfo(2020999999), null);
            Assertions.assertEquals(lcRepository.getLcListByYear(2099).isEmpty(), true);
            Assertions.assertEquals(lcManagerRepository.getFgMemberIdList(new BasicDTO.LcInfoDTO(2099, "999")).isEmpty(), true);
        } catch (Exception e) {
            e.printStackTrace();
            fgMemberRepository.deleteFgMemberInfo(2020999999);
            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
            lcManagerRepository.deleteLcManagerInfoByYearAndLc(new BasicDTO.LcInfoDTO(2099, "999"));
        }
    }
}
