# Panel de Utilidades (Utility Dashboard)

Aplicación web con **HTML, CSS y JavaScript vanilla** que reúne 5 utilidades cotidianas en un panel con navegación por pestañas, diseño responsive y modo oscuro/claro.

## Utilidades incluidas

| Utilidad | Descripción |
|----------|-------------|
| **Conversor de monedas** | Convierte entre 11 monedas usando tasas simuladas (`data/exchange-rates.json`) |
| **Calculadora de IMC** | Calcula el índice de masa corporal y muestra la categoría correspondiente |
| **Lista de tareas** | To-Do list con persistencia en `localStorage` |
| **Generador de contraseñas** | Crea contraseñas seguras con opciones de longitud, números y símbolos |
| **Conversor de unidades** | Convierte longitud, peso y temperatura |

## Estructura del proyecto

```
utility-dashboard-test/
├── index.html          # Landing page con pestañas
├── css/
│   └── styles.css      # Estilos globales, responsive y temas
├── js/
│   ├── app.js          # Navegación, tema y bootstrap
│   ├── utils.js        # Validación y helpers compartidos
│   ├── currency.js     # Conversor de monedas
│   ├── bmi.js          # Calculadora IMC
│   ├── todo.js         # Lista de tareas
│   ├── password.js     # Generador de contraseñas
│   └── units.js        # Conversor de unidades
├── data/
│   └── exchange-rates.json
├── netlify.toml        # Configuración de despliegue
└── README.md
```

## Cómo ejecutarlo localmente

No requiere instalación de dependencias. Solo un servidor HTTP local (los módulos ES6 y `fetch` no funcionan con `file://`).

### Opción 1: Python

```bash
# Python 3
python -m http.server 8080
```

Abre [http://localhost:8080](http://localhost:8080)

### Opción 2: Node.js (npx)

```bash
npx serve .
```

### Opción 3: Extensión Live Server (VS Code / Cursor)

Abre `index.html` con la extensión **Live Server**.

## Características técnicas

- **Sin frameworks** — JavaScript vanilla con módulos ES6
- **Responsive** — Adaptado a móvil y escritorio
- **Modo oscuro/claro** — Toggle con persistencia en `localStorage`
- **Validación de formularios** — Mensajes de error visibles al usuario
- **Accesibilidad** — Roles ARIA en pestañas y alertas en resultados

## Despliegue

El proyecto está configurado para desplegarse en [Netlify](https://www.netlify.com/) como sitio estático. Ver `netlify.toml`.

## Licencia

Proyecto de demostración — uso libre.
