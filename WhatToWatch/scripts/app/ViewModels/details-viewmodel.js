var app = app || {};

(function(a) {
    var detailsViewModel = kendo.observable({
        movie: {},
        cast: []
    });
        
    function getMovieDetails(movieId) {
        //da probvam da go bindna s atributi za da ne se smalqva, za6toto sega suzdava listview v listview i t.n
        app.data.movieCast(movieId).then(function(cast) {
            $("#details-cast").kendoMobileListView({
                dataSource: kendo.data.DataSource.create({data: cast.cast, group: "name"}),
                template: "${characters.join()}",
                fixedHeaders: false
            });
        });
        
        app.data.movieDetils(movieId).then(function(movie) {
            var moviesModel = {
                id: movie.id,
                title: movie.title + " (" + movie.year + ")",
                poster: movie.posters.profile,
                ratings: {
                    critics_rating: movie.ratings.critics_rating,
                    critics_score: movie.ratings.critics_score,
                    audience_rating: movie.ratings.audience_rating,
                    audience_score: movie.ratings.audience_score
                },
                description: movie.synopsis,
                release_dates: {
                    theater: movie.release_dates.theater,
                    dvd: movie.release_dates.dvd
                },
                genresAndDuration: movie.runtime + "min of " + movie.genres[0],
                imdbLink: "http://www.imdb.com/title/tt" + movie.alternate_ids.imdb + "/"
            };
            
            detailsViewModel.set("movie", moviesModel);
        });
    }
    
    function init(e) {
        var listviews = this.element.find("ul.km-listview");
        
        $("#select-details-option").kendoMobileButtonGroup({
            select: function() {
                listviews.hide()
                .eq(this.selectedIndex)
                .show();
            },
            index: 0
        });
        
        kendo.bind(e.view.element, detailsViewModel, kendo.ui.mobile);
        
        var movieId = e.view.params.id;
        getMovieDetails(movieId);
    }
    
    a.details = {
        init : init   
    };
}(app));