## Poke APP

- Esta es una aplicación que consume la API de pokeapi y muestra una lista de pokemones, puedes buscar por nombre, agregar a favoritos y ver los detalles de cada pokemon.
- para armar este proyecto se utilizó Vite, Vue 3, Pinia y Axios para las peticiones http.
- La libreria de Axios se integró a la aplicación mediante un plugin, para poder realizar las peticiones de manera más sencilla y centralizada, luego fue injectado al componente a traves de un inject.
- La aplicacion cuenta con 2 vistas, un home donde se muestra un mensaje de introduccion Y otra vista donde se muestra el listado de pokemones
- Una vez que se entra a la vista principal, se hace la consulta a la poke API para obtener la data, durante ese momento se muestra la animacion de un pokebola para indicarle al usuario que se estan cargando datos.
- El manejo de estado se realizó con Pinia, en ello se almacenaron los pokemones favoritos elegidos por el usuario.
- Los estilos que arman los componentes de la vista, estan centralizados en el directorio de assets, en el archivo base.css donde se encuentran todos los estilos base de la aplicacion.
- se creo la carpeta utils para centralizar los metodos que se desean reutilizar, en este caso se creó un metodo para formatear un texto (poner la primera letra en mayuscula)
- se integraron fuentes desde google font, para este caso se agregaron los links a html y se usaron en el css base.
- para formato y orden del codigo se usó prettier y eslint.

## Project Setup

```sh
 pnpm install
```

### Compile and Hot-Reload for Development

```sh
 pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
 pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
 pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
 pnpm lint
```
