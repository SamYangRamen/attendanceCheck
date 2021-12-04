package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.BasicDTO;
import freshmanGuide.attendanceCheck.service.FgMemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}
