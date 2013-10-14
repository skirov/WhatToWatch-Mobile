var app = app || {};

(function(a) {    
    function moreBoxOffice() {
        app.data.moreBoxOffice().then(function(result) {
            var moviesModel = [];
            for (var i = 0; i < result.movies.length; i++) {
                var moviePoster = result.movies[i].posters.thumbnail;
                
                if (moviePoster == "http://images.rottentomatoescdn.com/images/redesign/poster_default.gif") {
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
            
            var dataSource = new kendo.data.DataSource({
                data: moviesModel,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSize: 10
            });

            $("#more-box-office").kendoMobileListView({
                dataSource: dataSource,
                template: $("#endless-template").text(),
                endlessScroll: true
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
    
    function init() {
        moreBoxOffice();
    }
    
    a.boxOffice = {
        init: init
    }
}(app));