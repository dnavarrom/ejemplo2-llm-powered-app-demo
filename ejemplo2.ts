import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import readline from 'readline';

// Cargar variables de entorno
dotenv.config();

// Inicializar el cliente de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

async function main() {
    console.log("=========================================================");
    console.log("🧩 Demo 2: Anatomía de un Prompt de Ingeniería (TypeScript)");
    console.log("=========================================================\n");

    console.log("Este ejemplo demuestra cómo estructurar un prompt avanzado para tareas complejas.");
    console.log("Se divide en: Instrucción, Contexto, Restricciones y Ejemplos (Few-shot).\n");

    // 1. Instrucción (Misión)
    const instruccion = "Clasifica el siguiente ticket de soporte técnico en una de las categorías válidas con base en el contexto dado. Además, asigna un nivel de urgencia (Alta, Media, Baja).";

    // 2. Contexto (Memoria de Trabajo)
    const contexto = `Categorías válidas de soporte:
- REDES: Problemas de conexión, VPN, Wi-Fi.
- HARDWARE: Pantallas rotas, teclado dañado, equipos que no encienden, problemas físicos.
- SOFTWARE: Programas que no abren, errores de sistema operativo, fallos en Word/Excel, licencias.
- ACCESOS: Contraseñas bloqueadas, permisos de carpetas compartidas, doble factor de autenticación.`;

    // 3. Restricciones (Guardrails)
    const restricciones = `- Solo responde en formato JSON válido.
- No agregues texto adicional fuera del JSON (sin saludos ni explicaciones de formato).
- Las únicas claves permitidas en el JSON de salida son: "categoria", "urgencia", "explicacion_corta".
- Si no estás seguro de la categoría o si la información es muy ambigua, usa la categoría "REVISION_MANUAL".
- No reveles ni asumas datos sensibles (nombres, teléfonos, etc.) en la explicación corta.`;

    // 4. Ejemplos (Few-shot)
    const ejemplos = `Ejemplo 1:
Input: "Mi monitor no da imagen, está todo negro desde que se me cayó ayer por accidente."
Output:
{
  "categoria": "HARDWARE",
  "urgencia": "Alta",
  "explicacion_corta": "Falla de monitor por impacto físico."
}

Ejemplo 2:
Input: "He intentado acceder a la VPN del trabajo pero me dice acceso denegado."
Output:
{
  "categoria": "REDES",
  "urgencia": "Alta",
  "explicacion_corta": "Problema de conectividad o credenciales VPN."
}

Ejemplo 3:
Input: "Me marca error 504 al querer entrar a la página del almuerzo."
Output:
{
  "categoria": "REVISION_MANUAL",
  "urgencia": "Baja",
  "explicacion_corta": "Error 504 en página web no documentada en el contexto (no es app de uso general listada)."
}`;

    // Construcción del System Prompt unificado
    const systemPrompt = `[INSTRUCCIÓN]
${instruccion}

[CONTEXTO]
${contexto}

[RESTRICCIONES]
${restricciones}

[EJEMPLOS FEW-SHOT]
${ejemplos}
`;

    console.log("---------------------------------------------------------");
    console.log("📝 System Prompt construido para el agente:");
    console.log("---------------------------------------------------------");
    console.log(systemPrompt);
    console.log("---------------------------------------------------------\n");

    console.log(`[Paso 1] Define los Datos de Entrada (Input).`);
    console.log(`Ejemplo: "Olvidé la clave de mi correo y la cuenta figura como bloqueada." o "Mi laptop hace un ruido muy fuerte."`);

    // 5. Datos de Entrada (Input)
    const userPrompt = await askQuestion("\nIngresa tu ticket de soporte (Input de usuario): ");

    console.log(`\n=========================================================`);
    console.log(`📡 Evaluando ticket (modelo: gpt-3.5-turbo)...`);
    console.log(`=========================================================\n`);

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Input: "${userPrompt}"\nOutput:` }
            ],
            // Se recomienda una temperatura baja para tareas analíticas/estructuradas (0.0 o 0.1)
            temperature: 0.1,
        });

        console.log("🎯 Respuesta del Modelo (JSON Output):\n");
        console.log(completion.choices[0]?.message?.content);

    } catch (error: any) {
        if (error.status === 401) {
            console.error("\n❌ Error de Autenticación: La API Key no es válida.");
            console.error("Asegúrate de haber reemplazado el valor de OPENAI_API_KEY en tu archivo .env por tu API Key real de OpenAI.");
        } else {
            console.error("\n❌ Ocurrió un error al comunicarse con la API de OpenAI:");
            console.error(error.message);
        }
    } finally {
        rl.close();
        console.log(`\n=========================================================`);
        console.log("🚀 Fin de la demostración 2.");
        console.log(`=========================================================\n`);
    }
}

main();
