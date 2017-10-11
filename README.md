jQuery Floating Social Share
================================

[![npm][npm-image]][npm-url] [![downloads][downloads-image]][npm-url]

Simple jQuery floating social media sharer plugin. 
Currently supported platforms are Facebook, Twitter, Linkedin, Pinterest,
Reddit, Tumblr, VK and Odnoklassniki with counter feature, Google Plus, Mail, StumbleUpon, Telegram, and Whatsapp
without counter feature.

You can check the plugin on [Online Alarm Clock](http://onlinealarmkur.com/en/).

## Getting Started

Install via bower and include from your `bower_components` folder.

`bower install --save jquery-floating-social-share`

Or install via npm and include from your `node_modules` folder

`npm install --save jquery-floating-social-share`

Or install via <a target="_blank" href="https://github.com/ozdemirburak/jquery-floating-social-share/archive/master.zip">zip</a>, then include jQuery and the plugin on a page.

```html
<link rel="stylesheet" type="text/css" href="dist/jquery.floating-social-share.min.css" />
<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="dist/jquery.floating-social-share.min.js"></script>
```

Finally, call the `floatingSocialShare` method on body with your custom options.

```javascript
$("body").floatingSocialShare({
  buttons: ["facebook", "twitter", "google-plus"],
  text: "share with:"
});
```

To make the social share buttons appear next to the specific content, instead of the body, reference with selector.

```javascript
$(".content").floatingSocialShare({
  buttons: ["facebook", "twitter", "google-plus"],
  text: {
    'facebook': 'Share on Facebook',
    'twitter': 'Share on Twitter',
    'google-plus': 'Share on Google Plus'
  },
  place: "content-left"
});
```

## Options

* **place**: `String` *(`top-left` by default)* Set the position of the box. Currently: `content-left`, `content-right`, `top-left` and `top-right` are available.
* **counter**: `Boolean` *(`true` by default)* Set to `false` to hide counters that appear below the buttons.
* **twitter_counter**: `Boolean` *(`false` by default)* Set to `true` to show twitter counter, but you also need to register to Open Share Count since Twitter API does not provide counters without an API key.
* **buttons**: `Array` *(`["facebook", "twitter", "google-plus"]` by default)* Sets the social buttons for sharing. Available ones are `mail`, `facebook`, `google-plus`, `linkedin`, `odnoklassniki`, `pinterest`, `reddit`, `stumbleupon`, `telegram`, `tumblr`, `twitter` `vk` and `whatsapp`. 
* **title**: `String` *(`document.title` by default)* Sets the title for the share message.
* **url**: `String` *(`window.location.href` by default)* Sets the url for the share message.
* **text**: `Object | String` *({'default': 'share with:'} by default)* Sets the share title for the social buttons. If properties are not assigned specifically, will use the default one appended with the button tag, for instance share with facebook.
* **text_title_case**: `Boolean` *(`false` by default)* Converts share text to title case, for instance, share with facebook will become Share With Facebook when set to true.
* **description**: `String` *(`$('meta[name="description"]').attr("content")` by default)* Sets the description for the share.
* **media**: `String` *(`$('meta[property="og:image"]').attr("content")` by default)* Sets the media for the Pinterest share.
* **popup**: `Boolean` *(`true` by default)* Opens links in a popup when set true. When it is false, links are opened in a new tab.
* **popup_width**: `Number` *(`400` by default)* Sets the sharer popup's width.
* **popup_height**: `Number` *(`300` by default)* Sets the sharer popup's height.
* **extra_offset**: `Number` *(`15` by default)* Adds an extra offset for `margin-left` if the selected place is `content-right` or `content-left`.

## Full Example

```javascript
$("body").floatingSocialShare({
  place: "top-left", // alternatively content-left, content-right, top-right
  counter: true, // set to false for hiding the counters of buttons
  twitter_counter: false, // Twitter API does not provide counters without API key, register to https://opensharecount.com/
  buttons: [ // all of the currently available social buttons
    "mail", "facebook", "google-plus", "linkedin", "odnoklassniki", 
    "pinterest", "reddit", "stumbleupon", "telegram", "tumblr", "twitter", 
    "vk", "whatsapp"
  ],
  title: document.title, // your title, default is current page's title
  url: window.location.href,  // your url, default is current page's url
  text: { // the title of tags
    'default': 'share with ', 
    'facebook': 'share with facebook', 
    'google-plus': 'share with g+'
  },
  text_title_case: false, // if set true, then will convert share texts to title case like Share With G+
  description: $('meta[name="description"]').attr("content"), // your description, default is current page's description
  media: $('meta[property="og:image"]').attr("content"), // pinterest media
  popup: true, // open links in popup
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
