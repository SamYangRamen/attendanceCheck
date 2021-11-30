package freshmanGuide.attendanceCheck.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    @PostMapping("post/fgMember")
    @ResponseBody
    public boolean insertFGMemberInfo() {
        return true;
    }

    @PostMapping("post/lcMember")
    @ResponseBody
    public boolean insertLcMemberInfo() {
        return true;
    }
}
