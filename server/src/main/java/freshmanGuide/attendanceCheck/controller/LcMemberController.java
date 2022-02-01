package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.LcMemberDTO;
import freshmanGuide.attendanceCheck.service.LcMemberService;
import freshmanGuide.attendanceCheck.service.LcService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class LcMemberController {

    LcMemberService lcMemberService;

    @Autowired
    public LcMemberController(LcMemberService lcMemberService) {
        this.lcMemberService = lcMemberService;
    }

    @PostMapping("post/lc-member-info")
    @ResponseBody
    public Boolean postLcMemberInfoService(@RequestBody LcMemberDTO.LcMemberInfoDTO dto) {
        return lcMemberService.postLcMemberInfoService(dto);
    }

    @GetMapping("get/lc-member-table-info-list-by-search")
    @ResponseBody
    public List<LcMemberDTO.LcMemberTableInfoDTO> getLcMemberTableInfoListBySearch(@RequestParam Integer year, @RequestParam String lc, @RequestParam String department, @RequestParam String gender, @RequestParam String lcMemberName) {
        return lcMemberService.getLcMemberTableInfoListBySearchService(new LcMemberDTO.LcMemberTableInfoDTO(null, year, lc, department, gender, lcMemberName, null));
    }

    @PostMapping("delete/lc-member-info-by-lc-member-id-list")
    @ResponseBody
    public Boolean deleteLcMemberInfoByLcMemberIdList(List<Integer> lcMemberIdList) {
        return lcMemberService.deleteLcMemberInfoByLcMemberIdListService(lcMemberIdList);
    }
}
