export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface DrawerItem {
  id: number;
  label: string;
  icon: string;
  route: string;
  permissions?: string[];
  disabled?: boolean;
}
