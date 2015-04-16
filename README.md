jQuery Floating Social Share
================================

Simple jQuery floating social media sharer plugin works with Font-Awesome. Currently supported platforms are Facebook, Twitter, Linkedin, Pinterest and Google Plus with counter feature, StumbleUpon and Email without counter feature.

## Getting Started

Install via bower

`bower install jquery-floating-social-share`

Then,

Include jQuery and Font-Awesome and the plugin on a page. Then call the `floatingShare` method on body with your options.

```html
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="./dist/css/jquery.floating-social-share.min.css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="./dist/js/jquery.floating-social-share.min.js"></script>
<script>
	$("body").floatingShare({
 		buttons: ["facebook","twitter","google-plus","linkedin"],
        text: "share with: "
	});
</script>
```

#### [Demo](http://onlinealarmkur.com)

## Options

* **place**: `String` *(`top-left` by default)* Set the position of the box. Currently: `top-left` and `top-right` are available.
* **counter**: `Boolean` *(`true` by default)* Set to `false` to hide counters that appear below the buttons.
* **buttons**: `Array` *(`["facebook", "twitter", "google-plus", "linkedin"]` by default)* Sets the social buttons for sharing. Available ones are `facebook`, `twitter`, `google-plus`, `linkedin`, `envelope`, `pinterest` and `stumbleupon`
* **title**: `String` *(`document.title` by default)* Sets the title for the share message.
* **url**: `String` *(`window.location.href` by default)* Sets the url for the share message.
* **text**: `String` *(`share with` by default)* Sets the share title for the social buttons.
* **description**: `String` *(`window.location.href` by default)* Sets the description for the share.
* **popup_width**: `Number` *(`400` by default)* Sets the sharer popup's width.
* **popup_height**: `Number` *(`300` by default)* Sets the sharer popup's height.

## Full Example

```javascript
$("body").floatingShare({
	place: "top-left", // alternatively top-right
    counter: true, // set to false to hide counters of pinterest, facebook, twitter, linkedin and google-plus
    buttons: ["facebook","twitter","google-plus","linkedin","envelope","stumbleupon","pinterest"], // all of the currently avalaible social buttons
    title: document.title, // your title, default is current page's title
    url: window.location.href,  // your url, default is current page's url
    text: "share with ", // the title of a tags
    description: $("meta[name='description']").attr("content"), // your description, default is current page's description
    popup_width: 400, // the sharer popup's width, default is 400px
    popup_height: 300 // the sharer popup's width, default is 300px
});
```

## License
Copyright &copy; [Burak Özdemir](http://burakozdemir.co.uk)<br>
Licensed under the MIT license.

