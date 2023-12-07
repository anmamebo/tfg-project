import { ROLES } from 'src/app/core/constants/roles.constants';

export const sidebarData = [
  {
    name: 'Menú',
    isTitle: true,
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT],
  },
  {
    name: 'Panel principal',
    url: '/',
    icon: 'grid-fill',
    roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT],
  },
  {
    name: 'Horario',
    url: '/horario',
    icon: 'calendar2-event-fill',
    roles: [ROLES.DOCTOR],
  },
  {
    name: 'Mis Citas',
    key: 'citas',
    icon: 'journal-medical',
    roles: [ROLES.PATIENT],
    submenu: [
      {
        name: 'Agenda',
        url: '/citas/agenda',
        roles: [ROLES.PATIENT],
      },
      {
        name: 'Próximas Citas',
        url: '/citas/mis-citas',
        roles: [ROLES.PATIENT],
      },
      {
        name: 'Historial',
        url: '/citas/historial',
        roles: [ROLES.PATIENT],
      },
    ],
  },
  {
    name: 'Citas',
    key: 'm/citas',
    icon: 'journal-medical',
    roles: [ROLES.ADMIN, ROLES.DOCTOR],
    submenu: [
      {
        name: 'Agenda',
        url: '/m/citas/agenda',
        roles: [ROLES.ADMIN, ROLES.DOCTOR],
      },
      {
        name: 'Citas',
        url: '/m/citas',
        roles: [ROLES.ADMIN, ROLES.DOCTOR],
      },
      {
        name: 'Historial',
        url: '/m/citas/historial',
        roles: [ROLES.ADMIN, ROLES.DOCTOR],
      },
      {
        name: 'Reportes y estadísticas',
        url: '/m/citas/reportes',
        roles: [ROLES.ADMIN, ROLES.DOCTOR],
      },
    ],
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
        roles: [ROLES.ADMIN],
      },
      {
        name: 'Permisos',
        url: '/autorizacion/permisos',
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    name: 'Pacientes',
    key: 'pacientes',
    url: '/pacientes',
    icon: 'people-fill',
    roles: [ROLES.ADMIN, ROLES.DOCTOR],
  },
  {
    name: 'Médicos',
    key: 'medicos',
    url: '/medicos',
    icon: 'people-fill',
    roles: [ROLES.ADMIN],
  },
  {
    name: 'Departamentos',
    key: 'departamentos',
    url: '/departamentos',
    icon: 'building-fill',
    roles: [ROLES.ADMIN],
  },
  {
    name: 'Salas',
    key: 'salas',
    url: '/salas',
    icon: 'house-fill',
    roles: [ROLES.ADMIN, ROLES.DOCTOR],
  },
];
