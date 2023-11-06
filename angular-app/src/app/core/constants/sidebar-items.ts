export const sidebarData = [
  { 
    name: 'Menú', 
    isTitle: true 
  },
  {
    name: 'Panel principal',
    url: '/',
    icon: 'grid-fill'
  },
  {
    name: 'Grupos (Roles)',
    key: 'grupo',
    icon: 'key-fill',
    submenu: [
      {
        name: 'Grupos',
        url: '/grupo/grupos', 
      },
      {
        name: 'Permisos',
        url: '/grupo/permisos'
      }
    ]
  },
  {
    name: 'Usuarios',
    url: '',
    icon: 'person-fill',
  }
];
