var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        //app.servicesBaseUrl = "http://localhost:62354/api/";
        app.baseUrl = "http://api.rottentomatoes.com/api/public/v1.0/";
        app.apiKey = "zysk6raxaduxuafbgvfdgmcs";
        app.boxOfficeUrl =  app.baseUrl + "lists/movies/box_office.json?apikey=" + app.apiKey;
        app.inTheatersUrl =  app.baseUrl + "lists/movies/in_theaters.json?apikey=" + app.apiKey;
        app.upcomingUrl =  app.baseUrl + "lists/movies/upcoming.json?apikey=" + app.apiKey;
        app.searchUrl =  app.baseUrl + "movies.json?apikey=" + app.apiKey;
        app.detailsUrl =  app.baseUrl + "movies/";
        
        var kendoApp = new kendo.mobile.Application(document.body, { 
            initial: "#home-view",
            transition: "slide"
        });
    });    
}());