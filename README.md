# CMPC - BackEnd

Este repositorio contiene el desarrollo del BackEnd para la Prueba Técnica de CMPC. La aplicación gestiona libros con relaciones, autenticación segura y registro de auditoría, construida con **NestJS**, **Sequelize** y **PostgreSQL**, bajo el enfoque de **Clean Architecture (Hexagonal)**.

---

## Tecnologías

- NestJS
- PostgreSQL
- Sequelize
- JWT (autenticación)
- Swagger (documentación)
- Multer (upload de archivos)
- class-validator (validaciones)
- json2csv (exportación CSV)

---

## Estructura de Carpetas (Clean Architecture)

```bash
src/
├── modules/
│   ├── book/              # Libros (entidad principal)
│   ├── author/            # Relación
│   ├── genre/             # Relación
│   ├── editorial/         # Relación
│   ├── audit/             # Logs de auditoría
│   └── auth/              # Registro y login
├── common/                # Pipes, decoradores, constantes
└── main.ts
```

---

## Configuración

Crea un archivo `.env` siguiendo el ejemplo del archivo .env-example con los siguientes valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gesfire_db
DB_USERNAME=postgres
DB_PASSWORD=tu_password

JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d

FRONT_URL=URLFRONT
```

---

## Comandos útiles

### Instalar dependencias

```bash
npm install
```

### Migrar base de datos

```bash
npx sequelize-cli db:migrate
```

### Cargar seeders

```bash
npx sequelize-cli db:seed:all
```

### Levantar servidor

```bash
npm run start:dev
```

---

## Autenticación

- Registro de usuario: `POST /auth/register`
- Login de usuario: `POST /auth/login`
- Se genera token JWT, necesario para rutas protegidas (`Authorization: Bearer <token>`)

---

## Funcionalidades `Book`

- CRUD completo con validaciones
- Relaciones: `author`, `genre`, `editorial` (foreign keys)
- Subida de imágenes (guardadas en `/public/images/books`)
- Exportación a CSV con soporte para tildes
- Filtros dinámicos y ordenamiento
- Soft Delete con `deletedAt`

---

## Auditoría

Cada acción sensible genera un log en la tabla `audit_logs`:

| Campo     | Descripción                      |
| --------- | -------------------------------- |
| userId    | ID del usuario que ejecutó       |
| action    | Acción (`CREATE`, `UPDATE`, ...) |
| module    | Módulo afectado (`Book`, ...)    |
| data      | Datos modificados (JSON)         |
| createdAt | Fecha y hora                     |

---

## Swagger

La API está documentada automáticamente:

[http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## Exportación CSV

- Endpoint: `GET /books/export`
- Respuesta: archivo `.csv` codificado en UTF-8 con BOM
- Compatible con Excel en español (delimitador `;`)
- Incluye: título, autor, editorial, género, precio, fecha, disponible

---

## Rutas protegidas

Todas las rutas salvo `auth` requieren autenticación JWT. Usa el botón “Authorize” en Swagger para probar.

---

## Autor

Prueba Técnica BackEnd realizada por **Anibal Cordero Cortez** para **CMPC**.
