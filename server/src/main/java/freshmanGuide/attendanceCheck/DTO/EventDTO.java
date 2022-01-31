package freshmanGuide.attendanceCheck.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

public class EventDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventInfoDTO {
        private String eventName;
        private Date eventDate;
    }
}
