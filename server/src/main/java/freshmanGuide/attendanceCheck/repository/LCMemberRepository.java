package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.entity.LCMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface LCMemberRepository extends JpaRepository<LCMemberEntity, Integer> {

    LCMemberEntity findByLcMemberId(Integer lcMemberId);

    LCMemberEntity findByLcMemberIdAndLcMemberName(Integer lcMemberId, String lcMemberName);

    LCMemberEntity findByLcMemberName(String lcMemberName);

    @Transactional
    void deleteByLcMemberId(Integer lcMemberId);
}

