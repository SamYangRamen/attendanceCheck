package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

public class LcAttendanceCheckDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcAttendanceCheckInfoDTO {
        private Integer lcMemberId;
        private Integer eventIdx;
        private Integer state;
        private String note;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LcAttendanceCheckTableInfoDTO {
        private String key;
        private String department;
        private String gender;
        private String lcMemberName;
        private Integer state;
        private String note;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PutLcAttendanceCheckInfoDTO {
        private Integer lcMemberId;
        private Integer eventIdx;
        private String columnName;
        private String value;
    }
}
