package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.DTO.FgMemberDTO;
import freshmanGuide.attendanceCheck.service.FgMemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class FgMemberController {

    FgMemberService fgMemberService;

    @Autowired
    public FgMemberController(FgMemberService fgMemberService) {
        this.fgMemberService = fgMemberService;
    }

    @PostMapping("fg-member-info")
    @ResponseBody
    public Boolean postFgMemberInfo(@RequestBody FgMemberDTO.FgMemberInfoDTO dto) {
        return fgMemberService.postFgMemberInfoService(dto);
    }

    @PutMapping("fg-member-info")
    @ResponseBody
    public Boolean putFgMemberInfo(@RequestBody FgMemberDTO.PutFgMemberInfoDTO dto) {
        return fgMemberService.putFgMemberInfoService(dto);
    }

    @GetMapping("fg-member-info/table")
    @ResponseBody
    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGeneration(@RequestParam Integer generation) {
        return fgMemberService.getFgMemberTableInfoListByGenerationService(generation);
    }

    @GetMapping("fg-member-info/search/search")
    @ResponseBody
    public List<FgMemberDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearch(@RequestParam Integer generation, @RequestParam String position, @RequestParam String fgMemberName) {
        return fgMemberService.getFgMemberSearchInfoListBySearchService(new FgMemberDTO.FgMemberSearchInfoDTO(null, generation, null, fgMemberName, position));
    }

    @GetMapping("fg-member-info/search")
    @ResponseBody
    public List<FgMemberDTO.FgMemberTableInfoDTO> getFgMemberInfoListBySearch(@RequestParam Integer fgMemberId, @RequestParam Integer generation, @RequestParam String fgMemberName, @RequestParam String position, @RequestParam String state) {
        return fgMemberService.getFgMemberInfoListBySearchService(new FgMemberDTO.FgMemberInfoDTO(fgMemberId, generation, fgMemberName, position, state, null, null));
    }

    @PostMapping("fg-member-info/fg-member-id")
    @ResponseBody
    public Boolean deleteLcInfoByLcIdxList(@RequestBody List<Integer> fgMemberIdList) {
        return fgMemberService.deleteFgMemberInfoByFgMemberIdListService(fgMemberIdList);
    }
}
