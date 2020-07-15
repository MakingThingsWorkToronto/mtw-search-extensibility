import { IExtensibilityLibrary } from "../../models/IExtensibilityLibrary";
import { SidePanelWebComponent } from "../../components/SidePanelComponent/SidePanelComponent";
import { TagsWebComponent } from "../../components/TagsComponent/TagsComponent";
import { PersonWebComponent } from "../../components/PersonComponent/PersonComponent";
import { IconWebComponent } from "../../components/IconComponent/IconComponent";
import { URLWebComponent } from "../../components/URLComponent/URLComponent";
import { SidePanelTemplateWebComponent } from "../../components/SidePanelTemplateComponent/SidePanelTemplateComponent";
import { FlowButtonWebComponent } from "../../components/FlowButtonComponent/FlowButtonComponent";
import { IComponentDefinition } from "../../models/IComponentDefinition";
import { ClientAppLinkWebComponent, ClientAppComponent } from "../../components/ClientAppLinkComponent/ClientAppLinkComponent";
import { PageTitleWebComponent } from "../../components/PageTitleComponent/PageTitleComponent";

export class MTWExtensibilityLibrary {

  public name(): string {
    return 'MTWExtensibilityLibrary';

  }

  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [
      {
        componentName: 'mtw-sidepanel',
        componentClass: SidePanelWebComponent
      },
      {
        componentName: 'mtw-sidepanel-template',
        componentClass: SidePanelTemplateWebComponent
      },
      {
        componentName: 'mtw-tags',
        componentClass: TagsWebComponent
      },
      {
        componentName: 'mtw-person',
        componentClass: PersonWebComponent
      },
      {
        componentName: 'mtw-icon',
        componentClass: IconWebComponent
      },
      {
        componentName: 'mtw-url',
        componentClass: URLWebComponent
      },
      {
        componentName: 'mtw-clientapp-link',
        componentClass: ClientAppLinkWebComponent
      },
      {
        componentName: 'mtw-flow-button',
        componentClass: FlowButtonWebComponent
      },
      {
        componentName: 'mtw-page-title',
        componentClass: PageTitleWebComponent
      }
    ];
  }

}
