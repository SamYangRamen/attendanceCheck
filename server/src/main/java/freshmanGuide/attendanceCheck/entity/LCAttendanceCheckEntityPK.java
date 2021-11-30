package freshmanGuide.attendanceCheck.entity;

import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class LCAttendanceCheckEntityPK implements Serializable {

    @Column(name = "lcMemberId")
    private Integer lcMemberId;

    @Column(name = "date")
    private Date date;
}
