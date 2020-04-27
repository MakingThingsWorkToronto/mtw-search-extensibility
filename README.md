# MTW Search Extensibility

Project leverages the [PnP Modern Search Extensibility Library](https://microsoft-search.github.io/pnp-modern-search/search-extensibility-library/getting-started/) pattern to provide a Web Component allowing custom handlebars template developers to open item forms / urls within the search results page in a pop out side panel (iframe).

Tested/Supported for PnP Modern Search >4.0.0

# Installing on SharePoint Online

Build solution using: 

```
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

Add the .sppkg to your App Catalog and deploy to all site collections.

# Web Components

## mtw-sidepanel
Web Component allows search developers to open search results in a configurable pop out side panel. Allows users to stay on the search results page and reduces the number of tabs open. Only URLs in the current domain may be displayed in the side panel. If the URL is in a different domain it will open in a new tab.

### Usage

Add the web component directly in handlebars template using the following HTML tag:

```html
<mtw-sidepanel data-title="{{Title}}" data-url="{{getUrl item}}" data-position="custom|customNear|extraLarge|large|largeFixed|medium|smallFixedFar|smallFixedNear|smallFluid" data-size="100px|10rem|40%|etc." data-new-window="true|false" ></mtw-sidepanel>
```

#### data-title
Contains text appearing in top of the side panel

#### data-url
Contains the URL to the list item / page to be displayed in the side panel. 

#### data-position
The position of the side panel, either the left or right size. All positions with the exception of custom/customNear leverage device specific breakpoints for width (320-470, 480-639, 640-1023, 1023-1365, 1365px and up). Custom positions do not leverage device specific breakpoints and only accept one width. The default position is medium.

Available options:

smallFluid: Renders the Panel with a `fluid` (full screen) width.

smallFixedFar: Renders the Panel in fixed-width `small` size, anchored to the near side (left in LTR mode).

smallFixedNear: Renders the Panel in fixed-width `small` size, anchored to the near side (left in LTR mode).

medium: Renders the Panel in `medium` size, anchored to the far side (right in LTR mode).

large: Renders the Panel in `large` size, anchored to the far side (right in LTR mode).

largeFixed: Renders the Panel in `large` size, anchored to the far side (right in LTR mode), with a fixed width at XX-Large breakpoint.

extraLarge: Renders the Panel in `extra large` size, anchored to the far side (right in LTR mode).

custom: Renders the Panel in `custom` size using `size` parameter, anchored to the far side (right in LTR mode).

customNear: Renders the Panel in `custom` size using `size`, anchored to the near side (left in LTR mode).

#### data-size
Optional. The width of the side panel. May be any valid HTML width value. Size is only applied with positions: custom or customNear. 

#### data-new-window
Optional. Determines if users should see the open in new window icon before the link. When the icon is clicked the link opens in a new tab/window. Default false. Set to true to display icon. 


## Icon Component

Web Component displays a label to the right of a configurable fabric ui icon. Speeds up the development of search UIs. 

### Usage

Add the Web Component to the handlebars template using the following HTML tag:
```html
<mtw-icon data-icon="Calendar" data-value="{{getDate LastModifiedTime 'MM-DD-YYYY'}}"></mtw-icon>
```

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.

#### data-value
The label to display to the right of the icon. Users may format data using handlebars helper functions.


## Person Component

Web Component displays a simple list of hyperlinked usernames to the right of an Office UI Fabric Icon using an Overflow Set. 

### Usage
```html
<mtw-person data-icon="Contact" data-link-type="delve|email" data-value="{{AuthorOWSUSER}}"></mtw-person>
```

#### data-value
The User ID column (postfixed with OWSUSER) containing the users Name, Email and Account information. Account information is required to build a link to email or delve profile.

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.

#### data-link-type
Optional. Determines what type of link to apply to the user link. The options are:

delve: builds a hyperlink to the delve user profile.

email: builds a mailto hyperlink to send email to user.


## Tags Component

Web Component displays a simple list of Taxonomy column values to the right of an Office UI Fabric Icon using an Overflow Set. The input value may be in the form of a comma separated (localized) taxonomy column or may contain search encoded taxonomy values.

### Usage
```html
<mtw-tags data-icon="Tag" data-nbr-items="2" data-title="Tags:" data-value="{{owstaxidmetadataalltagsinfo}}"></mtw-tags>
```

#### data-title
The label to display between the icon and the list of tags.

#### data-value
The value to display in the overflow set. May be in the form of a comma separated (localized) taxonomy column or may contain search encoded taxonomy values.

#### data-nbr-items
Optional. The number of items to display before adding items to the Overflow pop-out. The default number of items is 3. To display all items set this to a large number (1000).

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.
