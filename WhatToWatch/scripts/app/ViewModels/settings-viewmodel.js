var app = app || {};

(function(a) {
    function showImages() {
        if(a.loadImages === true){
            a.loadImages = false;
        }
        else{
            a.loadImages = true;
        }
    }
    
    function init(e) {
        
        $("#show-images-switch").kendoMobileSwitch({
            checked: a.loadImages,
            onLabel: "YES",
            offLabel: "NO"
        });
    }
    
    a.settings = {
        init: init,
        showImages: showImages
    }
}(app));