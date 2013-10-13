var app = app || {};

(function(a) {
    var searchViewModel = kendo.observable({
        movies: [],
        getSearchResults: getSearchResults
    });
    
    function getSearchResults(e) {
        var queryString = $("#search-movie-input").val();

        app.data.searchMovies(queryString).then(function(result) {
            var moviesModel = [];
            for (var i = 0; i < result.movies.length; i++) {
                var moviePoster = result.movies[i].posters.thumbnail;
                
                if(moviePoster == "http://images.rottentomatoescdn.com/images/redesign/poster_default.gif"){
                    moviePoster = "styles/images/no-poster.png";
                }
                
                moviesModel.push({
                    id: result.movies[i].id,
                    title: result.movies[i].title,
                    year: result.movies[i].year,
                    posters: {
                        thumbnail : moviePoster
                    },
                    ratings: {
                        audience_score: result.movies[i].ratings.audience_score
                    }
                });
            }
            
            searchViewModel.set("movies", moviesModel);
        });
    }
    
    function init(e) {
        console.log(e.view.params.id);
        kendo.bind(e.view.element, searchViewModel, kendo.ui.mobile);
    }
    
    a.search = {
        init : init   
    };
}(app));