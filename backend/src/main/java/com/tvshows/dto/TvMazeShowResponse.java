package com.tvshows.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TvMazeShowResponse {
    private Long id;
    private String name;
    private String summary;
    private ImageDto image;
    private NetworkDto network;
    private ScheduleDto schedule;
    private String status;
    private List<String> genres;
    private String premiered;
    private RatingDto rating;
    private String language;
}