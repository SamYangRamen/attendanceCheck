package freshmanGuide.attendanceCheck.entity;

import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class LCListEntityPK implements Serializable {

    @Column(name = "year")
    private Integer year;

    @Column(name = "lc")
    private String lc;
}
