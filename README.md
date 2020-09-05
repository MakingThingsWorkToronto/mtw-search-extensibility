# MTW Search Extensibility

Project leverages the [PnP Modern Search Extensibility Library](https://microsoft-search.github.io/pnp-modern-search/search-extensibility-library/getting-started/) pattern to provide convenient Web Components enabling custom handlebars template developers to simplify & speed up UI development.

Tested/Supported for PnP Modern Search >3.10

# All Web Components

[Flow Button](#-flow-button-component)

[Sidepanel Template](#-sidepanel-template-component)

[Sidepanel URL](#-sidepanel-url-component)

[Icon](#-icon-component)

[Person](#-person-component)

[Tags](#-tags-component)

[URL](#-url-component)

[Client App Link](#-client-app-link)


# Installing on SharePoint Online

Download latest release, upload to app catalog and deploy to all site collections.

Or build solution using: 

```
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

Add the .sppkg to your App Catalog and deploy to all site collections.

Debugging: create a debug build and use gulp serve locally.


# Client App Link
Web Component allows search developers to create a hyperlink that opens the document within the native Office application. Should no native office application be found a standard http hyperlink will be created.

## Usage
Add the web component directly in handlebars template using the following HTML tag:

```html
<mtw-clientapp-link data-title="{{Title}}" data-url="{{OriginalPath}}" data-file-type="{{FileType}}" data-icon-size="16 | 20 | 24 | 32 | 40 | 48 | 64 | 96" data-scheme="view | edit | newfromtemplate | newfromtemplatedefaultsave" data-default-save-folder="https://site.sharepoint.com/library/folder/" data-icon="Document" data-link-css-class="class-name" data-link-icon-css-class="class-name" ></mtw-clientapp-link>
```
## Attributes

### data-title
Contains the text appearing in the hyperlink. The component will not render if title is not specified.

### data-url
The absolute path to the file. Add OriginalPath to the select properties and pass it in as per usage instructions. The component will not render if no url is provided. The hyperlink will be malformed if the absolute path is not specified.

### data-file-type
The file type of the file we want to create a link to. You should add the FileType managed property to the web part select properties and pass it in as per the usage instructions. The component will not render if file type is not specified.

### data-icon-size
The size of the icon to render. The default is 32. Available icon sizes are: 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96.

### data-scheme
The type of link to create. The default is view. Available schemes are: view, edit, newfromtemplate and newfromtemplatedefaultsave. The scheme newfromtemplatedefaultsave scheme requires the data-default-save-folder to be specified.

### data-default-save-folder
Optional: The folder to save the newly created file by default.  Required when using the data-scheme: newfromtemplatedefaultsave.

### data-icon
Optional: An override for the default file type icon. 

### data-link-css-class
Optional: The CSS class to apply to the hyperlink.

### data-link-icon-css-class
Optional: The CSS class to apply to the icon.



# Flow Button Component
Web Component allows search developers to run an Flow built on the HTTP Request trigger.

## Usage
Add the web component directly in handlebars template using the following HTML tag:

```html
<mtw-flow-button data-title="Run Flow" data-icon="Play" data-endpoint="https://prod-18.canadacentral.logic.azure.com:443/workflows/example/triggers/manual/paths/invoke" data-body="{&#x22;Example&#x22;:&#x22;example-data&#x22;, &#x22;ID&#x22;: &#x22;1&#x22;}" data-success="The flow run was successful" data-failure="The flow run failed" data-class-name="action-button-custom-css-class" data-success-class="success-message-custom-css-class" data-failure-class="failure-message-custom-css-class"></mtw-flow-button>
```

## Attributes

### data-title
Required: Contains the text appearing in the flow action button.

### data-endpoint
Required: The HTTP endpoint for the Flow. This should be copied from your Flows' HTTP Trigger.

### data-body
Required: The HTML entitiy encoded JSON structure that should be sent to the Flow. See [HTML entity encoder/decoder](https://mothereff.in/html-entities)

### data-success
Required: The text that should be displayed within the success message bar when the Flow is successful.

### data-failure
Required: The text that should be displayed within the error message bar when the Flow is unsuccessful.

### data-icon
Optional: Contains the icon appearing in the flow action button. If no icon is specified the Play icon will be used.

### data-class-name
Optional: The CSS class name that should be applied to the run flow action button.

### data-success-class
Optional: The CSS class name that should be applied to the success message bar.

### data-failure-class
Optional: The CSS class name that should be applied to the failure message bar.



# Sidepanel Template Component
Web Component allows search developers to open a custom template in a configurable pop out side panel. Allows users to stay on the search results page and reduces the number of tabs open. 

## Usage

Add the web component directly in handlebars template using the following HTML tag:

```html
<mtw-sidepanel-template data-title="{{Title}}" data-position="custom|customNear|extraLarge|large|largeFixed|medium|smallFixedFar|smallFixedNear|smallFluid" data-size="100px|10rem|40%|etc.">
    <div>
        <h2>{{Title}}</h2>
        <a href=="{{getUrl item}}">Link to {{Title}}</a>
    </div>
</mtw-sidepanel>
```

## Attributes

#### data-title
Contains text appearing in header of the side panel

#### data-position
The position of the side panel, either the left or right size. All positions with the exception of custom/customNear leverage device specific breakpoints for width (320-470, 480-639, 640-1023, 1023-1365, 1365px and up). Custom positions do not leverage device specific breakpoints and only accept one width. The default position is medium.

See Sidepanel URL Component for options.

#### data-size
Optional. The width of the side panel. May be any valid HTML width value. Size is only applied with positions: custom or customNear. 

#### mtw-sidepanel-template innerHTML
Contains the handlebars template to be rendered within the side panel. Can be any valid HTML including web components.


# Sidepanel URL Component
Web Component allows search developers to open search results in a configurable pop out side panel. Allows users to stay on the search results page and reduces the number of tabs open. Only URLs in the current domain may be displayed in the side panel. If the URL is in a different domain it will open in a new tab.

## Usage

Add the web component directly in handlebars template using the following HTML tag:

```html
<mtw-sidepanel data-title="{{Title}}" data-url="{{getUrl item}}" data-position="custom|customNear|extraLarge|large|largeFixed|medium|smallFixedFar|smallFixedNear|smallFluid" data-size="100px|10rem|40%|etc." data-new-window="true|false" ></mtw-sidepanel>
```
## Attributes

#### data-title
Contains text appearing in header of the side panel

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


# Icon Component

Web Component displays a label to the right of a configurable fabric ui icon. Speeds up the development of search UIs. 

## Usage

Add the Web Component to the handlebars template using the following HTML tag:
```html
<mtw-icon data-icon="Calendar" data-value="{{getDate LastModifiedTime 'MM-DD-YYYY'}}"></mtw-icon>
```

## Attributes

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.

#### data-title
The label to display between the icon and the hyperlink.

#### data-value
The label to display to the right of the icon. Users may format data using handlebars helper functions.


# Person Component

Web Component displays a simple list of hyperlinked usernames to the right of an Office UI Fabric Icon using an Overflow Set. 

## Usage
```html
<mtw-person data-icon="Contact" data-link-type="delve|email" data-value="{{AuthorOWSUSER}}"></mtw-person>
```

## Attributes

#### data-value
The User ID column (postfixed with OWSUSER) containing the users Name, Email and Account information. Account information is required to build a link to email or delve profile.

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.

#### data-nbr-items
Optional. The number of items to display before adding items to the Overflow pop-out. The default number of items is 5. To display all items set this to a large number (1000).

#### data-link-type
Optional. Determines what type of link to apply to the user link. The options are:

delve: builds a hyperlink to the delve user profile. If the user is a guest this falls back to an email (mailto) link.

email: builds a mailto hyperlink to send email to user.


# Tags Component

Web Component displays a simple list of Taxonomy column values to the right of an Office UI Fabric Icon using an Overflow Set. The input value may be in the form of a comma separated (localized) taxonomy column or may contain search encoded taxonomy values. If the data-filter-property is set to a valid managed property the tags component will render a [filter deep link](https://microsoft-search.github.io/pnp-modern-search/search-parts/search-results/#filters-deep-links) into the search results.

## Usage
```html
<mtw-tags data-icon="Tag" data-nbr-items="2" data-title="Tags:" data-value="{{owstaxidmetadataalltagsinfo}}" data-filter-property="owstaxidmetadataalltagsinfo" data-filter-condition="and|or"></mtw-tags>
```

## Attributes

#### data-title
The label to display between the icon and the list of tags.

#### data-value
The value to display in the overflow set. May be in the form of a comma separated (localized) taxonomy column or may contain search encoded taxonomy values.

#### data-nbr-items
Optional. The number of items to display before adding items to the Overflow pop-out. The default number of items is 5. To display all items set this to a large number (1000).

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.

#### data-filter-property
Optional. Required if you want the tag to activate a refiner when clicked. This should be the managed property name you want to filter on.

#### data-filter-condition
Optional. Defaults to "and". Specifies the operator for multiple filters. 


# URL Component

Web Component displays a hyperlink managed property optionally with an icon and or label. Users may override the hyperlink text with custom text.

## Usage
```html
<mtw-url data-icon="Link" data-title="URL:" data-text="" data-value="{{URLOWSURLH}}"></mtw-url>
```

## Attributes

#### data-title
The label to display between the icon and the hyperlink.

#### data-text
Optional. The text to display on the hyperlink. If blank the label is pulled from the hyperlink data.

#### data-value
The value to display in the hyperlink. Data should be in the format "https://hyperlink, label"

#### data-icon
Optional. The Fabric UI icon which can be found at [Office UI Fabric Icons](https://uifabricicons.azurewebsites.net/). Note, not all Fabric UI icons are supported.
