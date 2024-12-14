package com.tvshows.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tvshows.dto.TvMazeShowResponse;
import com.tvshows.model.TvShow;
import com.tvshows.repository.TvShowRepository;
import com.tvshows.mapper.TvShowMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class TvShowService {
    private final TvShowRepository tvShowRepository;
    private final TvMazeService tvMazeService;
    private final TvShowMapper tvShowMapper;
    private static final Logger logger = LoggerFactory.getLogger(TvShowService.class);

    public List<TvShow> getAllShows() {
        return tvShowRepository.findAll();
    }

    public TvShow getShowById(Long id) {
        return tvShowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));
    }

    public void processShowTitle(String title) {
        try {
            // Call the tvMazeService to search for the show by title
            TvMazeShowResponse response = tvMazeService.searchShow(title);
            
            // Map the response to a TvShow object
            TvShow show = tvShowMapper.mapToTvShow(response);

            // Save the TvShow object to the repository
            tvShowRepository.save(show);

        } catch (Exception e) {
            // Catch any exception that may occur and log it
            logger.error("Error occurred while processing show title: {}", title, e);
        }
    }
}