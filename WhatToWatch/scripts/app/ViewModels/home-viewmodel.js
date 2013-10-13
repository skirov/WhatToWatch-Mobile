var app = app || {};

(function(a) {
    var topViewModel = kendo.observable({
        boxOffice: [],
        inTheaters: [],
        upcoming: []
    });
    
    function getTop() {
        
        //box office
        app.data.topBoxOffice().then(function(result) {
            var moviesModel = [];
            for (var i = 0; i < result.movies.length; i++) {
                moviesModel.push({
                    id: result.movies[i].id,
                    title: result.movies[i].title,
                    year: result.movies[i].year,
                    posters: {
                        thumbnail : result.movies[i].posters.thumbnail
                    },
                    ratings: {
                        audience_score: result.movies[i].ratings.audience_score
                    }
                });
            }
            
            topViewModel.set("boxOffice", moviesModel);
        });
        
        //in theaters
        app.data.topInTheaters().then(function(result) {
            var moviesModel = [];
            for (var i = 0; i < result.movies.length; i++) {
                moviesModel.push({
                    id: result.movies[i].id,
                    title: result.movies[i].title,
                    year: result.movies[i].year,
                    posters: {
                        thumbnail : result.movies[i].posters.thumbnail
                    },
                    ratings: {
                        audience_score: result.movies[i].ratings.audience_score
                    }
                });
            }
            
            topViewModel.set("inTheaters", moviesModel);
        });
        
        //in theaters
        app.data.topUpcoming().then(function(result) {
            var moviesModel = [];
            for (var i = 0; i < result.movies.length; i++) {
                moviesModel.push({
                    id: result.movies[i].id,
                    title: result.movies[i].title,
                    year: result.movies[i].year,
                    posters: {
                        thumbnail : result.movies[i].posters.thumbnail
                    },
                    ratings: {
                        audience_score: result.movies[i].ratings.audience_score
                    }
                });
            }
            
            topViewModel.set("upcoming", moviesModel);
        });
    }
    
    function init(e) {
        kendo.bind(e.view.element, topViewModel, kendo.ui.mobile);
        getTop();
    }
    
    a.home = {
        init : init   
    };
}(app));