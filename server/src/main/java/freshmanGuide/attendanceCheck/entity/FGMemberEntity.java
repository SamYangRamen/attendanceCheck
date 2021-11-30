package freshmanGuide.attendanceCheck.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "fg_member")
public class FGMemberEntity {
    @Id
    private Integer fgMemberId;

    private Integer generation;
    private String fgMemberName;
    private String position;
    private String state;
    private String contact;
}