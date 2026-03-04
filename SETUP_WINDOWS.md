# Guía de Configuración para Windows 🪟

Esta guía está diseñada para personas que necesitan un instructivo para partir de 0 con este proyecto de demostración. Sigue estos pasos en orden para preparar tu computador y ejecutar los ejemplos del proyecto.

---

## 🏗️ Paso 1: Instalación de Herramientas Básicas

Debes descargar e instalar estos cuatro programas. En todos los casos, cuando el instalador te pregunte, deja las opciones por defecto y haz clic en **"Siguiente" (Next)** o **"Instalar"**.

1.  **Visual Studio Code (Editor de Código):**
    *   **Descarga:** [code.visualstudio.com](https://code.visualstudio.com/download)
    *   Selecciona "Windows User Installer". Este es el programa donde verás y editarás el código.

2.  **Git (Control de Versiones):**
    *   **Descarga:** [git-scm.com](https://git-scm.com/download/win)
    *   Selecciona "64-bit Git for Windows Setup". Esto permite descargar el proyecto desde internet.

3.  **Node.js y NPM (Motor para ejecutar el código):**
    *   **Descarga:** [nodejs.org](https://nodejs.org/)
    *   Selecciona la versión que dice **"LTS"** (es la más estable). Al instalar Node.js, automáticamente se instala **NPM** (el gestor de paquetes).

---

## 📂 Paso 2: Clonar el Proyecto

Ahora vamos a descargar una copia del proyecto de clase a tu computador.

1.  Crea una carpeta en tu computador donde quieras guardar tus trabajos (ejemplo: en `Documentos`, crea una carpeta llamada `clase-llm`).
2.  Haz **clic derecho** dentro de esa carpeta y selecciona **"Open Git Bash here"** (esto abrirá una pequeña pantalla negra).
3.  Escribe el siguiente comando y presiona la tecla **Enter**:
    ```bash
    git clone https://github.com/tu-usuario/ejemplo2-llm-powered-app-demo.git
    ```
    *(Nota: Asegúrate de usar el enlace real del repositorio que te entregó el profesor).*

---

## 💻 Paso 3: Abrir en Visual Studio Code

1.  Abre el programa **Visual Studio Code**.
2.  Ve al menú superior: **File (Archivo)** > **Open Folder... (Abrir carpeta...)**.
3.  Busca la carpeta `ejemplo2-llm-powered-app-demo` que se acaba de crear y haz clic en **Seleccionar carpeta**.

---

## 🛠️ Paso 4: Preparar el Proyecto (Instalar dependencias)

Dentro de Visual Studio Code, necesitamos descargar las librerías necesarias:

1.  Abre la terminal integrada: Ve al menú **Terminal** > **New Terminal** (aparecerá una consola en la parte inferior).
2.  En esa consola, escribe el siguiente comando y presiona **Enter**:
    ```powershell
    npm install
    ```
    *Espera a que termine. Verás que se crea una carpeta llamada `node_modules` (no la borres).*

---

## 🔑 Paso 5: Configurar tu Llave de OpenAI

Para que el programa funcione, necesitas una API key personal. Puedes usar el documento de la clase N°1 - Instructivo - Crear APIKey OpenAI.pdf 

1.  En la lista de archivos a la izquierda, busca uno llamado `.env.example`.
2.  Haz clic derecho sobre él y elige **Rename (Renombrar)**. Cámbiale el nombre a solo `.env` (borra el `.example`).
3.  Haz clic en el nuevo archivo `.env` para abrirlo.
4.  Busca la línea que dice `OPENAI_API_KEY=...` y reemplaza el texto después del `=` por tu llave real de OpenAI. Debería verse algo así:
    `OPENAI_API_KEY=sk-abc12345...`
5.  **Guarda el archivo** presionando la combinación de teclas `Ctrl + S`.

---

## 🏃 Paso 6: Ejecutar los Ejemplos

Ya estás listo/a para probar el código. En la misma terminal de la parte inferior de Visual Studio Code, escribe:

*   Para el **Ejemplo 1** (Diferencia de System Prompts):
    ```powershell
    npm run ejemplo1
    ```

*   Para el **Ejemplo 2** (Anatomía de un Prompt):
    ```powershell
    npm run ejemplo2
    ```

---

## ❓ Solución de Problemas Comunes

*   **"No se reconoce el comando npm":** Reinicia Visual Studio Code o incluso tu computador. Esto suele pasar justo después de instalar Node.js.
*   **"Error 401":** Tu llave de OpenAI está mal escrita o no tienes créditos en tu cuenta.
*   **Permisos de ejecución:** Si Windows te da un error de seguridad al ejecutar comandos, intenta abrir Visual Studio Code como **Administrador** (Clic derecho en el icono de VS Code -> Ejecutar como administrador).
