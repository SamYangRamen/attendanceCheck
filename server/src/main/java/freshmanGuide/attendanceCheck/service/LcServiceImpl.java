package freshmanGuide.attendanceCheck.service;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
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
    public Boolean postLcRangeService(BasicDTO.PostLcRangeDTO dto) {
        try {
            for (Integer i = dto.getStartLcNumber(); i <= dto.getEndLcNumber(); i++) {
                lcRepository.postLc(new BasicDTO.LcDTO(dto.getYear(), dto.getLcDepartment().toUpperCase() + String.format("%02d", i)));
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
    public List<BasicDTO.LcInfoDTO> getLcListInfoByYearService(Integer year) {
        try {
            return lcRepository.getLcInfoListByYear(year);
        } catch(Exception e) {
            return null;
        }
    }
}
