# MairoverFit - Animaciones & Transiciones (100% Fiel al Diseño)

**Objetivo:** Documentar exactamente qué anima, cuándo, y cómo implementar sin cambiar el diseño.

---

## 📐 Principios de Animación

1. **Sutil:** No distraer, acompañar la experiencia
2. **Rápida:** 200-600ms máximo
3. **Suave:** ease-out para entrada, ease-in para salida
4. **Consistente:** Mismas velocidades en toda la app
5. **Accesible:** Respetar prefers-reduced-motion

---

## 🎬 Animaciones por Sección (Basadas en tu Diseño)

### 1. HERO Section (Contacto, Home, Planes)

**¿Qué anima?**
- Título principal: Fade in + slide up
- Párrafo descriptivo: Fade in + slide up (delay 100ms)
- Botones: Fade in + slide up (delay 200ms)
- Background blur: Subtle opacity pulse

**Implementación:**

```css
/* frontend/src/styles/hero.css */

.hero-container {
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a18 0%, #0f0f0d 100%);
  position: relative;
}

/* Background decorative blur */
.hero-blur {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 400px;
  background: #E85D4E;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.08;
  animation: blurPulse 6s ease-in-out infinite;
}

@keyframes blurPulse {
  0%, 100% {
    opacity: 0.08;
    transform: scale(1);
  }
  50% {
    opacity: 0.12;
    transform: scale(1.05);
  }
}

/* Título principal */
.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.2;
  animation: heroFadeInSlideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

/* Subtitle/Párrafo */
.hero-subtitle {
  font-size: 18px;
  color: #C2C0B6;
  max-width: 600px;
  line-height: 1.6;
  animation: heroFadeInSlideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
  opacity: 0;
  transform: translateY(30px);
}

/* CTAs */
.hero-cta-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  animation: heroFadeInSlideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
  opacity: 0;
  transform: translateY(30px);
}

.hero-cta-primary {
  background: #E85D4E;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.hero-cta-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.hero-cta-primary:hover::before {
  width: 300px;
  height: 300px;
}

.hero-cta-primary:hover {
  background: #D64A3E;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(232, 93, 78, 0.3);
}

.hero-cta-secondary {
  border: 2px solid #E85D4E;
  color: #E85D4E;
  background: transparent;
  padding: 14px 30px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-cta-secondary:hover {
  background: #FFF5F0;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(232, 93, 78, 0.2);
}

@keyframes heroFadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-cta-group {
    flex-direction: column;
  }
  
  .hero-cta-primary,
  .hero-cta-secondary {
    width: 100%;
    text-align: center;
  }
}
```

**React Component:**

```jsx
// frontend/src/components/public/HeroSection.jsx

import { useEffect, useState } from 'react';
import '../../styles/hero.css';

export function HeroSection({ 
  title = 'CONTÁCTANOS',
  subtitle = 'Ya sea que quieras entrenar en el box, empezar un plan online o recibir asesoría nutricional, estoy aquí para orientarte y ayudarte a dar el siguiente paso.',
  buttons = [
    { label: 'ASESORÍA GRATUITA', type: 'primary', action: 'scroll-contacto' },
    { label: 'AGENDAR EVALUACIÓN', type: 'secondary', action: 'open-whatsapp' }
  ]
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animación cuando componente monta
    setIsVisible(true);
  }, []);

  const handleButtonClick = (action) => {
    if (action === 'scroll-contacto') {
      document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'open-whatsapp') {
      window.open('https://wa.me/584121234567?text=Quiero%20agendar%20una%20evaluación');
    }
  };

  return (
    <section className="hero-container relative h-screen flex items-center justify-center">
      {/* Blur decorativo */}
      <div className="hero-blur"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h1 className="hero-title">{title}</h1>
        
        <p className="hero-subtitle mt-6">
          {subtitle}
        </p>

        <div className="hero-cta-group mt-10">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={btn.type === 'primary' ? 'hero-cta-primary' : 'hero-cta-secondary'}
              onClick={() => handleButtonClick(btn.action)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 2. CARDS (Planes, Servicios, Testimonios)

**¿Qué anima?**
- Card entera: Fade in + scale up leve
- Icon/imagen: Rotate + fade (delay 100ms)
- Título: Fade (delay 150ms)
- Descripción: Fade (delay 200ms)
- On hover: Elevation + shadow

**Implementación:**

```css
/* frontend/src/styles/cards.css */

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: cardFadeInScale 0.6s ease-out forwards;
  opacity: 0;
  transform: scale(0.95);
}

.card:nth-child(1) {
  animation-delay: 0s;
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}

.card:nth-child(4) {
  animation-delay: 0.3s;
}

/* Hover effect */
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

/* Icon dentro del card */
.card-icon {
  width: 64px;
  height: 64px;
  background: #FFF5F0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  animation: iconRotateFade 0.8s ease-out forwards;
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #3D3D3A;
  margin: 16px 0;
  animation: textFade 0.6s ease-out 0.15s forwards;
  opacity: 0;
}

.card-description {
  font-size: 16px;
  color: #73726C;
  line-height: 1.6;
  animation: textFade 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

@keyframes cardFadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes iconRotateFade {
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

@keyframes textFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dark variant (para fondo oscuro) */
.card-dark {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
}

.card-dark:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-dark .card-title {
  color: white;
}

.card-dark .card-description {
  color: #C2C0B6;
}
```

**React Component:**

```jsx
// frontend/src/components/common/Card.jsx

export function Card({ 
  icon, 
  title, 
  description, 
  variant = 'light',
  className = ''
}) {
  const baseClass = `card ${variant === 'dark' ? 'card-dark' : ''} ${className}`;
  
  return (
    <div className={baseClass}>
      {icon && (
        <div className="card-icon">
          {icon}
        </div>
      )}
      {title && <h3 className="card-title">{title}</h3>}
      {description && <p className="card-description">{description}</p>}
    </div>
  );
}

// Uso:
// <Card
//   icon={<IconDumbbell />}
//   title="CROSSFIT"
//   description="Entrenamiento funcional de alta intensidad"
// />
```

---

### 3. NAVEGACIÓN & Transiciones de Página

**¿Qué anima?**
- Navbar entrada: Slide down (on load)
- Menu desplegable: Fade + scale
- Page transitions: Fade in/out

**Implementación:**

```css
/* frontend/src/styles/navigation.css */

/* Navbar entrada */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1a1a18;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  animation: navSlideDown 0.4s ease-out;
}

@keyframes navSlideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile menu dropdown */
.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: #1a1a18;
  animation: slideDown 0.3s ease-out;
  z-index: 999;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Page transitions */
.page-enter {
  animation: pageFadeIn 0.4s ease-out;
}

.page-exit {
  animation: pageFadeOut 0.4s ease-in;
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pageFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

---

### 4. FORMULARIOS

**¿Qué anima?**
- Input focus: Border color change + shadow
- Label flotante: Slide up + fade
- Error messages: Slide down + fade
- Success checkmark: Pop in

**Implementación:**

```css
/* frontend/src/styles/forms.css */

.form-group {
  margin-bottom: 24px;
  animation: formGroupFadeIn 0.5s ease-out;
  opacity: 0;
}

@for $i from 1 through 10 {
  .form-group:nth-child(#{$i}) {
    animation-delay: #{$i * 0.05}s;
  }
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #3D3D3A;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E8E5E0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  color: #3D3D3A;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #E85D4E;
  box-shadow: 0 0 0 3px rgba(232, 93, 78, 0.1);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #B4B2A9;
}

/* Error state */
.form-input.error,
.form-textarea.error {
  border-color: #E24B4A;
  background: rgba(226, 75, 74, 0.02);
}

.form-error {
  font-size: 14px;
  color: #E24B4A;
  margin-top: 8px;
  animation: errorSlideDown 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 8px;
}

@keyframes errorSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Success state */
.form-success {
  animation: successPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes successPopIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Submit button */
.form-submit {
  background: #E85D4E;
  color: white;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.form-submit:hover:not(:disabled) {
  background: #D64A3E;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(232, 93, 78, 0.3);
}

.form-submit:active:not(:disabled) {
  transform: translateY(0);
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-submit.loading {
  color: transparent;
}

.form-submit.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes formGroupFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**React Component:**

```jsx
// frontend/src/components/common/FormInput.jsx

import { useState } from 'react';
import '../../styles/forms.css';

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="text-primary-500"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && (
        <div className="form-error">
          <span>⚠</span>
          {error}
        </div>
      )}
    </div>
  );
}
```

---

### 5. TABLAS & DATOS (Admin)

**¿Qué anima?**
- Fila entrada: Fade in (staggered)
- Row hover: Background change + slight lift
- Sorting: Fade out / fade in
- Loading skeleton: Pulse

**Implementación:**

```css
/* frontend/src/styles/tables.css */

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table tbody tr {
  animation: tableRowFadeIn 0.4s ease-out forwards;
  opacity: 0;
  border-bottom: 1px solid #E8E5E0;
}

.data-table tbody tr:nth-child(1) { animation-delay: 0s; }
.data-table tbody tr:nth-child(2) { animation-delay: 0.05s; }
.data-table tbody tr:nth-child(3) { animation-delay: 0.1s; }
.data-table tbody tr:nth-child(4) { animation-delay: 0.15s; }
.data-table tbody tr:nth-child(5) { animation-delay: 0.2s; }

.data-table tbody tr:hover {
  background: #FFF5F0;
  transition: all 0.2s ease;
  transform: translateY(-1px);
}

.data-table td {
  padding: 16px;
  font-size: 14px;
  color: #3D3D3A;
}

.data-table th {
  background: #F8F6F3;
  padding: 16px;
  font-weight: 600;
  text-align: left;
  color: #3D3D3A;
  border-bottom: 2px solid #E8E5E0;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes tableRowFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    #E8E5E0 25%,
    #F1EFE8 50%,
    #E8E5E0 75%
  );
  background-size: 200% 100%;
  animation: skeletonLoading 1.5s infinite;
}

@keyframes skeletonLoading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-row {
  height: 48px;
  margin-bottom: 12px;
  border-radius: 8px;
}
```

---

### 6. MODAL DIALOGS

**¿Qué anima?**
- Overlay: Fade in
- Modal: Zoom in + fade (spring effect)
- Contenido: Fade in (delay)
- Close: Reverse

**Implementación:**

```css
/* frontend/src/styles/modals.css */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: overlayFadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 90%;
  animation: modalZoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #E8E5E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #3D3D3A;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #73726C;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #3D3D3A;
  background: #F8F6F3;
  border-radius: 50%;
}

.modal-body {
  padding: 24px;
  animation: textFade 0.4s ease-out 0.1s forwards;
  opacity: 0;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E8E5E0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalZoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## ⚙️ Timing Reference (Velocidades Estándar)

```javascript
// frontend/src/utils/animationConfig.js

export const ANIMATION_TIMINGS = {
  // Rápidas (UI feedback)
  fast: 150,      // Hover, focus states
  
  // Estándar (Component appear)
  standard: 300,  // Card enter, button click
  
  // Media (Page transition)
  medium: 400,    // Page fade, modal appear
  
  // Lenta (Decorative)
  slow: 600,      // Hero entrance, loading
  
  // Muy lenta (Background)
  verySlow: 1000, // Pulsing blur, animations infinitas
};

export const EASING = {
  // Entrada
  easeOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',      // Spring bounce
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  
  // Estándar
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Salida
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  
  // Lineal (para loops)
  linear: 'linear',
};
```

---

## 🎨 Accesibilidad (prefers-reduced-motion)

```css
/* Respetar preferencias de usuario */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**React Hook:**

```jsx
// frontend/src/hooks/usePrefersReducedMotion.js

import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}

// Uso:
// const reduced = usePrefersReducedMotion();
// className={reduced ? '' : 'animate-fadeIn'}
```

---

## 📋 Checklist: Animaciones Implementadas

### Antes de Deploy, verificar:

- [ ] Hero sections: Fade in + slide up
- [ ] Cards: Scale + fade (staggered)
- [ ] Buttons: Hover elevation + shadow
- [ ] Inputs: Focus border + glow
- [ ] Tablas: Row fade in (staggered)
- [ ] Modales: Zoom in spring effect
- [ ] Navegación: Slide down
- [ ] Página transitions: Fade
- [ ] Errores: Slide down
- [ ] Success: Pop in
- [ ] Cargando: Spin + pulse
- [ ] prefers-reduced-motion: Respetado

---

## 🚀 Performance Tips

```javascript
// Usar transform + opacity (GPU accelerated)
// ✅ BUENO:
transform: translateY(20px);
opacity: 0;

// ❌ MALO:
top: 20px;  // Reflow + repaint
left: 0;

// ✅ BUENO:
transform: scale(1.05);

// ❌ MALO:
width: 105%;  // Reflow
```

---

## Resumen Animaciones

1. **Hero:** Fade + slide up (0.6s)
2. **Cards:** Scale + fade (0.6s, staggered)
3. **Botones:** Hover lift + shadow (0.3s)
4. **Inputs:** Focus glow (0.3s)
5. **Tablas:** Row fade in (0.4s, staggered)
6. **Modales:** Zoom spring (0.4s)
7. **Errores:** Slide down (0.3s)
8. **Success:** Pop in (0.4s)
9. **Cargando:** Spin (0.8s, infinite)
10. **Todo respeta prefers-reduced-motion**

---

*Este documento es tu guía de animaciones 100% fiel al diseño.*

*Implementa, prueba en el navegador, y ajusta si algo se ve raro.*

*¡A animar!*
