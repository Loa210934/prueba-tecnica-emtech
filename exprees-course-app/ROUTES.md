# API Routes Documentation

Este documento describe la estructura optimizada de rutas basada en controladores.

## Estructura General

### Base URL
- **Development**: `http://localhost:3000/api`

### Sistema de Rutas Automatizado

El proyecto utiliza un sistema de registro automático de rutas basado en controladores que permite:

1. **Registro automático de rutas RESTful**
2. **Configuración personalizada por controlador**
3. **Middleware específico por ruta o controlador**
4. **Documentación automática**

## Rutas Disponibles

### Health Check
- **GET** `/api/health` - Verificar estado de la API y rutas registradas

### Usuarios (`/api/users`)

#### Rutas CRUD Estándar
- **GET** `/api/users` - Listar todos los usuarios
- **POST** `/api/users` - Crear nuevo usuario
- **GET** `/api/users/:id` - Obtener usuario por ID
- **PUT** `/api/users/:id` - Actualizar usuario por ID

#### Rutas Personalizadas
- **GET** `/api/users/list/:limit?` - Listar usuarios con límite opcional
- **PATCH** `/api/users/:id/toggle` - Alternar estado del usuario

#### Rutas Futuras (Comentadas)
- **POST** `/api/users/setup` - Configurar usuario administrador

## Estructura de Archivos

```
src/
├── controllers/
│   ├── base.controller.ts          # Interfaces y tipos base
│   └── user.controller.ts          # Controlador de usuarios (implementa IController)
├── router/
│   ├── index.ts                    # Router principal con registro automático
│   ├── routes.config.ts            # Sistema de registro de rutas
│   ├── controller-routes.ts        # Generador automático de rutas
│   └── user.router.ts              # Configuración específica de rutas de usuario
└── middlewares/
    └── ErrorHandling.ts            # Middleware global de manejo de errores
```

## Cómo Agregar Nuevos Controladores

### 1. Crear el Controlador
```typescript
// src/controllers/example.controller.ts
import { Request, Response, NextFunction } from 'express';
import { IController } from './base.controller';

class ExampleController implements IController {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Implementación
  }
  
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Implementación
  }
  
  // Otros métodos...
}

export default new ExampleController();
```

### 2. Crear el Router
```typescript
// src/router/example.router.ts
import { ControllerRoutes } from './controller-routes';
import exampleController from '../controllers/example.controller';

const router = ControllerRoutes.generateRoutes({
  basePath: '/examples',
  controller: exampleController,
  // Opcional: rutas personalizadas
  routes: [
    { method: 'get', path: '/custom', handler: 'customMethod' }
  ]
});

export default router;
```

### 3. Registrar en el Router Principal
```typescript
// src/router/index.ts
import exampleRouter from './example.router';

routeRegistry.register({
  path: '/examples',
  router: exampleRouter,
  description: 'Example management endpoints'
});
```

## Ventajas del Sistema Optimizado

1. **Escalabilidad**: Fácil agregar nuevos controladores y rutas
2. **Consistencia**: Estructura estándar para todos los controladores
3. **Mantenibilidad**: Código organizado y fácil de mantener
4. **Documentación**: Generación automática de documentación de rutas
5. **Flexibilidad**: Permite rutas personalizadas manteniendo estándares RESTful
6. **Type Safety**: Uso de TypeScript para mayor seguridad de tipos

## Middleware

### Global
- **express.json()**: Parsing de JSON
- **express.urlencoded()**: Parsing de URL encoded
- **helmet()**: Seguridad HTTP
- **cors()**: Cross-Origin Resource Sharing
- **morgan()**: Logging de requests
- **ErrorHandler**: Manejo global de errores

### Por Controlador
Se pueden agregar middlewares específicos en la configuración del controlador:

```typescript
const router = ControllerRoutes.generateRoutes({
  basePath: '/users',
  controller: userController,
  middleware: [authMiddleware, validationMiddleware] // Middleware global para este controlador
});
```

### Por Ruta
Se pueden agregar middlewares específicos por ruta:

```typescript
const customRoutes = [
  { 
    method: 'post', 
    path: '/', 
    handler: 'create',
    middleware: [validationMiddleware] // Middleware específico para esta ruta
  }
];
```
