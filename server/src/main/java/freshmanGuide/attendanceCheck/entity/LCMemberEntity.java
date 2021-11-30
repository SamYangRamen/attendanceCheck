package freshmanGuide.attendanceCheck.entity;

import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "lc_member")
public class LCMemberEntity {
    @Id
    private Integer lcMemberId;

    private String lcMemberName;
    private Integer year;
    private String lc;
    private String isPeerLeader;
    private String contact;

    @ManyToOne(targetEntity = LCListEntity.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "year", insertable = false, updatable = false, nullable = false)
    @JoinColumn(name = "lc", insertable = false, updatable = false, nullable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private LCListEntity lc_list;
}
