/*!
 * jQuery Floating Social Share Plugin v1.0.3
 * http://burakozdemir.co.uk
 * Copyright 2015 Burak Özdemir - <https://github.com/ozdemirburak>
 * Released under the MIT license
 */

;(function($, window, document, undefined) {

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

    function Plugin (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {

            if ($.inArray(this.settings.place, places) == -1)
                this.settings.place = this._defaults.place;

            var base = this,
                $template = $("<div>", { id: "floatingSocialShare" }),
                $child = $("<div>", { class: this.settings.place }).appendTo($template);

            $.each(this.settings.buttons, function(index, value) {
                $.each(networks, function(k, v) {
                    if (value === k) {
                        var $icon = $("<i>", {class: "m-top5 fa fa-" + value + ""}),
                            _href = v.url.replace('{url}', base.settings.url).replace('{title}', base.settings.title).replace('{description}', base.settings.description),
                            $component = $("<a>", { title: base.settings.title, class: v.className + " pop-upper"}).attr("href", _href).attr("title", base.settings.text + value).append($icon);
                        if(base.settings.counter === true)
                            setShareCount(value, base.settings.url, $component);
                        $child.append($component);
                        return false;
                    }
                });
            });

            $template.appendTo(this.element);

            var diss = $(this.element).find(".pop-upper");

            diss.on("click",function(event) {
                event.preventDefault();
                openPopUp($(this).attr("href"), $(this).attr("title"), base.settings.popup_width, base.settings.popup_height);
            });

            setMobileCss(diss);

            $(window).resize(function() {
                setMobileCss(diss);
            });

        }

    });

    var places = ["top-left", "top-right"],
        networks = {
            "facebook" : { className: "facebook", url:"https://www.facebook.com/sharer/sharer.php?u={url}&t={title}" },
            "twitter": { className: "twitter", url:"https://twitter.com/home?status={url}" },
            "google-plus": { className: "google-plus", url: "https://plus.google.com/share?url={url}" },
            "linkedin":  { className: "linkedin", url: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}&source=" },
            "envelope":  { className: "envelope", url: "mailto:asd@asd.com?subject={url}" },
            "pinterest":  { className: "pinterest", url: "https://pinterest.com/pin/create%2Fbutton/?url={url}" },
            "stumbleupon":  { className: "stumbleupon", url: "https://www.stumbleupon.com/submit?url={url}&title={title}" }
        };

    function openPopUp(url, title, width, height) {
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            left = (w / 2) - (width / 2) +  10,
            top  = (h / 2) - (height / 2) +  50;
        window.open(url, title, 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left).focus();
    }

    function shorten(num) {
        if (num >= 1000000000)
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        else if (num >= 1000000)
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        else if (num >= 1000)
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        else
            return num;
    }

    function setMobileCss(objects) {
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        $.each(objects, function(){
            if(w < 961)
                $(this).css("width", 100 / objects.length + "%");
            else
                $(this).removeAttr("style");
        });
    }

    function appendButtons(count, $component) {
        if(count && count > 0) {
            $component.append($("<span>", { class: "shareCount" }).append(shorten(count))).find("i").removeClass("m-top5");
        }
    }

    function setShareCount(network, url, $component) {
        url = encodeURI(url);
        switch(network) {
            case "facebook":
                $.get('https://graph.facebook.com/'+url, function(data) {
                    appendButtons(data.shares, $component);
                },'jsonp');
                break;
            case "twitter":
                $.get('https://urls.api.twitter.com/1/urls/count.json?url='+url+'&callback=?', function(data) {
                    appendButtons(data.count, $component);
                },'jsonp');
                break;
            case "linkedin":
                $.get('https://www.linkedin.com/countserv/count/share?url='+url+'&callback=?', function(data) {
                    appendButtons(data.count, $component);
                },'jsonp');
                break;
            case "pinterest":
                $.get('https://api.pinterest.com/v1/urls/count.json?url='+url+'&callback=?', function(data) {
                    appendButtons(data.count, $component);
                },'jsonp');
                break;
            case "google-plus":
                if (!window.services) {
                    window.services = {};
                    window.services.gplus = {}
                }
                window.services.gplus.cb = function(number) {
                    window.gplusShares = number
                };
                $.getScript('https://share.yandex.ru/gpp.xml?url=' + url+'&callback=?', function() {
                    appendButtons(window.gplusShares, $component);
                });
                break;
            default:
                return -1;
        }
    }

    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName))
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        });
        return this;
    };

})(jQuery, window, document);
