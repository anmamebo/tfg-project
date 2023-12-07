[![Python: Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Python](https://img.shields.io/badge/Python-3.11.1-blue.svg)](https://www.python.org/downloads/release/python-3111/)
[![Django](https://img.shields.io/badge/Django-%23092E20.svg?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-ff1709?style=flat&logo=django&logoColor=white&color=ff1709&labelColor=gray)](https://www.django-rest-framework.org/)
[![Swagger](https://img.shields.io/badge/Swagger-%23Clojure?style=flat&logo=swagger&logoColor=white)](https://swagger.io/)

[![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=flat&logo=prettier&logoColor=white)](https://prettier.io/)
[![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%23000000.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=flat&logo=angular&logoColor=white)](https://angular.io/)

[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)


[![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![PhpMyAdmin](https://img.shields.io/badge/PhpMyAdmin-%2300f.svg?style=flat&logo=phpmyadmin&logoColor=white)](https://www.phpmyadmin.net/)


# HospitalSys
Este repositorio contiene un sistema informático para la gestión recursos, horarios de uso y turnos de espera de un hospital, compuesto por un backend API desarrollado con Django Rest Framework 4.2.6 y un frontend construido con Angular 16.2.10.

## Estructura del Repositorio
``` bash
.
├── angular-app
│   ├── src
│   │   ├── app
│   │   │   └── ...
│   │   ├── assets
│   │   │   ├── fonts
│   │   │   │   └── ...
│   │   │   ├── images
│   │   │   │   └── ...
│   │   │   ├── js
│   │   │   │   └── ...
│   │   │   └── scss
│   │   │       └── ...
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── Dockerfile
│   ├── jest.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── setup-jest.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.doc.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
│
├── django-app
│   ├── apps
│   │   └── ...
│   ├── config
│   │   ├── asgi.py
│   │   ├── paginators.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── utilities
│   │   └── ...
│   ├── .gitignore
│   ├── Dockerfile
│   ├── manage.py
│   ├── README.md
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md
```

## Paso 1: Clonar repositorio
```
git clone https://github.com/anmamebo/tfg-project.git
```

###### NECESARIO
Tener docker instalado en el equipo

## Paso 2: Crear contenedores Docker
```
docker-compose up --build
```

Una vez estén creados los contenedores podremos hacer ``` docker ps ``` para ver los contenedores iniciados, **IMPORTANTE:** **entrar en la consola del contenedor de Django y realizar las migraciones de la base de datos y crear un usuario**

Para entrar en la consola usaremos:
```
docker exec -it <id_contenedor> bash
```

Para realizar las migraciones usaremos:
```
python manage.py makemigrations
```
```
python manage.py migrate
```

Y para crear el usuario usaremos:
```
python manage.py createsuperuser
```

Por último, debemos reiniciar el contenedor de Django:
```
docker restart <id_contenedor>
```

## PASO 3: Acceder a la aplicación

Una vez realizados los pasos anteriores podremos acceder a:

#### PHPMYADMIN
En la ruta [http://localhost:8080/](http://localhost:8080/)

- **Usuario**: user
- **Contraseña**: password

#### DJANGO REST
En la ruta [http://localhost:8000/](http://localhost:8000/)

#### ANGULAR
En la ruta [http://localhost:4200/](http://localhost:4200/)
