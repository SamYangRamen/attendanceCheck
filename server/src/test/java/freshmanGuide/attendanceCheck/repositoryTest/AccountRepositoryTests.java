package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.AccountRepository;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AccountRepositoryTests {

    AccountRepository accountRepository;
    FgMemberRepository fgMemberRepository;

    @Autowired
    public AccountRepositoryTests(
            AccountRepository accountRepository,
            FgMemberRepository fgMemberRepository
    ) {
        this.accountRepository = accountRepository;
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
                accountRepository.postAccountInfo(
                        new BasicDTO.AccountInfoDTO(
                                2013999999,
                                "testPassword",
                                false
                        )
                );


                assertEquals(accountRepository.getPassword(2013999999), "testPassword");

                try {
                    accountRepository.putIsAdmin(2013999999);

                    assertEquals(accountRepository.getPasswordAndIsAdmin(2013999999).isAdmin(), true);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                try {
                    accountRepository.deleteAccountInfo(2013999999);
                    assertEquals(accountRepository.getPasswordAndIsAdmin(2013999999), null);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            fgMemberRepository.deleteFgMemberInfo(2013999999);
            assertEquals(fgMemberRepository.getFgMemberInfo(2013999999), null);
        } catch (Exception e) {
            e.printStackTrace();
            accountRepository.deleteAccountInfo(2013999999);
            fgMemberRepository.deleteFgMemberInfo(2013999999);
        }
    }
}
