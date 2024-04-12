[![Python: Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Python](https://img.shields.io/badge/Python-3.11.1-blue.svg)](https://www.python.org/downloads/release/python-3111/)
[![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-ff1709?style=flat&logo=django&logoColor=white&color=ff1709&labelColor=gray)](https://www.django-rest-framework.org/)
[![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=flat&logo=prettier&logoColor=white)](https://prettier.io/)
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)



# HospitalSys

<table>
<tr>
<td>
  Este repositorio contiene un sistema informático para la gestión recursos, horarios de uso y turnos de espera de un hospital, compuesto por un backend API desarrollado con Django Rest Framework 4.2.6, un frontend construido con Angular 16.2.10 y una base de datos MySQL.
</td>
</tr>
</table>

## Índice
* [Despliegue](#despliegue)
* [Tecnologías](#tecnologías)
* [Configuración](#configuración)
    * [Configuración local](#configuración-local)
    * [Configuración con Docker](#configuración-con-docker)
* [Estilo de código](#estílo-de-código)

## Despliegue

El proyecto ha sido desplegado y está disponible en línea. Puedes acceder a él a través del siguiente enlace:

[https://hospitalsys.vercel.app/](https://hospitalsys.vercel.app/)

Este enlace te llevará a la instancia desplegada del proyecto, donde podrás interactuar con la aplicación en vivo.

## Tecnologías
Proyecto creado con:
* Django REST Framework: 4.2.6
* Angular: 16.2.10
* Bootstrap: 5.3
* MySQL
	
## Configuración
Datos para iniciar sesión en el sistema habiendo usado el volcado de datos del fichero `dump.json`:
* __Administrativo__
  * Usuario: root
  * Contraseña: root

* __Médico__
  * Usuario: amalamillo
  * Contraseña: aeme

* __Paciente__
  * Usuario: 78901234G
  * Contraseña: isabeldiaz

### Configuración local

#### Paso 1: Clonar repositorio

```
git clone https://github.com/anmamebo/tfg-project.git
```

#### Paso 2: Instalar dependencias
Asegúrate de tener Python y Node.js instalados en tu sistema. Luego, instala las dependencias del proyecto:

```
cd tfg-project
```

##### Python
```
cd django-app
```
```
pip install -r requirements.txt
```

##### Node.js
```
cd angular-app
```
```
npm install
```

#### Paso 3: Configurar la base de datos
Crea una base de datos MySQL y configura las credenciales correspondientes en el archivo de configuración ```settings.py```

#### Paso 4: Realizar migraciones
```
python manage.py makemigrations
```
```
python manage.py migrate
```

#### Paso 5: Cargar datos Base de Datos
```
python manage.py loaddata dump.json
```

#### Paso 6: Ejecutar el servidor Django
En una terminal, dentro del directorio ```django-app```, ejecuta:
```
python manage.py runserver
```

### Paso 7: Ejecutar el servidor Angular
En una nueva terminal, dentro del directorio ```angular-app```, ejecuta:
```
npm start
```

Ahora puedes acceder a la aplicación Django REST en [http://localhost:8000/](http://localhost:8000/) y al frontend Angular en [http://localhost:4200/](http://localhost:4200/).

## Estílo de código

Este proyecto sigue ciertas convenciones de estilo de código para mantener una base de código consistente y legible. Se utilizan las siguientes herramientas para el formateo automático del código:

### Python: Black

El código Python en este proyecto se formatea automáticamente utilizando Black. Black es una herramienta de formateo de código Python que garantiza que todo el código esté formateado de manera consistente. Se recomienda ejecutar Black antes de enviar cambios al repositorio para mantener la coherencia en el estilo de código.

Para instalar Black y formatear el código Python, puedes ejecutar el siguiente comando:

```
pip install black
```

```
black .
```

### TypeScript, HTML, SCSS, etc...: Prettier

El código TypeScript, HTML, SCSS, entre otros, en este proyecto se formatea automáticamente utilizando Prettier. Prettier es una herramienta de formateo de código que garantiza que el código JavaScript, TypeScript, HTML, CSS, SCSS y otros lenguajes estén formateados de manera consistente y legible. Se recomienda ejecutar Prettier antes de enviar cambios al repositorio.

Para instalar Prettier y formatear el código, puedes ejecutar el siguiente comando en el directorio raíz del proyecto:

```
npm install --save-dev --save-exact prettier
```

```
prettier --write .
```
