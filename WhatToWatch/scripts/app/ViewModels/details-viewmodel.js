var app = app || {};

(function(a) {
    var detailsViewModel = kendo.observable({
        movie: {},
        similar: []
    });
        
    function getMovieDetails(movieId) {        
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
            
            app.data.movieCast(movieId).then(function(cast) {
                $("#details-cast").kendoMobileListView({
                    dataSource: kendo.data.DataSource.create({data: cast.cast, group: "name"}),
                    template: "<span class=\"medium\">Plays - ${characters.join()}</span>",
                    fixedHeaders: false
                }).parent().css("padding", "0");
            }, function() {
                navigator.notification.alert(
                    'An error occured.',
                    redirectToHomes,
                    "We'll redirect you to the homepage.",
                    'Ok.'
                    );
        
                function redirectToHome() {
                    window.location = "../index.html"
                }
            });
            
            app.data.movieClips(movieId).then(function(clips) {
                $("#details-clips").kendoMobileListView({
                    dataSource: kendo.data.DataSource.create({data: clips.clips, group: "title"}),
                    template: 
                    "<p class=\"medium pull-left\"><a href=\"${links.alternate}\">View at RottenTomatoes</a> - ${Math.round(duration / 60)}min </p>",
                    fixedHeaders: false
                }).parent().css("padding", "0");
                ;
            }, function() {
                navigator.notification.alert(
                    'An error occured.',
                    redirectToHomes,
                    "We'll redirect you to the homepage.",
                    'Ok.'
                    );
        
                function redirectToHome() {
                    window.location = "../index.html"
                }
            });
            
            app.data.movieSimilar(movieId).then(function(similar) {
                var moviesModel = [];
                for (var i = 0; i < similar.movies.length; i++) {
                    moviesModel.push({
                        id: similar.movies[i].id,
                        title: similar.movies[i].title,
                        year: similar.movies[i].year,
                        posters: {
                            thumbnail : similar.movies[i].posters.thumbnail
                        },
                        ratings: {
                            audience_score: similar.movies[i].ratings.audience_score
                        }
                    });
                }
                detailsViewModel.set("similar", moviesModel);
            }, function() {
                navigator.notification.alert(
                    'An error occured.',
                    redirectToHomes,
                    "We'll redirect you to the homepage.",
                    'Ok.'
                    );
        
                function redirectToHome() {
                    window.location = "../index.html"
                }
            });
        }, function() {
            navigator.notification.alert(
                'An error occured.',
                redirectToHomes,
                "We'll redirect you to the homepage.",
                'Ok.'
                );
        
            function redirectToHome() {
                window.location = "../index.html"
            }
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
    
    function postComment() {
        console.log("sad");
    }
    
    function closeModalViewComment() {
        $("#modalview-comment").kendoMobileModalView("close");
    }
    
    a.details = {
        init : init,
        asd: asd,
        closeModalViewComment: closeModalViewComment
    };
}(app));