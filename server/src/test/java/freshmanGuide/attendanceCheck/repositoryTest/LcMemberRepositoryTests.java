package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.LcMemberRepository;
import freshmanGuide.attendanceCheck.repository.LcRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LcMemberRepositoryTests {

    LcRepository lcRepository;
    LcMemberRepository lcMemberRepository;

    @Autowired
    public LcMemberRepositoryTests(
            LcMemberRepository lcMemberRepository,
            LcRepository lcRepository
    ) {
        this.lcMemberRepository = lcMemberRepository;
        this.lcRepository = lcRepository;
    }

    @Test
    public void test() {
        try {
            lcRepository.postLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
            lcMemberRepository.postLcMemberInfo(new BasicDTO.LcMemberInfoDTO(
                    2020999999,
                    "전지현",
                    2099,
                    "999",
                    true,
                    "010-2222-2222",
                    "bbb@naver.com"
            ));
            BasicDTO.LcMemberInfoDTO data = lcMemberRepository.getLcMemberInfo(2020999999);
            Assertions.assertEquals(data.getContact(), "010-2222-2222");

            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
            Assertions.assertEquals(lcMemberRepository.getLcMemberInfo(2020999999), null);
        } catch (Exception e) {
            e.printStackTrace();
            lcMemberRepository.deleteLcMemberInfo(2020999999);
            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
        }
    }
}
