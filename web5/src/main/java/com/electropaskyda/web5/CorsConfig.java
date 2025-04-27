package com.electropaskyda.web5;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Разрешить все пути
                .allowedOrigins("*") // Разрешить запросы с этого origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Разрешенные HTTP-методы
                .allowedHeaders("*") // Разрешить все заголовки
                .allowCredentials(false); // Разрешить передачу куки и авторизационных данных
    }
}