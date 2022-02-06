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

    @PostMapping("post/lc-info")
    @ResponseBody
    public Boolean postLcRange(@RequestBody LcDTO.PostLcRangeDTO dto) {
        return lcService.postLcRangeService(dto);
    }

    @GetMapping("get/lc-list-by-year")
    @ResponseBody
    public List<String> getLcListByYear(@RequestParam Integer year) {
        return lcService.getLcListByYearService(year);
    }

    @GetMapping("get/lc-info-list-by-year")
    @ResponseBody
    public List<LcDTO.LcInfoDTO> getLcInfoListByYear(@RequestParam Integer year) {
        return lcService.getLcListInfoByYearService(year);
    }

    @GetMapping("get/lc-info-list-by-search")
    @ResponseBody
    public List<LcDTO.LcInfoWithFgMemberNameDTO> getLcInfoListBySearch(@RequestParam Integer year, @RequestParam String lc, @RequestParam String fgMemberName1, @RequestParam String fgMemberName2) {
        return lcService.getLcListInfoBySearchService(year, lc, fgMemberName1, fgMemberName2);
    }

    @PutMapping("put/lc-info")
    public Boolean putLcInfo(@RequestBody LcDTO.PutLcInfoDTO dto) {
        return lcService.putLcInfoService(dto);
    }

    @PostMapping("delete/lc-info-by-lc-idx-list")
    @ResponseBody
    public Boolean deleteLcInfoByLcIdxList(@RequestBody List<Integer> lcIdxList) {
        return lcService.deleteLcInfoByLcIdxListService(lcIdxList);
    }

    @GetMapping("get/lc-fk-table-info-list-by-fg-member-id-and-year")
    @ResponseBody
    public List<LcDTO.LcFKTableDTO> getLcFKTableInfoListByFgMemberIdAndYear(@RequestParam Integer fgMemberId, @RequestParam Integer year) {
        return lcService.getLcFKTableInfoListByFgMemberIdAndYearService(fgMemberId, year);
    }
}
