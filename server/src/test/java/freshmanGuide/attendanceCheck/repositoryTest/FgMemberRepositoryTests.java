package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class FgMemberRepositoryTests {

    FgMemberRepository fgMemberRepository;

    @Autowired
    public FgMemberRepositoryTests(FgMemberRepository fgMemberRepository) {
        this.fgMemberRepository = fgMemberRepository;
    }

    @Test
    public void test() {
        try {
            fgMemberRepository.postFgMemberInfo(
                    new BasicDTO.FgMemberInfoDTO(
                            2013999999,
                            999,
                            "김성보",
                            null,
                            null,
                            "010-1111-1111",
                            "seongbo_kim@test.com"
                    )
            );

            try {
                BasicDTO.FgMemberInfoDTO data = fgMemberRepository.getFgMemberInfo(2013999999);
                Assertions.assertEquals(data.getContact(), "010-1111-1111");
                Assertions.assertEquals(data.getMail(), "seongbo_kim@test.com");
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                List<BasicDTO.FgMemberInfoDTO> data = fgMemberRepository.getFgMemberInfoListByGeneration(999);
                Assertions.assertEquals(data.get(0).getContact(), "010-1111-1111");
                Assertions.assertEquals(data.get(0).getMail(), "seongbo_kim@test.com");
            } catch (Exception e) {
                e.printStackTrace();
            }

            try {
                fgMemberRepository.deleteFgMemberInfo(2013999999);
                Assertions.assertEquals(fgMemberRepository.getFgMemberInfo(2013999999), null);
            } catch (Exception e) {
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
            fgMemberRepository.deleteFgMemberInfo(2013999999);
        }
    }
}
