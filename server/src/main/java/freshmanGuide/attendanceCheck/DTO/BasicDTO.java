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
    public static class FgMemberInfoDTO {
        private Integer fgMemberId;
        private Integer generation;
        private String fgMemberName;
        private String position;
        private String state;
        private String contact;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcInfoDTO {
        private Integer year;
        private String lc;
        private Integer fgMemberId1;
        private Integer fgMemberId2;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcInfoPKDTO {
        private Integer year;
        private String lc;
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
        private String isPeerLeader;
        private String contact;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcAttendanceCheckInfoDTO {
        private Integer lcMemberId;
        private Date date;
        private String state;
    }
}
