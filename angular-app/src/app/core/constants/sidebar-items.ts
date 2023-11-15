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
    name: 'Horario',
    url: '/horario',
    icon: 'calendar2-event-fill'
  },
  {
    name: 'Autorización',
    key: 'autorizacion',
    icon: 'key-fill',
    submenu: [
      {
        name: 'Grupos',
        url: '/autorizacion/grupos', 
      },
      {
        name: 'Permisos',
        url: '/autorizacion/permisos'
      }
    ]
  },
  {
    name: 'Usuarios',
    url: '',
    icon: 'person-fill',
  }
];