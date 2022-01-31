package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class LcMemberDTO {

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
    public static class LcMemberTableInfoDTO {
        private Integer key;
        private Integer year;
        private String lc;
        private String department;
        private String gender;
        private String contact;
    }
}
