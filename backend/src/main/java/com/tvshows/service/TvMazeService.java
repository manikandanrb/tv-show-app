package com.tvshows.service;

import com.tvshows.dto.TvMazeShowResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TvMazeService {
    private final RestTemplate restTemplate;
    private final String baseUrl;

    public TvMazeService(
            RestTemplate restTemplate,
            @Value("${tvmaze.api.base-url}") String baseUrl
    ) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    public TvMazeShowResponse searchShow(String query) {
        String url = String.format("%s/singlesearch/shows?q=%s", baseUrl, query);
        return restTemplate.getForObject(url, TvMazeShowResponse.class);
    }
}