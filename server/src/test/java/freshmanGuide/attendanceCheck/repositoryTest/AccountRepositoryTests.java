package freshmanGuide.attendanceCheck.repositoryTest;

import freshmanGuide.attendanceCheck.DTO.AccountDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import freshmanGuide.attendanceCheck.repository.AccountRepository;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Assertions;

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
                    new FgMemberDTO.FgMemberInfoDTO(
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
                        new AccountDTO.AccountInfoDTO(
                                2013999999,
                                "testPassword",
                                "testSalt",
                                false,
                                false
                        )
                );


                Assertions.assertEquals(accountRepository.getPassword(2013999999), "testPassword");

                try {
                    accountRepository.putIsAdmin(2013999999);

                    Assertions.assertEquals(accountRepository.getPasswordAndIsAdminAndRegisterApprovalByFgMemberId(2013999999).getIsAdmin(), true);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                try {
                    accountRepository.deleteAccountInfo(2013999999);
                    Assertions.assertEquals(accountRepository.getPasswordAndIsAdminAndRegisterApprovalByFgMemberId(2013999999), null);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            fgMemberRepository.deleteFgMemberInfo(2013999999);
            Assertions.assertEquals(fgMemberRepository.getFgMemberInfo(2013999999), null);
        } catch (Exception e) {
            e.printStackTrace();
            accountRepository.deleteAccountInfo(2013999999);
            fgMemberRepository.deleteFgMemberInfo(2013999999);
        }
    }
}
