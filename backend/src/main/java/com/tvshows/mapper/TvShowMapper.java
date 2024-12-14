package com.tvshows.mapper;

import com.tvshows.dto.TvMazeShowResponse;
import com.tvshows.model.TvShow;
import org.springframework.stereotype.Component;

@Component
public class TvShowMapper {
    public TvShow mapToTvShow(TvMazeShowResponse response) {
        if (response == null) {
            return null;
        }

        TvShow show = new TvShow();
        show.setId(response.getId());
        show.setName(response.getName());
        show.setSummary(response.getSummary());
        
        if (response.getImage() != null) {
            show.setImageUrl(response.getImage().getOriginal());
        }
        
        if (response.getNetwork() != null) {
            show.setNetworkName(response.getNetwork().getName());
            if (response.getNetwork().getCountry() != null) {
                show.setNetworkCountry(response.getNetwork().getCountry().getName());
            }
        }
        
        if (response.getSchedule() != null) {
            show.setScheduleTime(response.getSchedule().getTime());
            show.setScheduleDays(String.join(",", response.getSchedule().getDays()));
        }
        
        show.setStatus(response.getStatus());
        
        if (response.getGenres() != null) {
            show.setGenres(String.join(",", response.getGenres()));
        }
        
        show.setPremiered(response.getPremiered());
        
        if (response.getRating() != null) {
            show.setRating(response.getRating().getAverage());
        }
        
        show.setLanguage(response.getLanguage());
        
        return show;
    }
}