package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FgMemberServiceImpl implements FgMemberService {

    FgMemberRepository fgMemberRepository;

    @Autowired
    public FgMemberServiceImpl(FgMemberRepository fgMemberRepository) {
        this.fgMemberRepository = fgMemberRepository;
    }

    @Override
    public Boolean postFgMemberInfoService(BasicDTO.FgMemberInfoDTO dto) {
        try {
            fgMemberRepository.postFgMemberInfo(dto);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean getIsFgMemberInfoCorrectService(BasicDTO.FgMemberInfoDTO dto) {
        BasicDTO.FgMemberInfoDTO insertedData = fgMemberRepository.getFgMemberInfo(dto.getFgMemberId());

        return insertedData == dto ? true : false;
    }
}
