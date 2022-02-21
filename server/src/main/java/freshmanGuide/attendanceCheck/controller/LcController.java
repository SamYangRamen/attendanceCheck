package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.LcDTO;
import freshmanGuide.attendanceCheck.service.LcService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class LcController {

    LcService lcService;

    @Autowired
    public LcController(LcService lcService) {
        this.lcService = lcService;
    }

    @PostMapping("/lc-info/range")
    @ResponseBody
    public Boolean postLcRange(@RequestBody LcDTO.PostLcRangeDTO dto) {
        return lcService.postLcRangeService(dto);
    }

    @GetMapping("/lc-info/fg-member-name/search")
    @ResponseBody
    public List<LcDTO.LcInfoWithFgMemberNameDTO> getLcInfoListBySearch(@RequestParam Integer year, @RequestParam String lc, @RequestParam String fgMemberName1, @RequestParam String fgMemberName2) {
        return lcService.getLcListInfoBySearchService(year, lc, fgMemberName1, fgMemberName2);
    }

    @PutMapping("/lc-info")
    public Boolean putLcInfo(@RequestBody LcDTO.PutLcInfoDTO dto) {
        return lcService.putLcInfoService(dto);
    }

    @PostMapping("/lc-info/lc-idx")
    @ResponseBody
    public Boolean deleteLcInfoByLcIdxList(@RequestBody List<Integer> lcIdxList) {
        return lcService.deleteLcInfoByLcIdxListService(lcIdxList);
    }

    @GetMapping("/lc-info/fk/table")
    @ResponseBody
    public List<LcDTO.LcFKTableDTO> getLcFKTableInfoListByFgMemberIdAndYear(@RequestParam Integer fgMemberId, @RequestParam Integer year) {
        return lcService.getLcFKTableInfoListByFgMemberIdAndYearService(fgMemberId, year);
    }
}
