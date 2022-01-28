package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
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

    @PostMapping("post/fg-member-info")
    @ResponseBody
    public Boolean postFgMemberInfo(@RequestBody BasicDTO.FgMemberInfoDTO dto) {
        return fgMemberService.postFgMemberInfoService(dto);
    }

    @GetMapping("get/isFgMemberInfoCorrect")
    @ResponseBody
    public Boolean getIsFgMemberInfoCorrect(@RequestBody BasicDTO.FgMemberInfoDTO dto) {
        return fgMemberService.getIsFgMemberInfoCorrectService(dto);
    }

    @PutMapping("put/fg-member-info")
    @ResponseBody
    public Boolean putFgMemberInfo(@RequestBody BasicDTO.PutFgMemberInfoDTO dto) {
        return fgMemberService.putFgMemberInfoService(dto);
    }

    @GetMapping("get/fg-member-info-list-by-generation")
    @ResponseBody
    public List<BasicDTO.FgMemberInfoDTO> getFgMemberInfoListByGeneration(@RequestParam Integer generation) {
        return fgMemberService.getFgMemberInfoListByGenerationService(generation);
    }

    @GetMapping("get/fg-member-info-list-by-generation/table")
    @ResponseBody
    public List<BasicDTO.FgMemberTableInfoDTO> getFgMemberTableInfoListByGeneration(@RequestParam Integer generation) {
        return fgMemberService.getFgMemberTableInfoListByGenerationService(generation);
    }

    @GetMapping("get/fg-member-search-info-list-by-search")
    @ResponseBody
    public List<BasicDTO.FgMemberSearchInfoDTO> getFgMemberSearchInfoListBySearch(@RequestParam Integer generation, @RequestParam String position, @RequestParam String fgMemberName) {
        return fgMemberService.getFgMemberSearchInfoListBySearchService(new BasicDTO.FgMemberSearchInfoDTO(null, generation, null, fgMemberName, position));
    }

    @GetMapping("get/fg-member-info-list-by-search")
    @ResponseBody
    public List<BasicDTO.FgMemberTableInfoDTO> getFgMemberInfoListBySearch(@RequestParam Integer fgMemberId, @RequestParam Integer generation, @RequestParam String fgMemberName, @RequestParam String position, @RequestParam String state) {
        return fgMemberService.getFgMemberInfoListBySearchService(new BasicDTO.FgMemberInfoDTO(fgMemberId, generation, fgMemberName, position, state, null, null));
    }

    @PostMapping("delete/fg-member-info-by-fg-member-id-list")
    @ResponseBody
    public Boolean deleteLcInfoByLcIdxList(@RequestBody List<Integer> fgMemberIdList) {
        return fgMemberService.deleteFgMemberInfoByFgMemberIdListService(fgMemberIdList);
    }
}
