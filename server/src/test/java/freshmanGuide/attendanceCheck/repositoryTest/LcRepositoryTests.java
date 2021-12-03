package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.LcRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class LcRepositoryTests {

    LcRepository lcRepository;

    @Autowired
    public LcRepositoryTests(LcRepository lcRepository) {
        this.lcRepository = lcRepository;
    }

    @Test
    public void test() {
        try {
            lcRepository.postLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
            List<String> data = lcRepository.getLcListByYear(2099);
            Assertions.assertEquals(data.get(0), "999");
            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
            Assertions.assertEquals(lcRepository.getLcListByYear(2099).isEmpty(), true);
        } catch (Exception e) {
            e.printStackTrace();
            lcRepository.deleteLcInfo(new BasicDTO.LcInfoDTO(2099, "999"));
        }
    }
}
