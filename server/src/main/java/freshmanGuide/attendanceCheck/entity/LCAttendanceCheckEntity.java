package freshmanGuide.attendanceCheck.entity;

import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "lc_attendance_check")
@IdClass(LCAttendanceCheckEntityPK.class)
public class LCAttendanceCheckEntity {

    @Id
    private Integer lcMemberId;
    @Id
    private Date date;

    private String state;

    @ManyToOne(targetEntity = LCMemberEntity.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "lcMemberId", insertable = false, updatable = false, nullable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private LCMemberEntity lc_member;
}
