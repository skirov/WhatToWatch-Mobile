var app = app || {};

(function(a) {
    var containerElement = null;
    
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
        if (a.loadImages === undefined) {
            containerElement = e.view.element;
            checkConnection();
        }
        else {
            getTop();
            kendo.bind(e.view.element, topViewModel, kendo.ui.mobile);
        }
    }
    
    function onConfirm(button) {
        if (button == 1) {
            a.loadImages = true;
        }
        else {
            a.loadImages = false;
        }
        
        getTop();
        kendo.bind(containerElement, topViewModel, kendo.ui.mobile);
    }
    
    function checkConnection() {
        var networkState = navigator.network.connection.type;

        if (networkState != Connection.WIFI) {
            navigator.notification.confirm(
                'Do you want to load the images?',
                onConfirm,
                'You are not connected to a wifi network.',
                'Yes, No'
                );
        }
        else {
            a.loadImages = true;
            getTop();
            kendo.bind(containerElement, topViewModel, kendo.ui.mobile);
        }    
    }
    
    a.home = {
        init : init   
    };
}(app));