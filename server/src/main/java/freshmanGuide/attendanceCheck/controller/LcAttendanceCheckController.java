package freshmanGuide.attendanceCheck.controller;

import freshmanGuide.attendanceCheck.DTO.LcAttendanceCheckDTO;
import freshmanGuide.attendanceCheck.service.LcAttendanceCheckService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class LcAttendanceCheckController {

    LcAttendanceCheckService lcAttendanceCheckService;

    @Autowired
    public LcAttendanceCheckController(LcAttendanceCheckService lcAttendanceCheckService) {
        this.lcAttendanceCheckService = lcAttendanceCheckService;
    }

    @GetMapping("lc-attendance-check-info/table/search")
    @ResponseBody
    public List<LcAttendanceCheckDTO.LcAttendanceCheckTableInfoDTO> getLcAttendanceCheckTableInfoBySearch(@RequestParam Integer year, @RequestParam String lc, @RequestParam Integer eventIdx) {
        return lcAttendanceCheckService.getLcAttendanceCheckTableInfoBySearchService(year, lc, eventIdx);
    }

    @DeleteMapping("lc-attendance-check-info")
    @ResponseBody
    public Boolean deleteLcAttendanceCheckInfo(@RequestParam Integer lcMemberId, @RequestParam Integer eventIdx) {
        return lcAttendanceCheckService.deleteLcAttendanceCheckInfoService(lcMemberId, eventIdx);
    }

    @PostMapping("lc-attendance-check-info")
    @ResponseBody
    public Boolean postLcAttendanceCheckTableInfo(@RequestBody LcAttendanceCheckDTO.LcAttendanceCheckInfoDTO dto) {
        return lcAttendanceCheckService.postLcAttendanceCheckInfoService(dto);
    }

    @PutMapping("lc-attendance-check-info")
    @ResponseBody
    public Boolean putLcAttendanceCheckTableInfo(@RequestBody LcAttendanceCheckDTO.PutLcAttendanceCheckInfoDTO dto) {
        return lcAttendanceCheckService.putLcAttendanceCheckInfoService(dto);
    }
}
