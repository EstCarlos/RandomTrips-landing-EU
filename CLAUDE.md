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

Archivos en `/public/fonts/`, cargados con `next/font/local` en `app/layout.tsx`. Mapeo de uso confirmado por referencia visual:

- **`Blur Bold.ttf`** → `font-blur` — títulos redondeados gruesos tipo bubble/rounded (ej. "Explora", "LO QUE VIVIREMOS", headers de sección, nombres de días DIA 1-9). Es la fuente bold redondeada que se ve en "Republica Domincana" con letras infladas/rounded.
- **`DonJose_Raices.otf`** → `font-raices` → **SOLO** para el título hero gigante con textura de rayas/tribal: "REPUBLICA DOMINICANA" en el hero atardecer y "CARIBE" en el hero superior. Es una fuente display muy decorativa (efecto rayado/grabado) — usar exclusivamente en esos 2 lugares, nunca en texto de lectura.
- **`helveticanowtext-bold-demo.ttf`** → `font-helvetica-now` — subtítulos bold, labels de sección, texto de énfasis (ej. "El corazón del", nombres de planes PLAN 1/2/3, títulos de cards de destinos)
- **`Montserrat-VariableFont_wght.ttf`** → `font-montserrat` — texto de UI, botones, navegación, listas (Incluye/No incluye), FAQ. Es variable font, usar distintos `font-weight` (400 regular, 600 semibold, 700 bold) en vez de archivos separados.
- **`MyriadPro-Regular.otf`** → `font-myriad` — párrafos largos de lectura (descripciones del itinerario, bio de hosts, "Lo que viviremos"). Es la fuente más neutra, para bloques de texto corrido donde la legibilidad importa más que el estilo.

**Regla de aplicación:**
```
Display decorativo (2 usos únicos) → DonJose_Raices
Headers redondeados de sección     → Blur Bold
Subtítulos / labels / énfasis      → Helvetica Now Text Bold
Botones / nav / listas / FAQ       → Montserrat (variable)
Párrafos largos de lectura         → Myriad Pro Regular
```

En `tailwind.config.ts`:
```ts
fontFamily: {
  raices: ['var(--font-raices)'],
  blur: ['var(--font-blur)'],
  'helvetica-now': ['var(--font-helvetica-now)'],
  montserrat: ['var(--font-montserrat)'],
  myriad: ['var(--font-myriad)'],
}
```

### Espaciado y forma
- Botones: `rounded-full` (pill), uppercase, bold, `px-6 py-3`
- Cards: `rounded-2xl`
- Contenedores grandes (bloques azules): `rounded-3xl`
- Spacing entre secciones: `py-16 md:py-20 lg:py-24`
- Container: `max-w-6xl mx-auto px-4 md:px-6`

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

### 9. Asegura tu cupo (3 planes)
Título: **"ASEGURA TU CUPO"**
- **PLAN 1** — <!-- TODO -->
- **PLAN 2** — <!-- TODO --> (destacado)
- **PLAN 3** — <!-- TODO -->

**Animaciones**: ver ⭐ #5

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

### 13. FAQ (acordeón)
Título: **"PREGUNTAS FRECUENTES"**
<!-- TODO: preguntas reales de Randy -->

**Animaciones**: fade-in del título, sin animar los items individuales (utilidad).

### 14. CTA final
- Título: **"¿TE UNES A LA EXPERIENCIA?"**
- Subtítulo: *"El grupo ya se está formando. Solo falta tu nombre en la lista."*
- Botones: **"RESERVAR"** + **"WHATSAPP"**
- **Animaciones**: reveal con `back.out` en los botones, sin distraer del click.

## Interactividad

- **Acordeones**: shadcn Accordion, `type="single" collapsible`
- **RESERVAR**: `<a href="#planes">` por ahora
- **WHATSAPP**: `https://wa.me/1809XXXXXXX?text=Hola%2C%20quiero%20info%20del%20viaje%20a%20RD` <!-- TODO: número -->
- **DESCARGAR PDF**: link a `/random-trips-rd.pdf`

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