# Random Trips — Landing República Dominicana

## Contexto del proyecto

Landing page para promocionar una experiencia de viaje de **8 días / 7 noches** por República Dominicana, organizada por Random Trips con los hosts **Bernat Moreno** y **Randy García**.

- **Fechas**: Del miércoles 2 al viernes 11 de septiembre
- **Objetivo**: convertir visitantes en reservas (CTAs: RESERVAR + WhatsApp)
- **Idioma**: Español (RD)
- **Vibra**: premium, tropical, cinemática. Debe sentirse como un trailer de viaje, no como un formulario.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Estilos**: Tailwind CSS
- **UI**: shadcn/ui (Accordion, Button, Card)
- **Iconos**: lucide-react
- **Animaciones**: GSAP + `@gsap/react` (hook `useGSAP`)
- **Plugins GSAP**: ScrollTrigger, SplitText, ScrollSmoother (opcional)
- **Fuentes**: `next/font/local`
- **Deploy**: Vercel

## Design tokens

### Colores
- `rojo-principal`: `#f23540` — color de marca principal, botón RESERVAR, acentos fuertes, banda "Descargar PDF"
- `amarillo`: `#feda40` — acentos, badges, detalles decorativos
- `crema`: `#fef0dc` — fondo general cálido (alternativa al blanco puro)
- `azul`: `#1d86f9` — bloques de itinerario, fondos hero superior, headers azules
- `aqua`: `#15bebe` — acentos secundarios, detalles de mar/agua
- `whatsapp-green`: `#25D366` — botón WhatsApp (color oficial, no cambiar)
- `white`: `#FFFFFF`
- `ink`: `#1a1a1a` — texto principal sobre fondos claros

Estos colores deben quedar en `tailwind.config.ts` bajo `theme.extend.colors` con estos nombres exactos:
```ts
colors: {
  'rojo-principal': '#f23540',
  amarillo: '#feda40',
  crema: '#fef0dc',
  azul: '#1d86f9',
  aqua: '#15bebe',
  whatsapp: '#25D366',
}
```

### Tipografía

Archivos en `/public/font/`, cargados con `next/font/local` en `app/layout.tsx`. **Mapeo verificado nodo por nodo contra el Figma** (`Landing Page Random Trips`, file key `bsLqRlBDgAlr22p04Gbhwm`) — el diseño usa SOLO 3 familias:

- **`DonJose_Raices.otf`** → `font-raices` — **SOLO** los 2 títulos display "REPUBLICA DOMINICANA" (hero superior, ~134px en Figma, y hero atardecer). Nota: en Figma "CARIBE" usa el estilo *Don José Trayecto*, del cual no tenemos archivo — se renderiza con Raíces hasta conseguirlo.
- **`Blur Bold.ttf`** → `font-blur` — headers de sección ("LO QUE VIVIREMOS", "ITINERARIO DEL VIAJE", "CONOCE LOS HOSTS"…, 64px en Figma), "8 DÍAS Y 7 NOCHES", pills "DÍA X:" (40px azul), **todos los botones** (RESERVAR, DESCARGAR, WHATSAPP), labels de los pins del mapa (blanco sobre pill roja con borde blanco) y nombres de hosts.
- **`Montserrat-VariableFont_wght.ttf`** → `font-montserrat` — **todo lo demás**. Variable font; los pesos marcan la jerarquía:
  - **Bold (700)**: "Explora" / "Descubre la", "El corazón del" / "como pocos la conocen.", "Ruta:", títulos de cards de destinos (24px), títulos de días en el acordeón (36px azul), preguntas del FAQ, énfasis inline (`<strong>`), badges del hero
  - **Medium (500)**: descripción del hero (20px), "Contáctanos", roles de hosts
  - **Regular (400)**: párrafos de lectura (intro del mapa 20px, bio de hosts 16px, respuestas FAQ, subtítulos de cards 16px) — con spans **Bold** para énfasis inline

**NO usadas en el diseño de Figma**: `helveticanowtext-bold-demo.ttf` y `MyriadPro-Regular.otf` (los archivos permanecen en `/public/font/` pero ya no se cargan en `layout.tsx` ni se exponen en `globals.css`). No reintroducirlas sin verificar contra el diseño.

**Regla de aplicación:**
```
Display decorativo (2 usos únicos)         → DonJose_Raices (font-raices)
Headers de sección / botones / pills DÍA X → Blur Bold (font-blur)
Todo lo demás (subtítulos, labels, texto)  → Montserrat (font-montserrat + font-bold/font-medium)
```

Las fuentes se registran como CSS variables en `app/globals.css` bajo `@theme inline` (Tailwind v4, sin `tailwind.config.ts`):
```css
@theme inline {
  --font-raices: var(--font-raices);
  --font-blur: var(--font-blur);
  --font-montserrat: var(--font-montserrat);
}
```

### Espaciado y forma
- Botones: `rounded-full` (pill), uppercase, bold, `px-6 py-3`
- Cards: `rounded-2xl`
- Contenedores grandes (bloques azules): `rounded-3xl`
- Spacing entre secciones: `py-16 md:py-20 lg:py-24`
- Container: `max-w-7xl mx-auto px-4 md:px-6` (compartido por TODAS las secciones de la landing para que el margen izquierdo quede alineado en toda la página)

## Estructura de carpetas

```
/
├── CLAUDE.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LoQueViviremos.tsx
│   │   ├── Destinos.tsx
│   │   ├── Itinerario.tsx
│   │   ├── IncluyeNoIncluye.tsx
│   │   ├── Sponsors.tsx
│   │   ├── Host.tsx
│   │   ├── Planes.tsx
│   │   ├── ParaTi.tsx
│   │   ├── BandaPDF.tsx
│   │   ├── HeroAtardecer.tsx
│   │   ├── FAQ.tsx
│   │   └── CTAFinal.tsx
│   ├── animations/       ← wrappers reutilizables de GSAP
│   │   ├── FadeInUp.tsx
│   │   ├── SplitTextReveal.tsx
│   │   └── StaggerChildren.tsx
│   ├── ui/               (shadcn primitives)
│   └── shared/           (Logo, Button variants)
├── lib/
│   ├── data/             (copy tipado)
│   └── gsap.ts           ← registro central de plugins
├── public/
│   ├── images/
│   ├── logos/
│   └── fonts/
└── tailwind.config.ts
```

## Convenciones

- **Todo Tailwind**, sin inline styles ni CSS modules ni styled-components
- **Mobile-first**: clases sin prefijo son mobile; `md:` y `lg:` para escalar
- **Data separada**: copy repetitivo en `/lib/data/*.ts` tipado
- **Imágenes**: siempre `next/image` con `alt` descriptivo en español y `sizes` correcto
- **Server vs Client**: sections estáticas = Server Components (default); **cualquier sección con GSAP debe ser `"use client"`**
- **Animaciones**: SIEMPRE con `useGSAP()` de `@gsap/react` (nunca `useEffect` a pelo)
- **Sin librerías nuevas** sin confirmar

---

## 🎬 Animaciones GSAP

### Setup base

Instalar:
```bash
npm install gsap @gsap/react
```

Crear `/lib/gsap.ts` para registrar plugins una sola vez:
```typescript
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
```

**Notas de licencia**: GSAP es 100% gratis desde mayo 2025 (Webflow lo adquirió). Todos los plugins premium (SplitText, ScrollSmoother, MorphSVG, DrawSVG) son libres para uso comercial. No hace falta Club GreenSock.

### Reglas obligatorias

1. **Siempre `useGSAP()`**, nunca `useEffect` con GSAP suelto. Maneja cleanup automático y evita bugs con React Strict Mode:
   ```tsx
   import { useGSAP } from "@gsap/react";
   const container = useRef<HTMLDivElement>(null);
   useGSAP(() => { /* animación */ }, { scope: container });
   ```

2. **Siempre respetar `prefers-reduced-motion`** con `gsap.matchMedia()`:
   ```tsx
   useGSAP(() => {
     const mm = gsap.matchMedia();
     mm.add("(prefers-reduced-motion: no-preference)", () => {
       // animaciones aquí
     });
   }, { scope: container });
   ```

3. **ScrollTrigger con `once: true`** en reveals para performance (no re-anima al scrollear arriba)

4. **`will-change` moderado**: solo en elementos que se animan constantemente (hero), no en scroll reveals puntuales

5. **Timeline sobre tweens sueltos** cuando hay 2+ animaciones coordinadas en el mismo elemento

5b. **Preferir `fromTo` sobre `from`** en reveals con ScrollTrigger: con React Strict Mode (doble montaje en dev), `gsap.from()` puede capturar como valor final el estado ya contaminado del primer montaje y dejar elementos atascados (ej. botones congelados en `scale: 0.6`). `fromTo` con valores explícitos es inmune. Bug real encontrado en CTAFinal.

6. **Duración por defecto**: `0.8-1.2s` para reveals, `0.3-0.5s` para hovers/microinteracciones

7. **Easing por defecto**: `"power3.out"` para reveals, `"power2.inOut"` para loops, `"back.out(1.7)"` solo en momentos playful (pins del mapa)

### Prioridad por sección

Ordenado de **imprescindible** a **opcional**. Si el tiempo se acaba, corta desde abajo.

#### 🔥 Imprescindibles

**1. Hero superior (Explora RD)**
- SplitText en "REPUBLICA DOMINICANA": entrada char-by-char con stagger 0.03s, fade + y:100 → 0
- Descripción y CTA fade-in con delay de 0.6s después del título
- Los pins del mapa aparecen secuencialmente con `back.out(1.7)` (playful, uno cada 0.15s)
- El botón RESERVAR con pulso sutil en loop (`scale: 1 → 1.05`, `yoyo: true, repeat: -1, duration: 1.2`)

**2. Hero atardecer (Descubre la RD)**
- SplitText en "REPUBLICA DOMINICANA" con efecto de máscara (clip-path revealing de abajo hacia arriba)
- Parallax en la foto de fondo con ScrollTrigger (`scrub: true`, `yPercent: -20`)
- El barco con balanceo sutil (`rotation: ±1deg, yoyo: true`)

**3. Cards de destinos (3 cards)**
- Stagger reveal on scroll: cada card entra con `y: 60, opacity: 0 → 1`, stagger 0.15s
- ScrollTrigger `start: "top 80%"`, `once: true`
- Hover: `scale: 1.03` + sombra crece, duración 0.3s

**4. Itinerario (títulos DIA X)**
- Cuando el usuario abre un DIA, la imagen y descripción entran con fade + slide-in horizontal
- Los pills DIA X entran con stagger cuando el usuario scrollea a la sección (`x: -30 → 0`)

#### ⭐ Recomendadas

**5. Cards de planes (Asegura tu cupo)**
- Reveal on scroll con stagger, plan 2 (central) entra con `scale: 0.9 → 1` más marcado
- Hover: `y: -8, scale: 1.02, shadow crece`
- Al hover, los items del listado aparecen con stagger de 0.05s (efecto "check-list")

**6. Contadores animados**
- "8 DÍAS Y 7 NOCHES" con contador que sube de 0 → 8 y 0 → 7 al entrar en viewport
- Usar GSAP + `onUpdate` con `Math.floor`

**7. Sección "Lo que viviremos"**
- Texto largo entra con SplitText por palabras (`type: "words"`) con stagger 0.02s
- Los pins del mapa aparecen uno a uno; opcional: DrawSVG en paths de conexión

**8. Banda "Descargar PDF" (coral)**
- Entrada con reveal desde abajo + botón con hover `scale + shadow-glow`

#### 💫 Opcionales (si sobra tiempo)

**9. ScrollSmoother global**
- Smooth scroll con inercia sutil (`smooth: 1, effects: true`)
- Ojo: puede romper sticky headers y comportamientos móviles. Desactivar en mobile.

**10. Cursor personalizado**
- Solo desktop: círculo que sigue al mouse y crece en hovers de CTAs

**11. Transición entre secciones**
- Overlay de color que barre horizontalmente entre secciones (efecto Awwwards). Solo si el resto está pulido.

### Componentes de animación reutilizables

Crear estos wrappers en `/components/animations/` para no repetir código:

**`<FadeInUp>`** — reveal on scroll estándar
```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function FadeInUp({ children, delay = 0, y = 40 }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y, opacity: 0, duration: 1, delay, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true }
    });
  }, { scope: ref });
  return <div ref={ref}>{children}</div>;
}
```

**`<StaggerChildren>`** — anima hijos con stagger (para grids de cards)

**`<SplitTextReveal>`** — wrap con SplitText + reveal para títulos grandes

Estos wrappers evitan que Claude Code reescriba lógica de GSAP en cada sección.

### Performance

- Nunca animar `width`, `height`, `top`, `left` — solo `transform` (x, y, scale, rotation) y `opacity`
- ScrollTrigger: `fastScrollEnd: true` en scroll pesado
- Cleanup de ScrollTriggers al desmontar (lo hace `useGSAP` automáticamente si el scope está bien)
- Lazy load de imágenes con `next/image`
- Testear en móvil real, no solo DevTools

---

## Contenido por sección

### 1. Header
- Logo Random Trips (izquierda)
- Link "Contacto" (derecha)

### 2. Hero superior (bloque azul con mapa)
- Etiqueta: **"Explora"**
- Título gigante: **"REPUBLICA DOMINICANA"**
- Subtítulo: **"El corazón del CARIBE"**
- Descripción: *"Una experiencia creada para quienes quieren descubrir el país desde otra perspectiva."*
- CTA: **"RESERVAR"**
- Línea inferior: **"Ruta: 8 DÍAS Y 7 NOCHES"**
- Mapa con pins: Puerto Plata, Río San Juan, Samaná, Santo Domingo, Barahona, Pedernales
- **Animaciones**: ver 🔥 Imprescindibles #1

### 3. Lo que viviremos
- Título: **"LO QUE VIVIREMOS"**
- Descripción: *"Una travesía que recorre lo mejor de República Dominicana, desde playas paradisíacas, charcos y saltos, hasta encantadores pueblos costeros y vibrantes ciudades. De norte a sur y de este a oeste, vivirás aventuras únicas en Puerto Plata, Río San Juan, Samaná, Santo Domingo y el Sur profundo, conectando cada destino con cultura, naturaleza y la esencia auténtica del Caribe."*
- **Animaciones**: ver ⭐ #7

### 4. Nuestros destinos (3 cards)
- **Saltos y toboganes** — Charcos de Damajagua
- **Playas paradisiacas** — Playa Frontón, Samaná
- **Historia y patrimonio** — Zona Colonial, Santo Domingo
- **Animaciones**: ver 🔥 #3

### 5. Itinerario del viaje (acordeón)
- Subtítulo: **"Del Miércoles 2 al Viernes 11 de Septiembre"**
- Título: **"ITINERARIO DEL VIAJE"** *(el PDF dice "ITINERARARIO" — corregir typo)*

Cada día abierto muestra un botón **"Ver Galería de fotos"** (pill amarilla) que abre un lightbox/carrusel (`GaleriaLightbox.tsx`): overlay oscuro, imagen central, flechas circulares blancas, X arriba a la derecha, navegación con teclado (Esc/←/→). `lib/galeria.ts` (server) detecta qué fotos tiene cada día leyendo `/public/images/galeria/<dia-id>/` (dia-1 … dia-9) pero genera **URLs del CDN de CloudFront** (`mediaUrl()` de `lib/media.ts`, bucket S3 del backend con los mismos keys `galeria/<dia-id>/...`): al agregar fotos locales hay que subirlas también con `aws s3 sync public/images/galeria s3://random-trips-media-<account>/galeria/`. Mientras una carpeta esté vacía se usa la imagen principal del día como única foto.

Días (fuente: `/lib/data/itinerario.ts`):
- **DIA 1** — Llegada a Santo Domingo · Libre
- **DIA 2** — Puerto Plata
- **DIA 3** — Las Terrenas, Samaná
- **DIA 4** — Playa Frontón, Samaná
- **DIA 5** — Playa Bonita, Samaná + Clase de Surf
- **DIA 6** — Santo Domingo: City Tour
- **DIA 7–8** — Sur profundo: Barahona + Pedernales
- **DIA 9** — Santo Domingo · Salida

**Comportamiento**: shadcn `Accordion type="single" collapsible`, DIA 1 abierto por default. Imagen a la izquierda + descripción a la derecha en desktop, stack en mobile.
- **Animaciones**: ver 🔥 #4

### 6. Lo que incluye / No incluye

**LO QUE INCLUYE:**
- Transporte durante todo el recorrido
- Hoteles
- Host acompañando todo el viaje
- Actividades del itinerario
- Charcos de Damajagua
- Playa Frontón
- Clase de Surf
- Bahía de las Águilas
- Chalecos salvavidas
- Degustaciones
- Algunos desayunos y almuerzos

**NO INCLUYE:**
<!-- TODO: confirmar con Randy. Sugerencias: -->
- Vuelos internacionales
- Seguro de viaje
- Gastos personales
- Propinas
- Comidas no especificadas
- Bebidas alcohólicas

**Animaciones**: reveal simple con `<FadeInUp>`, sin extras (sección utilitaria).

### 7. Banda de sponsors
Logos horizontales: **Random Trips + República Dominicana (marca país) + Doctor Cambio** (+ otros)
**Animaciones**: fade-in on scroll, sin stagger.

### 8. Conoce el Host
Título: **"CONOCE EL HOST"** (fondo coral/rojo, dos cards laterales con foto)
- **Bernat Moreno** — <!-- TODO -->
- **Randy García** — <!-- TODO -->

**Animaciones**: cards entran desde los lados (Bernat desde izquierda, Randy desde derecha), texto central con fade.

### 9. Modalidad de pago (3 planes) — `ModalidadPago.tsx`
Va justo después de "Conoce los hosts". Fondo azul + textura `TEXTURA3x.png`; el sticker `vive.png` (girando, como en el hero) montado sobre el borde superior con la sección roja del Host.
- Título: **"MODALIDAD DE PAGO"** + kicker **"ASEGURA TU CUPO"** debajo
- 3 cards blancas con los planes de `lib/data/planes.ts` (**precios placeholder, TODO reales**); el plan destacado va elevado (`md:-translate-y-9`) con badge "Más elegido"
- Cada card lleva CTA RESERVAR → `/reservar`
- Debajo de las cards: párrafo intro (el mismo copy de la travesía, con bolds)
- Tiene `id="planes"`

**Animaciones**: ver ⭐ #5 (con `fromTo`, regla 5b)

### 10. Esta experiencia es para ti si / No es para ti si

**ES PARA TI SI:**
<!-- TODO: copy de Randy -->

**NO ES PARA TI SI:**
<!-- TODO: copy de Randy -->

**Animaciones**: reveals simples con checkmarks/equis que aparecen con stagger.

### 11. Banda "Descargar PDF" (fondo coral)
- Texto: **"¿QUIERES EL PDF CON TODA LA INFO EN DETALLE?"**
- Botón: **"DESCARGAR PDF"** → `/random-trips-rd.pdf`
- **Animaciones**: ver ⭐ #8

### 12. Hero atardecer
- Etiqueta: **"Descubre la"**
- Título estilizado: **"REPUBLICA DOMINICANA"**
- Subtítulo: **"como pocos la conocen."**
- CTA: **"RESERVA TU LUGAR AHORA"**
- **Animaciones**: ver 🔥 #2

### 13. FAQ por categorías
Sección standalone (ya NO va solapada sobre el hero atardecer). Fondo azul + textura `TEXTURA3x.png`.
- Título: **"PREGUNTAS FRECUENTES"**
- 3 cards blancas de categoría con emoji grande (💳 Reserva y Pagos / 🧳 Antes del Viaje / ⭐ Durante la Experiencia) — **excepción documentada a la regla "no emojis"**: el diseño de Figma usa artwork de emoji para estas categorías
- La categoría activa se marca con ring amarillo + "palomita" (cola de globo blanca apuntando hacia abajo) + scale
- Al hacer click en una categoría se muestran solo sus preguntas (acordeón); chevron amarillo cerrado / gris abierto
- Datos en `lib/data/faq.ts`: cada pregunta tiene `categoria`, y `categoriasFaq` define las 3 categorías

**Animaciones**: reveal de título y cards; las preguntas entran con stagger al cambiar de categoría (`fromTo`, dependencies).

### 13b. ¿Más preguntas? Contáctanos — `Contacto.tsx`
Después del FAQ, fondo blanco, `id="contacto"` (el link "Contáctanos" del header apunta aquí).
- Título 2 líneas: **"¿MÁS PREGUNTAS?" / "CONTACTANOS"** (font-blur azul)
- Form: nombre + correo (2 cols), textarea mensaje, botón "Enviar mensaje" (Montserrat bold, NO blur/uppercase — así está en el diseño)
- `POST {API_BASE}/contacto` (backend `random-trips-backend-eu`, vía `apiUrl()` de `lib/api.ts`) → guarda el mensaje en DynamoDB y avisa por email (SES)

### 14. CTA final
- Título: **"¿TE UNES A LA EXPERIENCIA?"**
- Subtítulo: *"El grupo ya se está formando. Solo falta tu nombre en la lista."*
- Botones: **"RESERVAR"** + **"WHATSAPP"**
- **Animaciones**: reveal con `back.out` en los botones, sin distraer del click.

## Interactividad

- **Acordeones**: shadcn Accordion, `type="single" collapsible`
- **RESERVAR**: `<a href="/reservar">` — lleva a la página de reserva/checkout (ver sección siguiente)
- **WHATSAPP**: `https://wa.link/ayrgeu`
- **DESCARGAR PDF**: link a `/random-trips-rd.pdf`

## Página de reserva (`/reservar`)

Ruta nueva (`app/reservar/page.tsx`) a la que apuntan los 3 CTAs "RESERVAR" del sitio. Flujo de 3 pasos manejado en `components/reserva/ReservaFlow.tsx` (client component, estado con `useState`, sin librería de formularios):

1. **Formulario**: elegir plan (`PlanSelector.tsx`, datos en `lib/data/planes.ts` — **precios placeholder, TODO reales**), cantidad de viajeros + nombre de cada uno (`ViajerosForm.tsx`), datos del titular (nombre/email/teléfono).
2. **Confirmar y pagar**: resumen + `PagoPaypal.tsx` (`@paypal/react-paypal-js`, `PayPalScriptProvider` + `PayPalButtons`).
3. **Éxito**: `ReservaConfirmada.tsx`.

Flujo de pago (nunca confiar en el monto que mande el cliente). El backend es el proyecto CDK **`random-trips-backend-eu`** (API Gateway + Lambdas + DynamoDB); los `fetch` usan `apiUrl()` de `lib/api.ts`:
```
PayPalButtons.createOrder → POST {API_BASE}/paypal/create-order { planId, viajeros }
  → la Lambda recalcula el total desde su catálogo de planes (src/shared/planes.ts del backend)
  → crea la orden en PayPal REST (Sandbox) y devuelve { id }

PayPalButtons.onApprove → POST {API_BASE}/paypal/capture-order { orderId, planId, viajeros, contacto }
  → captura el pago en PayPal
  → si status COMPLETED: guarda la reserva en DynamoDB (idempotente por orderId) y avisa por SES
```

**Persistencia**: DynamoDB (tabla `random-trips`) vía el backend. Las API routes de Next (`app/api/`) y los stores JSON (`lib/reservas/`, `lib/mensajes/`, `lib/paypal/`) fueron **eliminados** — no reintroducirlos. Los precios de `lib/data/planes.ts` son solo para pintar la UI; la fuente de verdad del cobro vive en el backend y ambos deben mantenerse sincronizados.

**Variables de entorno** (`.env.local`, ver `.env.example`): `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (carga el SDK de botones; el Client ID no es secreto), `NEXT_PUBLIC_API_BASE` (URL del API Gateway, output `ApiUrl` del stack `RandomTrips-Api`), `NEXT_PUBLIC_MEDIA_CDN_DOMAIN` (CloudFront de fotos, output del stack `RandomTrips-Media`). El **Client Secret ya no existe en este repo**: vive en SSM Parameter Store del backend (`/random-trips/paypal/*`). `credentials_paypal.json` en la raíz sigue gitignorado (nunca commitear ni leer desde código).

## Responsive

- Breakpoints Tailwind default
- Mobile-first estricto
- Títulos display: `text-5xl md:text-7xl lg:text-8xl`
- Grids: `grid-cols-1 md:grid-cols-3`
- Padding: `py-12 md:py-20 lg:py-24`
- **GSAP en mobile**: reducir intensidad (menos parallax, sin ScrollSmoother)

## SEO y meta (app/layout.tsx)

- `title`: "Random Trips — República Dominicana | Viaje 8 días por el Caribe"
- `description`: "Vive una experiencia de 8 días por República Dominicana con Random Trips. Puerto Plata, Samaná, Santo Domingo y el Sur profundo. Reserva tu cupo."
- `og:image`: foto hero atardecer (1200×630)
- `<html lang="es">`

## Reglas para Claude Code

**Hacer:**
- Leer este `CLAUDE.md` antes de cualquier tarea
- Respetar la estructura de carpetas
- Extraer copy repetitivo a `/lib/data/*.ts`
- Usar `next/image` en TODAS las imágenes
- **Usar SIEMPRE `useGSAP()` de `@gsap/react` para animaciones**
- **Envolver animaciones en `gsap.matchMedia()` para `prefers-reduced-motion`**
- Registrar plugins UNA sola vez en `/lib/gsap.ts`
- Verificar responsive antes de decir "listo"
- Commit al terminar cada sección

**No hacer:**
- No instalar dependencias nuevas sin confirmar
- No usar CSS-in-JS ni CSS modules
- No usar `useEffect` con GSAP (usar `useGSAP`)
- No animar `width/height/top/left` (usar `transform` y `opacity`)
- No animar FAQ, listas de incluye/no-incluye, ni CTA final más allá de reveals simples
- No poner ScrollSmoother sin probar mobile primero
- No inventar copy — usar `<!-- TODO -->` visible
- No cambiar design tokens sin actualizar `CLAUDE.md` + `tailwind.config.ts`
- No hacer responsive sección por sección; primero desktop, después mobile pass
- No usar emojis en UI (usar lucide-react o SVG)

## Estado del proyecto

- [ ] Setup inicial (Next.js, Tailwind, shadcn, fuentes, GSAP + @gsap/react)
- [ ] `/lib/gsap.ts` con plugins registrados
- [ ] Componentes de animación reutilizables (`FadeInUp`, `StaggerChildren`, `SplitTextReveal`)
- [ ] Header
- [ ] Hero superior + mapa con pins animados
- [ ] Lo que viviremos
- [ ] Destinos (3 cards con stagger)
- [ ] Itinerario acordeón
- [ ] Incluye / No incluye
- [ ] Sponsors
- [ ] Conoce el Host
- [ ] Asegura tu cupo (planes)
- [ ] Es para ti / No es para ti
- [ ] Banda descargar PDF
- [ ] Hero atardecer + parallax
- [ ] FAQ
- [ ] CTA final
- [ ] Pass de animaciones: `prefers-reduced-motion` en todas
- [ ] Pass mobile responsive
- [ ] Pass mobile animaciones (reducir intensidad)
- [ ] SEO / meta / OG