# Panel de Utilidades (Utility Dashboard)

Una aplicación web moderna y responsive que proporciona 5 utilidades útiles en una sola interfaz, construida con HTML, CSS y JavaScript vanilla sin dependencias externas.

## Características

- **Diseño Responsive**: Se adapta perfectamente a móviles y escritorio
- **Modo Oscuro/Claro**: Toggle para cambiar entre temas
- **Navegación por Pestañas**: Sin recargar la página
- **Validación de Formularios**: Mensajes de error claros para el usuario
- **Persistencia de Datos**: La lista de tareas se guarda en localStorage

## Utilidades Incluidas

1. **Conversor de Monedas**: Convierte entre 7 monedas principales con tasas simuladas
2. **Calculadora IMC**: Calcula el índice de masa corporal con clasificación OMS
3. **Lista de Tareas**: To-do list con persistencia en localStorage
4. **Generador de Contraseñas**: Crea contraseñas seguras con opciones personalizables
5. **Conversor de Unidades**: Convierte longitud, peso y temperatura

## Estructura del Proyecto

```
utility-dashboard-test/
├── index.html              # Página principal con estructura HTML
├── css/
│   └── styles.css          # Estilos responsive con variables CSS
├── js/
│   ├── main.js             # Navegación por pestañas y modo oscuro
│   ├── currency-converter.js # Conversor de monedas
│   ├── bmi-calculator.js   # Calculadora de IMC
│   ├── todo-list.js        # Lista de tareas
│   ├── password-generator.js # Generador de contraseñas
│   └── unit-converter.js   # Conversor de unidades
├── data/
│   └── rates.json          # Tasas de cambio simuladas
├── netlify.toml            # Configuración de despliegue Netlify
└── README.md              # Este archivo
```

## Cómo Ejecutar Localmente

### Opción 1: Abrir directamente en el navegador
1. Clona o descarga este repositorio
2. Abre el archivo `index.html` en tu navegador

### Opción 2: Usar un servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (usando http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, animaciones, media queries
- **JavaScript Vanilla (ES6+)**: Sin frameworks ni dependencias
- **localStorage**: Para persistencia de datos
- **Fetch API**: Para cargar datos JSON locales

## Características Técnicas

- Validación de formularios con mensajes de error visibles
- Manejo de errores con feedback al usuario
- Código modular (un archivo JS por utilidad)
- Variables CSS para temas
- Animaciones suaves
- Accesibilidad (labels, aria-labels)

## Despliegue

Este proyecto está configurado para desplegarse automáticamente en Netlify. La configuración se encuentra en `netlify.toml`.

### Despliegue Manual en Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio de GitHub
3. Netlify detectará automáticamente que es un sitio estático
4. Configura los ajustes de build (no necesarios para sitios estáticos)
5. Haz clic en "Deploy site"

## Contribución

Este proyecto fue creado como una prueba técnica. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Autor

Creado como proyecto de prueba técnica.

---

**Nota**: Las tasas de cambio en `data/rates.json` son simuladas y solo para fines demostrativos. Para un entorno de producción, deberías usar una API real de tasas de cambio.
