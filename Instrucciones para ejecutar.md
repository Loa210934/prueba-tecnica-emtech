# Instrucciones para ejecutar el Backend (Node.js + Express) y el Frontend (React + Vite)

## Requisitos previos

- Node.js y npm instalados en tu sistema.

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/Loa210934/prueba-tecnica-emtech.git
cd prueba-tecnica-emtech
```

---

## 2. Ejecutar el Backend

1. Ve a la carpeta del backend:
  ```bash
  cd exprees-course-app
  ```
2. Instala las dependencias:
  ```bash
  npm install
  ```
3. Configura el archivo .env 

    ```bash
    NODE_ENV=dev
    PORT=3000
    PROJECT_NAME=express-course-app
    DATABASE_URI=mongodb+srv://loa:HTUvQMszQs5mkn5w@cluster0.awj4wf7.mongodb.net
    JWT_SECRET=supersecreto
    JWT_EXPIRATION_MINUTES=86400
    ```

4. Inicia el servidor:

  ```bash
  npm run start
  ```
   El backend debería estar corriendo en `http://localhost:3000` (o el puerto configurado).

---

## 3. Ejecutar el Frontend

1. Ve a la carpeta del frontend:
  ```bash
  cd ../online-course-app-react
  ```
2. Instala las dependencias:
  ```bash
  npm install
  ```
3. Configura el archiv .env 
  ```
  VITE_BASEURL=http://localhost:3000/api
  ```
3. Inicia la aplicación:
  ```bash
  npm run dev
  ```
   El frontend estará disponible en `http://localhost:5173` (o el puerto configurado).

---

## 4. Notas

- Asegúrate de que el backend esté corriendo antes de iniciar el frontend.
- Configura las variables de entorno si es necesario (por ejemplo, URLs de API).

*Los Usuarios se pueden crear en la sección de register*

Sin embargo este es un Usuario ya registrado con datos de ejemplo 

email: test@test.com
password: test