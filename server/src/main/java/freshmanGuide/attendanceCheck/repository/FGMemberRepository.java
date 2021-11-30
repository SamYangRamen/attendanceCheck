package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.entity.FGMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface FGMemberRepository extends JpaRepository<FGMemberEntity, Integer> {

    FGMemberEntity findByFgMemberId(Integer fgMemberId);

    @Transactional
    void deleteByFgMemberId(Integer fgMemberId);
}
