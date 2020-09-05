declare interface IMTWExtensibilityLibraryStrings {
  LibraryName: string;
  LibraryDescription: string;
  Extensions: {
    SidePanel: {
      displayName: string;
      description: string;
    },
    SidePanelTemplate: {
      displayName: string;
      description: string;
    },
    Tags: {
      displayName: string;
      description: string;
    },
    Person: {
      displayName: string;
      description: string;
    },
    Icon: {
      displayName: string;
      description: string;
    },
    Url: {
      displayName: string;
      description: string;
    },
    ClientAppLink: {
      displayName: string;
      description: string;
    },
    FlowButton: {
      displayName: string;
      description: string;
    }
  }
}

declare module 'MTWExtensibilityLibraryStrings' {
  const strings: IMTWExtensibilityLibraryStrings;
  export = strings;
}
