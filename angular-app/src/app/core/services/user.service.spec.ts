import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

const userNock = {
  id: 2,
  patient: {
    id: 1,
    address: {
      id: 2,
      street: "' OR 1=1",
      number: 50,
      floor: null,
      city: 'Aznalcóllar',
      province: 'Sevilla',
      country: 'España',
      postal_code: '41870',
    },
    dni: '47548635E',
    birthdate: '2001-04-06',
    gender: 'M',
    phone: '+34 627660577',
    social_security: '7657565',
    user: 2,
  },
  doctor: {
    id: 1,
    collegiate_number: '283499999',
    is_available: true,
    user: 2,
  },
  groups: [
    {
      id: 2,
      permissions: [
        {
          id: 40,
          content_type: 'user',
          name: 'Can change user',
          codename: 'change_user',
        },
        {
          id: 38,
          content_type: 'user',
          name: 'Can get user',
          codename: 'get_user',
        },
      ],
      name: 'Paciente',
    },
    {
      id: 3,
      permissions: [],
      name: 'Médico',
    },
  ],
  password:
    'pbkdf2_sha256$600000$oAY6nZssIZeGFte52m7c5y$kQXMLHS3cf4GHoZB1D8DcADuL5cB+4/HipjJlbruL5M=',
  last_login: null,
  is_superuser: false,
  username: 'anmamebo',
  email: 'anmamebo2001@gmail.com',
  name: 'Antonio Manuel',
  last_name: 'Mérida Borrero',
  is_active: true,
  is_staff: false,
  user_permissions: [],
};

const httpClientmMock = {
  get: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientmMock },
      ],
    });
    service = TestBed.inject(UserService);
    httpClientmMock.get.mockReturnValue(userNock);
  });

  it('getUserById return User', () => {
    service.getUserById(2);
    expect(httpClientmMock.get).toHaveBeenCalled();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
