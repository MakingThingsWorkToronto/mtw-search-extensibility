import * as strings from 'MTWExtensibilityLibraryStrings';
import PageHeaderWebComponent from '../../extensions/webComponents/pageHeader/PageHeaderWebComponent';
import StreamWebComponent from '../../extensions/webComponents/stream/StreamWebComponent';
import RegisterWebComponent from '../../extensions/webComponents/register/RegisterWebComponent';
import StarWebComponent from '../../extensions/webComponents/star/StarWebComponent';
import { ConvertToClassNameHelper } from '../../extensions/handlebarsHelpers/ConvertToClassNameHelper';
import { UpcomingGroup } from '../../extensions/handlebarsHelpers/UpcomingGroup';
import { SidePanelWebComponent } from '../../extensions/webComponents/sidePanel/SidePanelComponent';
import { SidePanelTemplateWebComponent } from '../../extensions/webComponents/sidePanelTemplate/SidePanelTemplateComponent';
import { TagsWebComponent } from '../../extensions/webComponents/tags/TagsComponent';
import { PersonWebComponent } from '../../extensions/webComponents/person/PersonComponent';
import { IconWebComponent } from '../../extensions/webComponents/icon/IconComponent';
import { URLWebComponent } from '../../extensions/webComponents/url/URLComponent';
import { ClientAppLinkWebComponent } from '../../extensions/webComponents/clientAppLink/ClientAppLinkComponent';
import { FlowButtonWebComponent } from '../../extensions/webComponents/flowButton/FlowButtonComponent';
import RatingsWebComponent from '../../extensions/webComponents/ratings/RatingsWebComponent';
import SharingWebComponent from '../../extensions/webComponents/share/SharingWebComponent';
import { StylesheetWebComponent } from '../../extensions/webComponents/stylesheet/StylesheetComponent';
import { PageTitleWebComponent } from '../../extensions/webComponents/pageTitle/PageTitleComponent';
import { IExtensibilityLibrary , IComponentDefinition, ISuggestionProviderDefinition } from '@pnp/modern-search-extensibility';
import * as Handlebars from 'handlebars';

export class MTWExtensibilityLibrary implements IExtensibilityLibrary  {

  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [
      {
        componentName: "mtw-page-header",
        componentClass: PageHeaderWebComponent
      },
      {
        componentName: "mtw-stream",
        componentClass: StreamWebComponent
      },
      {
        componentName: "mtw-register",
        componentClass: RegisterWebComponent
      },
      {
        componentName: "mtw-star",
        componentClass: StarWebComponent
      },
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
        componentName: "mtw-rating",
        componentClass: RatingsWebComponent
      },
      {
        componentName: "mtw-share",
        componentClass: SharingWebComponent
      },
      {
        componentName: "mtw-stylesheet",
        componentClass: StylesheetWebComponent
      },
      {
        componentName: "mtw-page-title",
        componentClass: PageTitleWebComponent
      }
    ];
  }

  public getCustomSuggestionProviders(): ISuggestionProviderDefinition[] {
    return [];
  }

  public registerHandlebarsCustomizations(handelarsNamespace: typeof Handlebars) : void {
    
    handelarsNamespace.registerHelper("convertToClassName", ConvertToClassNameHelper.helper);

    handelarsNamespace.registerHelper("groupByDate", UpcomingGroup.helper);

  }

}
