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
