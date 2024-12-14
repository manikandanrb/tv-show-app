package com.tvshows.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tv_shows")
public class TvShow {
    @Id
    private Long id;
    
    private String name;
    
    @Column(length = 4000)
    private String summary;
    
    private String imageUrl;
    private String networkName;
    private String networkCountry;
    private String scheduleTime;
    private String scheduleDays;
    private String status;
    private String genres;
    private String premiered;
    private Double rating;
    private String language;
}