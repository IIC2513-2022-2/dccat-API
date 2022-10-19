# Wild DrunKing :tropical_drink:

**Grupo:** Web-0

**Integrantes:** Antonia González, Jorge Guzmán y Natalia Zamorano

## Entrega 2

### Modelo
La realización del modelo se realizó implementando Node Js. Se utilizaron los componentes de Koa, los que corresponden al router, middlewares y controllers. Con esto realizamos la arquitectura modelo vista controlador.

En cuanto al modelo: 
Se hizo la implementación de los modelos User, Match y UserMatch con la utilización de sequelize, se corrieron las migraciones para saber que cambios en las base de datos se realizaron, esto con la utilización de postgres, se realizaron las asociaciones correspondientes dentro de los modelos, finalmente utilizamos seeds para poblar las tablas.

Para encontrar problemas o errores se utilizó un linter llamado EsLint.

### Componentes

En el siguiente árbol se puede observar la estructura general de los componentes y subcomponentes dentro de la carpeta src del repositorio del backend

'''
-app.js

-config -config.js

-index.js

-migrations -20221014215737-create-user.js
            -20221015015959-create-match.js
            -20221016220634-add-match-status.js
            -20221016230049-create-user-match.js 
            
-models     -index.js
            -match.js
            -user.js
            -usermatch.js
-routes     -matches.js
            -usermatches.js
            -users.js
-routes.js

-seeders -20221017214005-seed-users.js
         -20221017214018-seed-matches.js
         -20221017214031-seed-usermatches.js
'''
### Juego

Dentro del juego, lo que está implementado es:
- Cambios de turno 
- Lanzamiento del dado
Estas implementaciones se realizaron con los métodos GET y POST dentro de la carpeta src-routes-usermatches.js
