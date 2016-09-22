jQuery Floating Social Share
================================

[![npm][npm-image]][npm-url] [![downloads][downloads-image]][npm-url]

Simple jQuery floating social media sharer plugin works with Font-Awesome. Currently supported platforms are Facebook, Twitter, Linkedin, Pinterest, Google Plus, Reddit, Tumblr, VK and Odnoklassniki with counter feature, StumbleUpon and Email without counter feature.

## Getting Started

Install via bower and include from your `bower_components` folder.

`bower install --save jquery-floating-social-share`

Or install via npm and include from your `node_modules` folder

`npm install --save jquery-floating-social-share`

Or install via <a target="_blank" href="https://github.com/ozdemirburak/jquery-floating-social-share/archive/master.zip">zip</a>, then include jQuery and Font-Awesome and the plugin on a page.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="dist/jquery.floating-social-share.min.css" />
<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="dist/jquery.floating-social-share.min.js"></script>
```

Finally, call the `floatingSocialShare` method on body with your custom options.

```html
<script>
	$("body").floatingSocialShare({
 		buttons: ["facebook", "twitter", "google-plus"],
        text: "share with: "
	});
</script>
```

To make the social share buttons appear next to the specific content, instead of the body, reference with selector.

```html
<script>
	$(".content").floatingSocialShare({
 		buttons: ["facebook", "twitter", "google-plus"],
        text: "share with: ",
        place: "content-left"
	});
</script>
```

#### [Live Demo](http://onlinealarmkur.com)

## Options

* **place**: `String` *(`top-left` by default)* Set the position of the box. Currently: `content-left`, `top-left` and `top-right` are available.
* **counter**: `Boolean` *(`true` by default)* Set to `false` to hide counters that appear below the buttons.
* **twitter_counter**: `Boolean` *(`false` by default)* Set to `true` to show twitter counter, but you also need to register to [Open Share Count](https://opensharecount.com/) since Twitter API does not provide counters without an API key.
* **buttons**: `Array` *(`["facebook", "twitter", "google-plus"]` by default)* Sets the social buttons for sharing. Available ones are `envelope`, `facebook`, `google-plus`, `linkedin`, `odnoklassniki`, `pinterest`, `reddit`, `stumbleupon`, `tumblr`, `twitter` and `vk`  
* **title**: `String` *(`document.title` by default)* Sets the title for the share message.
* **url**: `String` *(`window.location.href` by default)* Sets the url for the share message.
* **text**: `String` *(`share with` by default)* Sets the share title for the social buttons.
* **description**: `String` *(`$('meta[name="description"]').attr("content")` by default)* Sets the description for the share.
* **media**: `String` *(`$('meta[property="og:image"]').attr("content")` by default)* Sets the media for the Pinterest share.
* **popup_width**: `Number` *(`400` by default)* Sets the sharer popup's width.
* **popup_height**: `Number` *(`300` by default)* Sets the sharer popup's height.

## Full Example

```javascript
$("body").floatingSocialShare({
	place: "top-left", // alternatively content-left, top-right
    counter: true, // set to false for hiding the counters of buttons
    twitter_counter: false, // Twitter API does not provide counters without API key, register to https://opensharecount.com/
    buttons: ["envelope", "facebook", "google-plus", "linkedin", "odnoklassniki", "pinterest", "reddit", "stumbleupon", "tumblr", "twitter", "vk"], // all of the currently avalaible social buttons
    title: document.title, // your title, default is current page's title
    url: window.location.href,  // your url, default is current page's url
    text: "share with ", // the title of a tags
    description: $('meta[name="description"]').attr("content"), // your description, default is current page's description
    media: $('meta[property="og:image"]').attr("content"), // pinterest media
    popup_width: 400, // the sharer popup width, default is 400px
    popup_height: 300 // the sharer popup height, default is 300px
});
```

## Generating Minified Files

Install node and npm following one of the techniques explained within 
this [link](https://gist.github.com/isaacs/579814) and run the commands below.

``` bash
$ npm install --global gulp-cli
$ npm install
$ gulp
```

[downloads-image]: https://img.shields.io/npm/dm/jquery-floating-social-share.svg
[npm-image]: https://img.shields.io/npm/v/jquery-floating-social-share.svg
[npm-url]: https://www.npmjs.com/package/jquery-floating-social-share
