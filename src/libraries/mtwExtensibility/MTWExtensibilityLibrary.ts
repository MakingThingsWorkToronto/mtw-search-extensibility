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
        displayName: strings.Extensions.SidePanel.displayName,
        description: strings.Extensions.SidePanel.description,
        icon: "OpenPane",
        extensionClass: SidePanelWebComponent
      },
      {
        name: 'mtw-sidepanel-template',
        displayName: strings.Extensions.SidePanelTemplate.displayName,
        description: strings.Extensions.SidePanelTemplate.description,
        icon: "ClosePane",
        extensionClass: SidePanelTemplateWebComponent
      },
      {
        name: 'mtw-tags',
        displayName: strings.Extensions.Tags.displayName,
        description: strings.Extensions.Tags.description,
        icon: "Tag",
        extensionClass: TagsWebComponent
      },
      {
        name: 'mtw-person',
        displayName: strings.Extensions.Person.displayName,
        description: strings.Extensions.Person.description,
        icon: "Contact",
        extensionClass: PersonWebComponent
      },
      {
        name: 'mtw-icon',
        displayName: strings.Extensions.Icon.displayName,
        description: strings.Extensions.Icon.description,
        icon: "IconSetsFlag",
        extensionClass: IconWebComponent
      },
      {
        name: 'mtw-url',
        displayName: strings.Extensions.Url.displayName,
        description: strings.Extensions.Url.description,
        icon: "Link",
        extensionClass: URLWebComponent
      },
      {
        name: 'mtw-clientapp-link',
        displayName: strings.Extensions.ClientAppLink.displayName,
        description: strings.Extensions.ClientAppLink.description,
        icon: "WordDocument",
        extensionClass: ClientAppLinkWebComponent
      },
      {
        name: 'mtw-flow-button',
        displayName: strings.Extensions.FlowButton.displayName,
        description: strings.Extensions.FlowButton.description,
        extensionClass: FlowButtonWebComponent
      },
      {
        name: "mtw-rating",
        displayName: strings.Extensions.Ratings.DisplayName,
        description: strings.Extensions.Ratings.Description,
        icon: "FavoriteStar",
        extensionClass: RatingsWebComponent
      },
      {
        name: "mtw-share",
        displayName: strings.Extensions.Share.DisplayName,
        description: strings.Extensions.Share.Description,
        icon: "Share",
        extensionClass: SharingWebComponent
      },
      {
        name: "mtw-stylesheet",
        displayName: strings.Extensions.Stylesheet.DisplayName,
        description: strings.Extensions.Stylesheet.Description,
        icon: "EditStyle",
        extensionClass: StylesheetWebComponent
      },
      {
        name: "mtw-page-title",
        displayName: strings.Extensions.PageTitle.DisplayName,
        description: strings.Extensions.PageTitle.Description,
        icon: "InsertTextBox",
        extensionClass: PageTitleWebComponent
      }
    ];
  }

}
