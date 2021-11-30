package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.entity.FGMemberEntity;
import freshmanGuide.attendanceCheck.entity.LCAttendanceCheckEntity;
import freshmanGuide.attendanceCheck.entity.LCAttendanceCheckEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface LCAttendanceCheckRepository extends JpaRepository<LCAttendanceCheckEntity, LCAttendanceCheckEntityPK> {
    Integer countByLcMemberId(Integer lcMemberId);

    LCAttendanceCheckEntity findFirstByOrderByLcMemberIdDesc(@Param("lcMemberId") Integer lcMemberId);

    List<LCAttendanceCheckEntity> findByOrderByLcMemberIdDesc(Integer lcMemberId);

    @Transactional
    void deleteByLcMemberId(Integer lcMemberId);
}
