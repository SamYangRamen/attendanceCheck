package freshmanGuide.attendanceCheck.repository;

import freshmanGuide.attendanceCheck.mapper.FGMemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FGMemberRepository {

    FGMemberMapper fgMemberMapper;

    @Autowired
    public FGMemberRepository(FGMemberMapper fgMemberMapper) {
        this.fgMemberMapper = fgMemberMapper;
    }
}
