export type Menu = {
  name: string;
  url: string;
  icon: string;
  key: string;
}

export type MenuGroup = {
  label: string | null;
  items: Menu[];
}

export const Menus: MenuGroup[] = [
  {
    label: null,
    items: [{
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'LayoutPanelLeft',
      key: 'dashboard'
    }],
  }, {
    label: 'Main',
    items: [{
        name: 'Generate',
        url: '/generate',
        icon: 'FilePenLine',
        key: 'generate'
      },
      {
        name: 'Contents',
        url: '/contents',
        icon: 'FileText',
        key: 'contents'
      },
      {
        name: 'Analytics',
        url: '/analytics',
        icon: 'ChartPie',
        key: 'analytics'
    }]
  }, {
    label: 'Others',
    items: [{
      name: 'Settings',
      url: '/settings',
      icon: 'Settings',
      key: 'settings'
    }]
  }
]

export const MenusMobile: Menu[] = [
  {
    name: 'Generate',
    url: '/generate',
    icon: 'FilePenLine',
    key: 'generate'
  }, {
    name: 'Contents',
    url: '/contents',
    icon: 'FileText',
    key: 'contents'
  }, {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'LayoutPanelLeft',
    key: 'dashboard'
  }, {
    name: 'Analytics',
    url: '/analytics',
    icon: 'ChartPie',
    key: 'analytics'
  },  {
    name: 'Settings',
    url: '/settings',
    icon: 'Settings',
    key: 'settings'
  }
]
