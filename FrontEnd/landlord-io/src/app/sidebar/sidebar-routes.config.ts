import { MenuType, RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './manageposts/newpost', title: 'New Post', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './manageposts/detailhouse', title: 'Detail House', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './infolandlord/profile', title: 'Landlord Profile', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './infolandlord/changepass', title: 'Change Password', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './managerooms/createroomtype', title: 'Create Room Type', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: './managerooms/rooms', title: 'Rooms', menuType: MenuType.LEFT, icon: 'material-icons' }
];