package com.ssafy.codearena.dto;


public class UserDto {

    String userId;
    Integer rating;
    String gameMode;

    String lang;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getGameMode() {
        return gameMode;
    }

    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId='" + userId + '\'' +
                ", rating=" + rating +
                ", gameMode='" + gameMode + '\'' +
                ", lang='" + lang + '\'' +
                '}';
    }
}
