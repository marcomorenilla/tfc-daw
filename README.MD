# BiciVal

## 1. Introducción

Se trata de una web pensada para implantar un sistema de reservas de bicicletas para los casos en los que no puedes transportarte a un destino con tu propia bicicleta.

Además pretende crear una comunidad de usuarios que puedan interactuar entre ellos a través de un foro y contar con un sistema de valoraciones y reseñas sobre las reservas realizadas.

Para su desarrollo se ha optado por una arquitectura de microservicios en el backend y astro junto con react para el frontend.


### Backend

Es una carpeta contenedora de microservicios de los cuales algunos están pendientes de implementar:

1. [x] Microservicio usuarios:

	- Encargado de gestionar toda la lógica de un CRUD completo de usuarios así como de autenticación y autorización a través de cookies y token **`JWT`**

	- Se apoya sobre una BBDD relacional **`PostgreSQL`**

2. [x] Microservicio foro

	- Encargado de gestionar las distintas categorías del foro, es un servicio de lectura y escritura.

Utiliza una BBDD NoSQL **`MongoDB`** dentro del servicio **`Atlas`** con el Free Tier.

3. [x] Microservicio imágenes

	- Se encarga de servir y subir imágenes.

	- Utiliza un contenedor **`MinIO`** alojado en mi ordenador personal que sirve como sistema de almacenamiento de objetos similar a **`AWS S3`** exponiendo una **`API`** para trabajar con él

4. [x] Microservicio bicicletas

	- Encargado de mostrar las bicicletas dentro de la web

	- Utiliza una BBDD NoSQL **`MongoDB`** dentro del servicio **`Atlas`** con el Free Tier.

5. [x] Microservicio reservas
	
	- Se responsabiliza de realizar las reservas
	
	- Utiliza como BBDD **`PostgreSQL`** 

6. [ ] Microservicio valoraciones: Pendiente de implementar

### Frontend

Aquí se encuentra el frontend organizado por páginas y funcionalidades.

Al ser la primera versión no está todo lo refactorizado que debiese y contiene mucho código repetido y lógica que debería moverse fuera de los componentes a hooks personalizados o a servicios independientes.

Dentro de la carpeta **`src`** encontramos varias carpetas importantes:

- **Pages**: define el archivo.astro que se renderiza
- **Layouts**: cada página renderiza un layout que contiene fragmentos HTML y un **`<slot/>`** donde se cargan los componentes.
- **Components**: Carpeta que a su vez se divide en carpetas que se corresponden con las páginas.
	- Además hay una carpeta extra que contiene todos los componentes necesarios para el **`NavBar`** y una carpeta shared para componentes que no pertenecen a una sola página
- **Services**: Contiene lógica para el login y registro y en siguientes versiones más lógica que no pertenece a los componentes.
- **Store**: Contiene contexto que es común a varios componentes a través del paquete **`nanostores`** astro permite compartir así información evitando la necesidad de usar el contexto de React
- **Styles**: Aunque el proyecto se desarrolla con **`TailwindCSS`** se definen animaciones personalizadas en **`global.css`**

## 2. Utilización:

### 2.1 Index

Dentro de esta página a la que accedemos a través del NavBar encontramos un resumen de las 6 bicicletas mejor valoradas dentro de la colección.

En caso que tengamos un usuario registrado e iniciemos sesión, se nos mostrará desbloqueado el botón **`Reservar`** que abre un modal para realizar una reserva.

Si no tenemos sesión iniciada, aparece  un mensaje en las tarjetas que indica que necesitamos iniciar sesión para poder reservar una bicicleta.

### 2.2 Catálogo

Aquí se muestra la colección completa de bicicletas y cuenta con un filtro avanzado para poder interactuar con el catálogo.

La parte del filtro que indica _En posesión_ está pendiente de implementar ya que depende directamente del sistema de reservas que todavía no funciona y pretende traer las bicicletas que se hayan reservado.

Actualmente devuelve toda la lista de bicicletas.

En caso que tengamos un usuario registrado e iniciemos sesión, se nos mostrará desbloqueado el botón **`Reservar`** que abre un modal para realizar una reserva.

Si no tenemos sesión iniciada, aparece  un mensaje en las tarjetas que indica que necesitamos iniciar sesión para poder reservar una bicicleta.

### 2.3 Foro

Es una ruta protegida mediante **`JWT`**, si no se dispone de un usuario, no se puede interactuar con esta página.

Si se dispone de un usuario encontraremos cuatro categorías dentro del foro

1. General: Para una temática libre
2. Rutas: Pensado para compartir las rutas realizadas o planificadas entre la comunidad.
3. Quedadas: Se pueden buscar compañeros para realizar rutas como anunciar rutas entre compañeros para quedar.
4. Mecánica: Destinado a resolución de problemas y dudas de mantenimiento.

Dentro del Foro solamente se pueden leer mensajes publicados en la categoría o pulsando sobre el botón + añadir un mensaje nuevo de texto en esta primera versión y planificado añadir archivos multimedia en la hoja de ruta de la aplicación.

### 2.4 Perfil

Para acceder al perfil debemos estar logueados y pulsar sobre la imagen de usuario del navbar, esto abrirá una barra lateral que nos dará la opción de ir al perfil o cerrar sesión.

Dentro del perfil tenemos la opción de actualizar la imagen, actualizar nuestros datos personales o eliminar nuestro usuario completando así el CRUD.

De momento no se permite cambiar contraseña debiendo notificar al administrador si se desea realizar un cambio.


## 3. Despliegue

> [!NOTE] 
> - Este proyecto no está pensado para desplegarse en un equipo personal ya que se requieren conocimientos técnicos para ello.
> - En caso de querer desplegarlo en modo desarrollo para mejorarlo o hacer algún pull request sigue estas instrucciones.

1. Instala docker, docker compose, node, npm, yarn, pnpm en tu máquina
2. Clona el repositorio en tu máquina.

``` sh
git clone https://github.com/marcomorenilla/tfc-daw

```
5. Dirígete a la carpeta backend

``` sh
# Linux y MacOS
cd tfc-daw/backend

```

``` sh 
#Windows
cd tfc-daw\backend

``` 
6. Levanta los contenedores

```sh
docker compose up -d

```
6. Dirígete a la carpeta frontend


``` sh 
# Linux y MacOS
cd ../frontend

```

``` sh
# Windows
cd ..\backend

``` 

7. Ejecuta el script de inicio para iniciar el proyecto en modo desarrollo

```sh
npm run dev

``` 
8. Dirígete a `http://localhost:4321` para ver el frontend.


## 4. Colaboración

Cualquier problema o sugerencia de mejora siempre es bien recibida.

Siéntete libre de abrir **Issues** o hacer un **Pull Request**
