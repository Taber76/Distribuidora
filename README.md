![Badge en Desarollo](https://img.shields.io/badge/STATUS-DEVELOPING-yellow)   ![Badge en Desarollo](https://img.shields.io/badge/NODEJS-blue) ![Badge en Desarollo](https://img.shields.io/badge/REACTJS-blue)

[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,express,mongodb,vercel,react,redux,vite,tailwind,github,postman,vscode&perline=6)](https://skillicons.dev)
# Sistema de gestion de ordenes de compra

## Backend
El backend de este proyecto está desarrollado utilizando Node.js y Express.js para la creación de una API REST. Se ha optado por el uso de TypeScript para aprovechar sus beneficios de tipado estático y mejorar la mantenibilidad del código. La persistencia de datos se realiza mediante MongoDB.

### Las principales características del backend incluyen:
- Registro y autenticación de usuarios, con la utilización de tokens JWT (JSON Web Tokens) para gestionar la autenticación de forma segura.
- Gestión de órdenes de compra, productos, contactos y usuarios. Los usuarios pueden crear, editar y eliminar estos recursos según sus roles y permisos.
- Control de acceso basado en roles, donde se distinguen dos tipos de usuarios: vendedores y administradores. Los administradores tienen privilegios adicionales, como la capacidad de generar facturas.
- Seguridad: Se implementan medidas de seguridad como la encriptación de contraseñas y la validación de datos para proteger la integridad de la aplicación y los datos de los usuarios.
- Arquitectura basada en capas: El código está organizado siguiendo una arquitectura que separa la lógica de negocio, la capa de acceso a datos y las rutas de la API, lo que facilita la escalabilidad y el mantenimiento del sistema.
- El backend se encarga de manejar todas las solicitudes HTTP entrantes desde el cliente, procesarlas según la lógica de negocio definida y devolver las respuestas correspondientes, ya sea datos de la base de datos, mensajes de error o confirmaciones de operaciones exitosas.

## Frontend
El frontend de este proyecto está construido utilizando React.js como biblioteca principal para el desarrollo de interfaces de usuario interactivas y dinámicas. Se ha optado por Vite como herramienta de construcción rápida y eficiente para el desarrollo de aplicaciones web modernas. Redux se utiliza para la gestión del estado global de la aplicación, permitiendo un flujo de datos predecible y una fácil escalabilidad. Tailwind CSS se utiliza para el diseño y estilizado rápido y eficiente de la interfaz de usuario, aprovechando su enfoque de utilidad primero.

### Las características principales del frontend incluyen:
- Componentización: El frontend está dividido en componentes reutilizables, lo que facilita la organización y la reutilización del código.
- Enrutamiento: Se utiliza React Router para la navegación entre diferentes vistas de la aplicación de forma dinámica y sin recargar la página.
- Gestión del estado: Redux se encarga de gestionar el estado global de la aplicación, permitiendo un flujo de datos unidireccional y una fácil sincronización entre los componentes.
- Estilizado: Tailwind CSS proporciona un conjunto completo de utilidades de estilo que permiten diseñar rápidamente interfaces de usuario atractivas y responsivas.
- Eficiencia: Vite proporciona un entorno de desarrollo rápido y eficiente, con una rápida recarga en caliente y un tiempo de compilación optimizado.
- El frontend interactúa con el backend a través de solicitudes HTTP para obtener y enviar datos, y utiliza Redux para gestionar el estado de la aplicación de manera centralizada. La interfaz de usuario se actualiza de manera reactiva en respuesta a los cambios en el estado de la aplicación, proporcionando una experiencia de usuario fluida y receptiva.
