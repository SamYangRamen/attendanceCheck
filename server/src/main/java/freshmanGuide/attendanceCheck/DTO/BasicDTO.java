package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

public class BasicDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountInfoDTO {
        private Integer fgMemberId;
        private String password;
        private boolean isAdmin;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountAdminInfoDTO {
        private String password;
        private boolean isAdmin;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FgMemberInfoDTO {
        private Integer fgMemberId;
        private Integer generation;
        private String fgMemberName;
        private String position;
        private String state;
        private String contact;
        private String mail;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcInfoDTO {
        private Integer year;
        private String lc;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcManagerInfoDTO {
        private Integer year;
        private String lc;
        private Integer fgMemberId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcMemberInfoDTO {
        private Integer lcMemberId;
        private String lcMemberName;
        private Integer year;
        private String lc;
        private Boolean isPeerLeader;
        private String contact;
        private String mail;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcAttendanceCheckInfoDTO {
        private Integer lcMemberId;
        private String eventName;
        private Date eventDate;
        private String state;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventInfoDTO {
        private String eventName;
        private Date eventDate;
    }
}
