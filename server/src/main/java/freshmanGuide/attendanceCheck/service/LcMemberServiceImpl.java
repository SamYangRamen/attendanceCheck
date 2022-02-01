package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;
import freshmanGuide.attendanceCheck.repository.LcMemberRepository;
import freshmanGuide.attendanceCheck.repository.LcRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LcMemberServiceImpl implements LcMemberService {

    LcMemberRepository lcMemberRepository;

    @Autowired
    public LcMemberServiceImpl(LcMemberRepository lcMemberRepository) {
        this.lcMemberRepository = lcMemberRepository;
    }

    @Override
    public Boolean postLcMemberInfoService(LcMemberDTO.LcMemberInfoDTO dto) {
        try {
            lcMemberRepository.postLcMemberInfo(dto);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<LcMemberDTO.LcMemberTableInfoDTO> getLcMemberTableInfoListBySearchService(LcMemberDTO.LcMemberTableInfoDTO dto) {
        try {
            return lcMemberRepository.getLcMemberTableInfoListBySearch(dto);
        }  catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean deleteLcMemberInfoByLcMemberIdListService(List<Integer> lcMemberIdList) {
        try {
            for(Integer lcMemberId : lcMemberIdList) {
                lcMemberRepository.deleteLcMemberInfoByLcMemberId(lcMemberId);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
