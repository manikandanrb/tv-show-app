package com.tvshows;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TvShowsApplication {
    public static void main(String[] args) {
        SpringApplication.run(TvShowsApplication.class, args);
    }
}