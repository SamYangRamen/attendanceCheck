package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.entity.LCListEntity;
import freshmanGuide.attendanceCheck.entity.LCListEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface LCListRepository extends JpaRepository<LCListEntity, LCListEntityPK> {

    @Transactional
    void deleteByYearAndLc(Integer year, String lc);
}
