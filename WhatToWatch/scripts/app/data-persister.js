var app = app || {};

(function(a) {
    
    function topBoxOffice() {
        return httpRequest.getJSON(app.boxOfficeUrl + "&limit=3");
    }
    
    function topInTheaters(){
        return httpRequest.getJSON(app.inTheatersUrl + "&page_limit=3");
    }
    
    function topUpcoming(){
        return httpRequest.getJSON(app.upcomingUrl + "&page_limit=3");
    }
    
    function searchMovies(searchQuery){
        return httpRequest.getJSON(app.searchUrl + "&q=" + searchQuery);
    }
    
    function movieDetils(movieId){
        return httpRequest.getJSON(app.detailsUrl + movieId + ".json?apiKey=" + app.apiKey);
    }
    
    function movieCast(movieId){
        return httpRequest.getJSON(app.detailsUrl + movieId + "/cast.json?apiKey=" + app.apiKey);
    }
    
    function movieClips(movieId){
        return httpRequest.getJSON(app.detailsUrl + movieId + "/clips.json?apiKey=" + app.apiKey);
    }
    
    function movieSimilar(movieId){
        return httpRequest.getJSON(app.detailsUrl + movieId + "/similar.json?apiKey=" + app.apiKey);
    }
    
    function moreBoxOffice(){
        return httpRequest.getJSON(app.boxOfficeUrl + "&limit=50");
    }
    
    function moreInTheaters(){
        return httpRequest.getJSON(app.inTheatersUrl + "&page_limit=50");
    }
    
    function moreUpcoming(){
        return httpRequest.getJSON(app.upcomingUrl + "&page_limit=50");
    }
    
    a.data = {
        topBoxOffice:topBoxOffice,
        topInTheaters:topInTheaters,
        topUpcoming:topUpcoming,
        searchMovies:searchMovies,
        movieDetils:movieDetils,
        movieCast: movieCast,
        movieClips: movieClips,
        movieSimilar: movieSimilar,
        moreBoxOffice: moreBoxOffice,
        moreInTheaters: moreInTheaters,
        moreUpcoming: moreUpcoming
    };
}(app));