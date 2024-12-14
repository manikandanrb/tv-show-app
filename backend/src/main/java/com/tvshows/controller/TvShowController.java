package com.tvshows.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tvshows.model.TvShow;
import com.tvshows.service.TvShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
@Tag(name = "TV Shows", description = "TV Shows API")
public class TvShowController {
    private final TvShowService tvShowService;
    private static final Logger logger = LoggerFactory.getLogger(TvShowController.class);

    @GetMapping
    @Operation(summary = "Get all TV shows")
    public ResponseEntity<List<TvShow>> getAllShows() {
        return ResponseEntity.ok(tvShowService.getAllShows());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get TV show by ID")
    public ResponseEntity<TvShow> getShowById(@PathVariable Long id) {
        return ResponseEntity.ok(tvShowService.getShowById(id));
    }

    @PostMapping("/process")
    @Operation(summary = "Process a TV show title")
    public ResponseEntity<String> processShowTitle(@RequestPart("file") MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty()) {
                    logger.info("Movie titile {}", line);
                    tvShowService.processShowTitle(line);
                }
            }
            logger.info("Successfully processed.");
            return ResponseEntity.ok("Successfully processed");

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to process the file: " + e.getMessage());
        }
    }
}