/*!
 * jQuery Floating Social Share Plugin v1.0.2
 * http://burakozdemir.co.uk
 * Copyright 2015 Burak Özdemir - <https://github.com/ozdemirburak>
 * Released under the MIT license
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "floatingSocialShare",
        defaults = {
            place: "top-left",
            counter: true,
            buttons: ["facebook", "twitter", "google-plus", "linkedin"],
            title: document.title,
            url: window.location.href,
            text: "share with ",
            description: $("meta[name='description']").attr("content"),
            popup_width: 400,
            popup_height: 300
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {

            // store to access in for each
            var $base = this;

            // check if user's place is defined in places
            if ($.inArray(this.settings.place, places) == -1)
                this.settings.place = this._defaults.place;

            // create element, attention : important tag in size
            var $template = $("<div>", {id: "floatingSocialShare"});
            var $child = $("<div>", {class: this.settings.place});
            $child.appendTo($template);

            // for each buttons, append
            $.each( this.settings.buttons, function( index, value ){
                $.each( networks, function( k, v ) {
                    if (value == k) {
                        var $component = $("<a>", { title: $base.settings.title, class: ""+v.className+" pop-upper"});
                        var $icon = $("<i>", {class: "m-top5 fa fa-" + value + ""}); // font-awesome here
                        var _href = v.url;
                        _href = _href.replace('{url}', $base.settings.url).replace('{title}', $base.settings.title).replace('{description}', $base.settings.description);
                        $component.attr("href", _href).attr("title", $base.settings.text + value).append($icon);
                        if($base.settings.counter === true){
                            setShareCount(value, $base.settings.url,$component);
                        }
                        $child.append($component);
                        return false; // end each networks if found
                    }
                });
            });

            // appended all the elements
            $template.appendTo(this.element);

            // get all the selected buttons
            var diss = $(this.element).find(".pop-upper");

            // set popups for buttons
            diss.on("click",function(event) {
                event.preventDefault();
                openPopUp($(this).attr("href"), $(this).attr("title"), $base.settings.popup_width, $base.settings.popup_height);
            });

            // check mobile css for buttons on load
            setMobileCss(diss);

            // check mobile css for buttons on resize
            $(window).resize(function() {
                setMobileCss(diss);
            });

        }

    });

    var networks = {
        "facebook" : { className: "facebook", url:"https://www.facebook.com/sharer/sharer.php?u={url}&t={title}" },
        "twitter": { className: "twitter", url:"https://twitter.com/home?status={url}" },
        "google-plus": { className: "google-plus", url: "https://plus.google.com/share?url={url}" },
        "linkedin":  { className: "linkedin", url: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}&source=" },
        "envelope":  { className: "envelope", url: "mailto:asd@asd.com?subject={url}" },
        "pinterest":  { className: "pinterest", url: "https://pinterest.com/pin/create%2Fbutton/?url={url}" },
        "stumbleupon":  { className: "stumbleupon", url: "https://www.stumbleupon.com/submit?url={url}&title={title}" }
    };

    var places = ["top-left", "top-right"];

    function openPopUp(url, title, width, height){
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((w / 2) - (width / 2)) +  10;
        var top = ((h / 2) - (height / 2)) +  50;
        var userWindow = window.open(url, title, 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
        userWindow.focus();
    }

    function shorten(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    function setMobileCss(objects){
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        if(w < 961) {
            $.each( objects, function(){
                $(this).css("width", 100 / objects.length + "%");
            });
        }
        else{
            $.each( objects, function(){
                $(this).removeAttr("style");
            });
        }
    }

    function setShareCount(network,url,$component){
        url = encodeURI(url);
        switch(network) {
            case "facebook":
                $.get('https://graph.facebook.com/'+url, function(data){
                    if(data.shares && data.shares > 0){
                        var $shareCount = $("<span>", {class: "shareCount"});
                        $shareCount.append(shorten(data.shares));
                        $component.append($shareCount);
                        $component.find("i").removeClass("m-top5");
                    }
                },'jsonp');
                break;
            case "twitter":
                $.get('https://urls.api.twitter.com/1/urls/count.json?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<span>", {class: "shareCount"});
                        $shareCount.append(shorten(data.count));
                        $component.append($shareCount);
                        $component.find("i").removeClass("m-top5");
                    }
                },'jsonp');
                break;
            case "linkedin":
                $.get('https://www.linkedin.com/countserv/count/share?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<span>", {class: "shareCount"});
                        $shareCount.append(shorten(data.count));
                        $component.append($shareCount);
                        $component.find("i").removeClass("m-top5");
                    }
                },'jsonp');
                break;
            case "pinterest":
                $.get('https://api.pinterest.com/v1/urls/count.json?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<span>", {class: "shareCount"});
                        $shareCount.append(shorten(data.count));
                        $component.append($shareCount);
                        $component.find("i").removeClass("m-top5");
                    }
                },'jsonp');
                break;
            case "google-plus":
                if (!window.services) {
                    window.services = {};
                    window.services.gplus = {}
                }
                window.services.gplus.cb = function (number) {
                    window.gplusShares = number
                };
                $.getScript('https://share.yandex.ru/gpp.xml?url=' + url+'&callback=?', function () {
                    if(window.gplusShares > 0) {
                        var $shareCount = $("<span>", {class: "shareCount"});
                        $shareCount.append(shorten(window.gplusShares));
                        $component.append($shareCount);
                        $component.find("i").removeClass("m-top5");
                    }
                });
                break;
            default:
                return -1;
        }
    }


    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );
