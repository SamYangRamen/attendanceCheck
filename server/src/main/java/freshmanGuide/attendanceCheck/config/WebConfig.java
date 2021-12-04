package freshmanGuide.attendanceCheck.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Global Cross Origin
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // addMapping: CORS를 적용할 URL 패턴
        // allowedOrigins: 허용 Origin
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "PUT", "POST", "DELETE");
    }

}