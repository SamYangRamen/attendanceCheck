package freshmanGuide.attendanceCheck.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "lc_list")
@IdClass(LCListEntityPK.class)
public class LCListEntity {

    @Id
    private Integer year;
    @Id
    private String lc;

    private Integer fgMemberId1;
    private Integer fgMemberId2;
}
