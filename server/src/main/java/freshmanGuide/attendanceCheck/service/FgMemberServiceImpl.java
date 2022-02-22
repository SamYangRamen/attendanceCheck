package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import freshmanGuide.attendanceCheck.repository.FgMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class FgMemberServiceImpl implements FgMemberService {

    FgMemberRepository fgMemberRepository;

    @Autowired
    public FgMemberServiceImpl(FgMemberRepository fgMemberRepository) {
        this.fgMemberRepository = fgMemberRepository;
    }

    @Override
    public Boolean postFgMemberInfoService(FgMemberDTO.FgMemberInfoDTO dto) {
        try {
            fgMemberRepository.postFgMemberInfo(dto);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean putFgMemberInfoService(FgMemberDTO.PutFgMemberInfoDTO dto) {
        return fgMemberRepository.putFgMemberInfo(dto);
    }

    @Override
    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGenerationService(Integer generation) {
        try {
            return fgMemberRepository.getFgMemberTableInfoListByGeneration(generation);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<FgMemberDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearchService(FgMemberDTO.FgMemberSearchInfoDTO dto) {
        try {
            return fgMemberRepository.getFgMemberSearchInfoListBySearch(dto);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListBySearchService(FgMemberDTO.FgMemberInfoDTO dto) {
        try {
            return fgMemberRepository.getFgMemberTableInfoListBySearch(dto);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean deleteFgMemberInfoByFgMemberIdListService(List<Integer> fgMemberIdList) {
        try {
            for(Integer fgMemberId : fgMemberIdList) {
                fgMemberRepository.deleteFgMemberInfoByFgMemberId(fgMemberId);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
