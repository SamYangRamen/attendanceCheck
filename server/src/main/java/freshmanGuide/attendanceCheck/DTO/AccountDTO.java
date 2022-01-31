package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class AccountDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountInfoDTO {
        private Integer fgMemberId;
        private String password;
        private String salt;
        private Boolean isAdmin;
        private Boolean registerApproval;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginInfoDTO {
        private String account;
        private String password;
        private Boolean isAdmin;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountCheckInfoDTO {
        private String password;
        private String salt;
        private Boolean isAdmin;
        private Boolean registerApproval;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountTypeDTO {
        private String account;
        private Boolean type;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PutAccountInfoDTO {
        private Integer fgMemberId;
        private String columnName;
        private String value;
    }
}
