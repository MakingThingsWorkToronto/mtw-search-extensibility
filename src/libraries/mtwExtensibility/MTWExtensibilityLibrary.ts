import { IExtension, ModernSearchExtensibilityLibrary } from "search-extensibility";
import { SidePanelComponentWebComponent } from "../../components/SidePanelComponent/SidePanelComponent";
import { TagsComponentWebComponent } from "../../components/TagsComponent/TagsComponent";
import { PersonComponentWebComponent } from "../../components/PersonComponent/PersonComponent";
import { IconComponentWebComponent } from "../../components/IconComponent/IconComponent";
import { URLComponentWebComponent } from "../../components/URLComponent/URLComponent";
import { SidePanelTemplateWebComponent } from "../../components/SidePanelTemplateComponent/SidePanelTemplateComponent";
import { ClientAppLinkComponentWebComponent } from "../../components/ClientAppLinkComponent/ClientAppComponent";
import * as strings from 'MTWExtensibilityLibraryStrings';

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
        extensionClass: SidePanelComponentWebComponent
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
        extensionClass: TagsComponentWebComponent
      },
      {
        name: 'mtw-person',
        displayName: strings.Extensions.Person.displayName,
        description: strings.Extensions.Person.description,
        icon: "Contact",
        extensionClass: PersonComponentWebComponent
      },
      {
        name: 'mtw-icon',
        displayName: strings.Extensions.Icon.displayName,
        description: strings.Extensions.Icon.description,
        icon: "IconSetsFlag",
        extensionClass: IconComponentWebComponent
      },
      {
        name: 'mtw-url',
        displayName: strings.Extensions.Url.displayName,
        description: strings.Extensions.Url.description,
        icon: "Link",
        extensionClass: URLComponentWebComponent
      },
      {
        name: 'mtw-clientapp-link',
        displayName: strings.Extensions.ClientAppLink.displayName,
        description: strings.Extensions.ClientAppLink.description,
        icon: "WordDocument",
        extensionClass: ClientAppLinkComponentWebComponent
      }
    ];
  }

}
