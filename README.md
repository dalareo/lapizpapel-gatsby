# Lapiz y papel

Una propuesta de e-learning de bajo coste con Gatsby, NetlifyCMS y Auth0. 

## Objetivo
El objetivo es disponer de un LMS que consuma los recursos en formato Markdown desde un repositorio Git y que eventualmente los pueda editar para almacenarlos nuevamente en otro repositorio personal en el que el usuario pueda tener una traza de sus progreso y almacenar los contenidos creados o modificados.

## Contenidos
Para esta prueba de concepto se utilizan contenidos de prueba incorporados en la carpeta `content/units`

## Despliegue en la web
Existe una versión desplegada como un sitio web estático, susceptible de distribuirse integramente a través de CDN, en https://awesome-brattain-e95477.netlify.app/

El frontend de este proyecto usa Gatsby. Para la integración del repositorio con el servicio de despliegue y el backend de gestión de contenidos utiliza NetlifyCMS.

El sistema de autenticación implementado usa Auth0.

## Despliegue en local

Debes proporcionar las varialble de entorno necesarias. Una manera sencilla es incorporar un archivo .env.development con los siguientes valores:

```
# ./.env.development
# Get these values at https://manage.auth0.com
GATSBY_AUTH0_DOMAIN=dev-<id>.eu.auth0.com
GATSBY_AUTH0_CLIENTID=<client_id>
GATSBY_AUTH0_CALLBACK=http://localhost:8000/callback
```

Sustituye el ID y el CLIENT_ID por los valores que te proporcione tu cuenta de Auth0.

Para consultar la interfaz de administración en un entorno local, en la dirección http://localhost:8000/admin debes ejecutar, antes de lanzar el sitio web con `gatsby develop` un proxy que habilita el panel de administración sin autenticación con el comando `npx netlify-cms-proxy-server`
