[![Python: Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Python](https://img.shields.io/badge/Python-3.11.1-blue.svg)](https://www.python.org/downloads/release/python-3111/)
[![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-ff1709?style=flat&logo=django&logoColor=white&color=ff1709&labelColor=gray)](https://www.django-rest-framework.org/)

[![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=flat&logo=prettier&logoColor=white)](https://prettier.io/)
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=flat&logo=angular&logoColor=white)](https://angular.io/)

[![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)



# HospitalSys
Este repositorio contiene un sistema informático para la gestión recursos, horarios de uso y turnos de espera de un hospital, compuesto por un backend API desarrollado con Django Rest Framework 4.2.6 y un frontend construido con Angular 16.2.10.

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
