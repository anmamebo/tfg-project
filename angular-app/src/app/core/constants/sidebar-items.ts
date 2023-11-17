import { ROLES } from "src/app/core/constants/roles.constants";

export const sidebarData = [
  { 
    name: 'Menú', 
    isTitle: true,
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT]
  },
  {
    name: 'Panel principal',
    url: '/',
    icon: 'grid-fill',
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT]
  },
  {
    name: 'Horario',
    url: '/horario',
    icon: 'calendar2-event-fill',
    roles: [ROLES.DOCTOR]
  },
  {
    name: 'Autorización',
    key: 'autorizacion',
    icon: 'key-fill',
    roles: [ROLES.ADMIN],
    submenu: [
      {
        name: 'Grupos',
        url: '/autorizacion/grupos', 
        roles: [ROLES.ADMIN]
      },
      {
        name: 'Permisos',
        url: '/autorizacion/permisos',
        roles: [ROLES.ADMIN]
      }
    ]
  },
  {
    name: 'Pacientes',
    url: '/pacientes',
    icon: 'people-fill',
    roles: [ROLES.ADMIN, ROLES.DOCTOR]
  },
];
