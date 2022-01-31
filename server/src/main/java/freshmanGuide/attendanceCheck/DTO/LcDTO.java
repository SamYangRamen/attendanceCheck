package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class LcDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcInfoDTO {
        private Integer year;
        private String lc;
        private Integer fgMemberId1;
        private Integer fgMemberId2;
        private Integer fgMemberId3;
        private Integer fgMemberId4;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcInfoWithFgMemberNameDTO {
        private Integer key;
        private Integer year;
        private String lc;
        private String fgMemberName1;
        private String fgMemberName2;
        private String fgMemberName3;
        private String fgMemberName4;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcSearchInfoDTO {
        private Integer year;
        private String lc;
        private String fgMemberName1;
        private String fgMemberName2;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcFKDTO {
        private Integer year;
        private String lc;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostLcRangeDTO {
        private Integer year;
        private String lcDepartment;
        private Integer startLcNumber;
        private Integer endLcNumber;
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
    public static class PutLcInfoDTO {
        private Integer lcIdx;
        private String columnName;
        private Integer fgMemberId;
    }
}
