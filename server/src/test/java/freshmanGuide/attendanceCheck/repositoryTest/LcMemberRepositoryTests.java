package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;
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
            lcRepository.postLc(new LcDTO.LcFKDTO(2099, "999"));
            lcMemberRepository.postLcMemberInfo(new LcMemberDTO.LcMemberInfoDTO(
                    2099,
                    "999",
                    "화학공학과",
                    "여",
                    "전지현",
                    "010-2222-2222"
            ));
            LcMemberDTO.LcMemberInfoDTO data = lcMemberRepository.getLcMemberInfo(2020999999);
            Assertions.assertEquals(data.getContact(), "010-2222-2222");

            lcRepository.deleteLcInfo(new LcDTO.LcFKDTO(2099, "999"));
            Assertions.assertEquals(lcMemberRepository.getLcMemberInfo(2020999999), null);
        } catch (Exception e) {
            e.printStackTrace();
            lcMemberRepository.deleteLcMemberInfoByLcMemberId(2020999999);
            lcRepository.deleteLcInfo(new LcDTO.LcFKDTO(2099, "999"));
        }
    }
}
