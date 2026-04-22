import { LayoutDashboard, Users } from 'lucide-vue-next';
import { UserRole } from '../types';

export interface NavigationItem {
  name: string;
  route: string;
  icon: any;
  roles?: UserRole[]; // Arrays of roles that can access the item
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    name: 'Eventos',
    route: 'dashboard',
    icon: LayoutDashboard,
    roles: [UserRole.SUPER, UserRole.EDIT, UserRole.VIEW, UserRole.CHECKER], // All roles
  },
  {
    name: 'Usuários',
    route: 'users',
    icon: Users,
    roles: [UserRole.SUPER], // Restricted to admin
  },
];

