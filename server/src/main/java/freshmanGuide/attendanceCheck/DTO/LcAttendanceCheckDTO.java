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
        private String eventName;
        private Date eventDate;
        private String state;
    }
}
