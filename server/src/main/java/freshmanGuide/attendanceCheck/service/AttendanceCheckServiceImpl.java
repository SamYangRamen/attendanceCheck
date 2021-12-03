package freshmanGuide.attendanceCheck.service;

import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Service
public class AttendanceCheckServiceImpl implements AttendanceCheckService {

    private static final String DATE_FORMAT = "yyyy-MM-DD";

    @Override
    public Date getTimeStamp() {
        final SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        final String utcTime = sdf.format(new Date());

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
            return (Date)dateFormat.parse(utcTime);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
