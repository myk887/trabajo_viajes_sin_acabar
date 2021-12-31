# 17. Diseñar una API

A la hora de diseñar nuestra propia API debemos tener claros dos puntos:

-   Cuál será la estructura de nuestra base de datos.

-   Qué endpoints necesitamos.

Para realizar las explicaciones pertinentes tomaremos como ejemplo un API que permite a los usuarios publicar entradas sobre sus viajes, algo similar a un diario de viajes.

## Estructura de la base de datos

Lo primero será diseñar nuestra base de datos. Para ello debemos decidir cuáles son las tablas mínimas que necesitamos así como las columnas de cada una de ellas. Para facilitar este trabajo es recomendable crear un pequeño esquema con el nombre de cada tablas y sus campos. Pensando en el diario de viajes nuestro diseño podría ser:

### Tabla de entradas

-   id
-   place \*
-   description \*
-   idUser \*
-   createdAt
-   modifiedAt

### Tabla de fotos de una entrada

-   id
-   photo \*
-   idEntry \*
-   createdAt

### Tabla de votos de una entrada

-   id
-   vote \*
-   idEntry \*
-   idUser \*
-   createdAt

### Tabla de usuarios

-   id
-   email \*
-   password \*
-   name \*
-   avatar
-   role
-   active
-   deleted
-   registrationCode
-   recoverCode
-   createdAt
-   modifiedAt

> Marcamos con asterisco aquellos campos que sean requeridos para crear una nueva fila en dicha tabla. Si el campo es autogenerado no es necesario marcarlo (por ejemplo, el id).

## Endpoints

Ahora llegó el momento de definir nuestros endpoints. Recuerda que cuanto más esquematizado mejor, eso te facilitará el trabajo y evitará que tengas dudas sobre cómo empezar o cómo terminar. Sigamos con el ejemplo del diario de viajes:

### Endpoints de las entradas del diario

-   `GET /entries` - Obtener un listado de todas las entradas.
    -   **Cabecera auth:** No
    -   **Querystring:**
        -   search
        -   order
        -   direction
    -   **Retorna:** info de todas las entradas.

&nbsp;

-   `GET /entries/:idEntry` - Obtener una entrada en concreto.

    -   **Cabecera auth:** No
    -   **Queryparams:**
        -   idEntry
    -   **Retorna:** info de una entrada.

&nbsp;

-   `POST /entries` - Crear una entrada.

    -   **Cabecera auth:** Sí
    -   **Body:**
        -   place
        -   description
    -   **Retorna:** mensaje que indica que se ha creado una entrada.

&nbsp;

-   `PUT /entries/:idEntry` - Editar una entrada.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
    -   **Body:**
        -   place
        -   description
    -   **Retorna:** mensaje que indica que la entrada ha sido editada.

&nbsp;

-   `DELETE /entries/:idEntry` - Borrar una entrada.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
    -   **Retorna:** mensaje que indica que la entrada se ha eliminado.

&nbsp;

-   `POST /entries/:idEntry/photos` - Agregar una foto a una entrada.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
    -   **Body:**
        -   photo
    -   **Retorna:** mensaje que indica que la foto ha sido añadida.

&nbsp;

-   `DELETE /entries/:idEntry/photos/:idPhoto` - Eliminar una foto de una entrada.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
        -   idPhoto
    -   **Retorna:** mensaje que indica que la foto ha sido eliminada.

&nbsp;

-   `POST /entries/:idEntry/votes` - Votar una entrada.
-   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idEntry
    -   **Body:**
        -   vote
    -   **Retorna:** mensaje que indica que la entrada ha sido votada.

&nbsp;

### Endpoints de los usuarios

-   `POST /users` - Crear un usuario pendiente de activar.
    -   **Cabecera auth:** No
    -   **Body:**
        -   email
        -   password
        -   username
    -   **Retorna:** mensaje que indica que el usuario ha sido creado y que se debe verificar la cuenta.

&nbsp;

-   `GET /users/:idUser` - Obtener un usuario en concreto.
-   **Cabecera auth:** Sí

    -   **Queryparams:**
        -   idUser
    -   **Retorna:** info de un usuario.

&nbsp;

-   `GET /users/validate/:registrationCode` - Validar a un usuario recién registrado.

    -   **Cabecera auth:** No
    -   **Queryparams:**
        -   registrationCode
    -   **Retorna:** mensaje que indica que el usuario ha sido activado.

&nbsp;

-   `POST /users/login` - Hacer login y retornar un token.

    -   **Cabecera auth:** No
    -   **Body:**
        -   email
        -   password
    -   **Retorna:** un token.

&nbsp;

-   `PUT /users/:idUser` - Editar el nombre, email y avatar de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   avatar
        -   email
    -   **Retorna:** mensaje que indica que el usuario ha sido modificado.

&nbsp;

-   `PUT /users/:idUser/password` - Editar la contraseña de un usuario.

    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Body:**
        -   oldPassword
        -   newPassword
    -   **Retorna:** mensaje que indica que la contraseña ha sido modificada.

&nbsp;

-   `PUT /users/recover-password` - Enviar un correo con el código de reseteo de la contraseña.

    -   **Cabecera auth:** No
    -   **Retorna:** mensaje que indica que se ha enviado un mensaje de recuperación.

&nbsp;

-   `PUT /users/reset-password` - Cambiar la contraseña de un usuario con el código de reseteo.

    -   **Cabecera auth:** No
    -   **Body:**
        -   recoverCode
    -   **Retorna:** mensaje que indica que la entrada ha sido votada.

&nbsp;

-   `DELETE /users/:idUser` - Eliminar un usuario.
    -   **Cabecera auth:** Sí
    -   **Queryparams:**
        -   idUser
    -   **Retorna:** mensaje que indica que el usuario ha sido eliminado.
