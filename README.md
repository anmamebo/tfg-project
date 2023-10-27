# tfg-project

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
