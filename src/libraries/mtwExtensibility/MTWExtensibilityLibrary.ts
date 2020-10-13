import { IExtension, ModernSearchExtensibilityLibrary } from "search-extensibility";

import { SidePanelTemplateWebComponent } from "../../extensions/webComponents/sidePanelTemplate/SidePanelTemplateComponent";
import { FlowButtonWebComponent } from "../../extensions/webComponents/flowButton/FlowButtonComponent";
import * as strings from 'MTWExtensibilityLibraryStrings';
import { SidePanelWebComponent } from "../../extensions/webComponents/sidePanel/SidePanelComponent";
import { TagsWebComponent } from "../../extensions/webComponents/tags/TagsComponent";
import { PersonWebComponent } from "../../extensions/webComponents/person/PersonComponent";
import { IconWebComponent } from "../../extensions/webComponents/icon/IconComponent";
import { URLWebComponent } from "../../extensions/webComponents/url/URLComponent";
import { ClientAppLinkWebComponent } from "../../extensions/webComponents/clientAppLink/ClientAppLinkComponent";
import RatingsWebComponent from "../../extensions/webComponents/ratings/RatingsWebComponent";
import SharingWebComponent from "../../extensions/webComponents/share/SharingWebComponent";
import { StylesheetWebComponent } from "../../extensions/webComponents/stylesheet/StylesheetComponent";
import { PageTitleWebComponent } from "../../extensions/webComponents/pageTitle/PageTitleComponent";

export class MTWExtensibilityLibrary extends ModernSearchExtensibilityLibrary {

  public name: string = strings.LibraryName;
  public description: string = strings.LibraryDescription;
  public icon: string = "WaitlistConfirm";

  public getExtensions(): IExtension<any>[] {
    return [
      {
        name: 'mtw-sidepanel',
        displayName: strings.WebComponents.SidePanel.displayName,
        description: strings.WebComponents.SidePanel.description,
        icon: "OpenPane",
        extensionClass: SidePanelWebComponent
      },
      {
        name: 'mtw-sidepanel-template',
        displayName: strings.WebComponents.SidePanelTemplate.displayName,
        description: strings.WebComponents.SidePanelTemplate.description,
        icon: "ClosePane",
        extensionClass: SidePanelTemplateWebComponent
      },
      {
        name: 'mtw-tags',
        displayName: strings.WebComponents.Tags.displayName,
        description: strings.WebComponents.Tags.description,
        icon: "Tag",
        extensionClass: TagsWebComponent
      },
      {
        name: 'mtw-person',
        displayName: strings.WebComponents.Person.displayName,
        description: strings.WebComponents.Person.description,
        icon: "Contact",
        extensionClass: PersonWebComponent
      },
      {
        name: 'mtw-icon',
        displayName: strings.WebComponents.Icon.displayName,
        description: strings.WebComponents.Icon.description,
        icon: "IconSetsFlag",
        extensionClass: IconWebComponent
      },
      {
        name: 'mtw-url',
        displayName: strings.WebComponents.Url.displayName,
        description: strings.WebComponents.Url.description,
        icon: "Link",
        extensionClass: URLWebComponent
      },
      {
        name: 'mtw-clientapp-link',
        displayName: strings.WebComponents.ClientAppLink.displayName,
        description: strings.WebComponents.ClientAppLink.description,
        icon: "WordDocument",
        extensionClass: ClientAppLinkWebComponent
      },
      {
        name: 'mtw-flow-button',
        displayName: strings.WebComponents.FlowButton.displayName,
        description: strings.WebComponents.FlowButton.description,
        extensionClass: FlowButtonWebComponent
      },
      {
        name: "mtw-rating",
        displayName: strings.WebComponents.Ratings.DisplayName,
        description: strings.WebComponents.Ratings.Description,
        icon: "FavoriteStar",
        extensionClass: RatingsWebComponent
      },
      {
        name: "mtw-share",
        displayName: strings.WebComponents.Share.DisplayName,
        description: strings.WebComponents.Share.Description,
        icon: "Share",
        extensionClass: SharingWebComponent
      },
      {
        name: "mtw-stylesheet",
        displayName: strings.WebComponents.Stylesheet.DisplayName,
        description: strings.WebComponents.Stylesheet.Description,
        icon: "EditStyle",
        extensionClass: StylesheetWebComponent
      },
      {
        name: "mtw-page-title",
        displayName: strings.WebComponents.PageTitle.DisplayName,
        description: strings.WebComponents.PageTitle.Description,
        icon: "InsertTextBox",
        extensionClass: PageTitleWebComponent
      }
    ];
  }

}
