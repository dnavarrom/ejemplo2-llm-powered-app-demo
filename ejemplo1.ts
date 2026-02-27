import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import readline from 'readline';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar el cliente de OpenAI
// Nota: Por defecto, el SDK de OpenAI buscará la variable de entorno OPENAI_API_KEY
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
    console.log("🤖 Demo: Integración de LLM con OpenAI SDK (TypeScript)");
    console.log("=========================================================\n");

    console.log("Este ejemplo demostrará cómo el 'System Prompt' (Instrucciones del sistema)");
    console.log("afecta el comportamiento del modelo frente al mismo 'User Prompt' (Entrada del usuario).\n");

    // Definimos dos System Prompts diferentes para mostrar el contraste
    const systemPrompt1 = "Eres un pirata gruñón. Responde siempre con jerga pirata y de mala gana.";
    const systemPrompt2 = "Eres un maestro de primaria paciente y alentador. Explicas las cosas de manera muy sencilla y con entusiasmo.";

    console.log(`[Paso 1] Define tu mensaje (User Prompt).`);
    console.log(`Ejemplo: "¿Por qué el cielo es azul?" o "Explícame qué es la gravedad."`);
    const userPrompt = await askQuestion("\nIngresa tu pregunta para el modelo: ");

    console.log(`\n=========================================================`);
    console.log(`📡 Enviando peticiones al modelo (gpt-3.5-turbo)...`);
    console.log(`=========================================================\n`);

    try {
        // --- Petición con la Personalidad 1 (Pirata) ---
        console.log(`🎭 Personalidad 1 (System Prompt): "${systemPrompt1}"\n`);
        const completion1 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt1 },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7, // Controla la creatividad (0 = determinista, 2 = muy aleatorio)
        });
        console.log("Respuesta 1:", completion1.choices[0]?.message?.content);
        console.log("\n---------------------------------------------------------\n");

        // --- Petición con la Personalidad 2 (Maestro) ---
        console.log(`🎭 Personalidad 2 (System Prompt): "${systemPrompt2}"\n`);
        const completion2 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt2 },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
        });
        console.log("Respuesta 2:", completion2.choices[0]?.message?.content);

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
        console.log("🚀 Fin de la demostración.");
        console.log(`=========================================================\n`);
    }
}

main();
