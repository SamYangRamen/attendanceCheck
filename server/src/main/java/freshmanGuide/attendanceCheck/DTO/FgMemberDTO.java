package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FgMemberDTO {

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
    public static class FgMemberTableInfoDTO {
        private Integer key;
        private Integer fgMemberId;
        private Integer generation;
        private String fgMemberName;
        private String position;
        private String state;
        private String contact;
        private String mail;
        private Boolean isAdmin;
        private Boolean registerApproval;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PutFgMemberInfoDTO {
        private Integer fgMemberId;
        private String columnName;
        private String value;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FgMemberSearchInfoDTO {
        private Integer key;
        private Integer generation;
        private Integer fgMemberId;
        private String fgMemberName;
        private String position;
    }
}
