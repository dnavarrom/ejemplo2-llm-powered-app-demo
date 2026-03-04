# Demo: Integración de Modelos LLM con SDK de OpenAI (TypeScript)

Este repositorio contiene programas de consola creados en TypeScript para ejemplificar cómo se integra y utiliza un modelo de Lenguaje Grande (LLM) mediante el SDK oficial de OpenAI. Estos ejemplos están diseñados para fines educativos, demostrando conceptos clave en la interacción con LLMs y la ingeniería de *prompts*.

## ⚙️ Requisitos Previos

1. **Node.js** (v14 o superior)
2. **Clave de API de OpenAI**: Necesitas una clave válida (`API Key`) de OpenAI. Si no tienes una, puedes generarla en la [plataforma de desarrolladores de OpenAI](https://platform.openai.com/).

3. Puedes revisar instrucciones de configuración de ambiente Windows en [SETUP_WINDOWS.md](SETUP_WINDOWS.md)

## 🚀 Instalación y Configuración del proyecto

1. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```

2. Configura las variables de entorno:
   - Copia el archivo de ejemplo o renómbralo:
     ```bash
     cp .env.example .env
     ```
   - Abre el archivo `.env` y reemplaza el valor de `OPENAI_API_KEY` con tu clave real de OpenAI.
   > **Importante:** Nunca subas tu archivo `.env` o tu API Key real al repositorio. Asegúrate de que este archivo esté incluido en tu `.gitignore`.

---

## 📚 Ejemplos Incluidos

### 1. El Impacto del System Prompt (`ejemplo1.ts`)

Este ejemplo demuestra cómo la instrucción principal o "directiva del sistema" (`System Prompt`) afecta drásticamente el comportamiento y el tono del modelo frente a un mismo estímulo del usuario (`User Prompt`).

- **¿Qué hace?** Le pide al usuario una pregunta (ej. "¿Por qué el cielo es azul?") y envía esta misma pregunta al modelo utilizando dos personalidades completamente distintas: un pirata gruñón y un maestro de primaria paciente.
- **Conceptos clave:** `System Prompt`, `User Prompt`, Personalidad/Rol del Agente (Role-playing).
- **Cómo ejecutarlo:**
  ```bash
  npm run ejemplo1
  ```

### 2. Anatomía Técnica de un Prompt de Ingeniería (`ejemplo2.ts`)

Para que un texto enviado a un LLM pase de ser una simple pregunta a una pieza de ingeniería estructurada, debe estar correctamente parametrizado. Este ejemplo simula un clasificador de tickets de soporte técnico para ilustrar este concepto.

- **¿Qué hace?** Ensambla un *prompt* maestro combinando varios componentes clave y luego le pide al usuario un caso de soporte ("El teclado de mi laptop no funciona"). El modelo evalúa el caso y devuelve un JSON debidamente formateado con la clasificación.
- **Componentes demostrados:**
  1. **Instrucción (Misión):** La tarea específica (ej: Clasificar el ticket y asignar urgencia).
  2. **Contexto (Memoria de Trabajo):** El diccionario de categorías válidas para el soporte.
  3. **Restricciones (Guardrails):** Límites rígidos (ej. "Solo responde en formato JSON", "No asumas datos sensibles").
  4. **Ejemplos (Few-shot):** Muestras de qué entra y qué debe salir para reducir la varianza en las respuestas.
  5. **Datos de Entrada (Input):** La variable del usuario a procesar.
- **Conceptos clave:** Ingeniería de Prompts (Prompt Engineering), Few-shot prompting, Guardrails, Control de Temperatura (`temperature: 0.1` para tareas deterministas), Salidas estructuradas (JSON).
- **Cómo ejecutarlo:**
  ```bash
  npm run ejemplo2
  ```

---

*Nota: Los ejemplos utilizan el modelo `gpt-3.5-turbo` por defecto por su equilibrio entre coste y rendimiento para estas demostraciones. Para tareas de producción más complejas, se recomienda evaluar `gpt-4` o modelos más recientes.*
