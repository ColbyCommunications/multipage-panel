# multipage-panel

HTML, JS, and CSS for a tabbable content area in which one of an unlimited number of sections shows at a time. [Demo.](https://colbycommunications.github.io/multipage-panel/demo/index.html)

## Install

### Option 1: Composer

Install this package in your PHP project with Composer:

```
composer require colbycomms/multipage-panel
```

This will make the non-WordPress-dependent block classes available along with the shortcodes for WordPress (see below).

### Option 2: WordPress plugin

Clone this repository into your plugins directory and activate it through the WordPress admin.

## Usage

### With shortcodes

This library provides two WordPress shortcodes.

#### `multipage-panel`

This shortcode takes no attributes. It is expected to contain at least one instance of the `multipage-panel-page` shortcode, so nothing is rendered if the closing shortcode tag is missing.

#### `multipage-panel-page`

This shortcode takes one required attribute, `id`, which generate's the element container's HTML ID. Content is required; if the shortcode has no content, nothing is rendered.

#### Example

```HTML
[multipage-panel]
  [multipage-panel-page id="schedule"]
    // HTML content.
  [/multipage-panel-page]
  [multipage-panel-page id="map"]
    // HTML content.
  [/multipage-panel-page]
[/multipage-panel]
```
