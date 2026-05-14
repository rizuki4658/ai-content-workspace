import type { MenuGroup, Menu } from "@/lib/types/menu"

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
    }, {
      name: 'Data & Privacy',
      url: '/privacy',
      icon: 'AlertCircle',
      key: 'privacy'
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
