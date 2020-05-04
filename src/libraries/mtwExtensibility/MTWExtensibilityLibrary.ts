import { IExtensibilityLibrary } from "../../models/IExtensibilityLibrary";
import { SidePanelComponentWebComponent } from "../../components/SidePanelComponent/SidePanelComponent";
import { TagsComponentWebComponent } from "../../components/TagsComponent/TagsComponent";
import { PersonComponentWebComponent } from "../../components/PersonComponent/PersonComponent";
import { IconComponentWebComponent } from "../../components/IconComponent/IconComponent";
import { URLComponentWebComponent } from "../../components/URLComponent/URLComponent";
import { SidePanelTemplateWebComponent } from "../../components/SidePanelTemplateComponent/SidePanelTemplateComponent";
import { IComponentDefinition } from "../../models/IComponentDefinition";


export class MTWExtensibilityLibrary {

  public name(): string {
    return 'MTWExtensibilityLibrary';

  }

  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [
      {
        componentName: 'mtw-sidepanel',
        componentClass: SidePanelComponentWebComponent
      },
      {
        componentName: 'mtw-sidepanel-template',
        componentClass: SidePanelTemplateWebComponent
      },
      {
        componentName: 'mtw-tags',
        componentClass: TagsComponentWebComponent
      },
      {
        componentName: 'mtw-person',
        componentClass: PersonComponentWebComponent
      },
      {
        componentName: 'mtw-icon',
        componentClass: IconComponentWebComponent
      },
      {
        componentName: 'mtw-url',
        componentClass: URLComponentWebComponent
      }
    ];
  }

}
