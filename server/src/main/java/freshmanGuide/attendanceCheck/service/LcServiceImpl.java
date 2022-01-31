package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.repository.LcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LcServiceImpl implements LcService {

    LcRepository lcRepository;

    @Autowired
    public LcServiceImpl(LcRepository lcRepository) {
        this.lcRepository = lcRepository;
    }

    @Override
    public Boolean postLcRangeService(LcDTO.PostLcRangeDTO dto) {
        try {
            for (Integer i = dto.getStartLcNumber(); i <= dto.getEndLcNumber(); i++) {
                lcRepository.postLc(new LcDTO.LcFKDTO(dto.getYear(), dto.getLcDepartment().toUpperCase() + String.format("%02d", i)));
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<String> getLcListByYearService(Integer year) {
        try {
            return lcRepository.getLcListByYear(year);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<LcDTO.LcInfoDTO> getLcListInfoByYearService(Integer year) {
        try {
            return lcRepository.getLcInfoListByYear(year);
        } catch(Exception e) {
            return null;
        }
    }

    @Override
    public List<LcDTO.LcInfoWithFgMemberNameDTO> getLcListInfoBySearchService(Integer year, String lc, String fgMemberName1, String fgMemberName2) {
        try {
            return lcRepository.getLcListInfoBySearch(new LcDTO.LcSearchInfoDTO(year, lc, fgMemberName1, fgMemberName2));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean putLcInfoService(LcDTO.PutLcInfoDTO dto) {
        try {
            lcRepository.updateFgMemberNameByFgMemberId(dto);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean deleteLcInfoByLcIdxListService(List<Integer> lcIdxList) {
        try {
            for(Integer lcIdx : lcIdxList) {
                lcRepository.deleteLcInfoByLcIdx(lcIdx);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
