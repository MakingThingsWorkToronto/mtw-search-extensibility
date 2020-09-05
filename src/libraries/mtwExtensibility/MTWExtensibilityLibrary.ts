import { IExtension, ModernSearchExtensibilityLibrary } from "search-extensibility";

import { SidePanelTemplateWebComponent } from "../../components/SidePanelTemplateComponent/SidePanelTemplateComponent";
import { FlowButtonWebComponent } from "../../components/FlowButtonComponent/FlowButtonComponent";
import * as strings from 'MTWExtensibilityLibraryStrings';
import { SidePanelWebComponent } from "../../components/SidePanelComponent/SidePanelComponent";
import { TagsWebComponent } from "../../components/TagsComponent/TagsComponent";
import { PersonWebComponent } from "../../components/PersonComponent/PersonComponent";
import { IconWebComponent } from "../../components/IconComponent/IconComponent";
import { URLWebComponent } from "../../components/URLComponent/URLComponent";
import { ClientAppLinkWebComponent } from "../../components/ClientAppLinkComponent/ClientAppLinkComponent";

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
      }
    ];
  }

}
