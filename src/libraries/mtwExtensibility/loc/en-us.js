define([], function() {
  return {
    "LibraryName": "Making Things Work Search Extensibility Library - 1.0.2",
    "LibraryDescription": "Collection of useful search extensibility web components that make generating handlebars templates easier.",
    "Extensions" : {
      "SidePanel": {
        "displayName": "Sidepanel URL Component",
        "description": "Web Component allows search developers to open search results in a configurable pop out side panel. Allows users to stay on the search results page and reduces the number of tabs open. Only URLs in the current domain may be displayed in the side panel. If the URL is in a different domain it will open in a new tab."
      },
      "SidePanelTemplate": {
        "displayName": "Sidepanel Template Component",
        "description": "Web Component allows search developers to open a custom template in a configurable pop out side panel. Allows users to stay on the search results page and reduces the number of tabs open."
      },
      "Tags": {
        "displayName": "Tags Component",
        "description": "Web Component displays a simple list of Taxonomy column values to the right of an Office UI Fabric Icon using an Overflow Set. The input value may be in the form of a comma separated (localized) taxonomy column or may contain search encoded taxonomy values. If the data-filter-property is set to a valid managed property the tags component will render a filter deep link into the search results."
      },
      "Url": {
        "displayName": "URL Component",
        "description": "Web Component displays a hyperlink managed property optionally with an icon and or label. Users may override the hyperlink text with custom text."
      },
      "Person": {
        "displayName": "Person Component",
        "description": "Web Component displays a simple list of hyperlinked usernames to the right of an Office UI Fabric Icon using an Overflow Set."
      },
      "Icon": {
        "displayName": "Icon Component",
        "description": "Web Component displays a label to the right of a configurable fabric ui icon. Speeds up the development of search UIs."
      },
      "ClientAppLink": {
        "displayName": "Client App Link Component",
        "description": "Web Component presents a hyperlink to a document that opens directly in the appropriate Microsoft Office Application. Provides an icon option to open a preview of the document in a new tab."
      },
      "FlowButton": {
        "displayName": "Flow Button",
        "description": "Calls a flow by binding handlebars data."
      },
      "Ratings" : {
        "Description": "Allows users to view and rate items in search results.",
        "DisplayName": "Ratings",
        "ResponseCodes": {
          "CANTFINDUSER":"Can't find username in site. To rate this item please visit the site before rating.",
          "USERNOTINSITE":"Username is not in site. To rate this item please visit the site before rating.",
          "CANTFINDITEM":"Can't find the list item to be rated. Please contact the system administrator.",
          "RATINGSAVED":"Thanks for rating! It may take several minutes for the rating to appear. Please be patient.",
          "ALREADYRATED":"You've already rated this item. Rating was not saved as we only allow one rating per user."
        }
      },
      "Share": {
        "Description": "Displays a callout with a sharing hyperlink",
        "DisplayName": "Share",
        "ShareButtonText": "Share",
        "ShareText": "Click on the above link to copy it to your clipboard. You can paste the link into an email or chat to share with your team member.",
        "CopiedClipboard": "Link copied",
        "CopyText":"Copy"
      },
      "Stylesheet": {
        "Description": "Renders an external stylesheet in the browser",
        "DisplayName": "Stylesheet"
      }
    }
  }
});