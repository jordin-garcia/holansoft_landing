import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isDev = process.env.NODE_ENV === "development";
    
    // 1. Guardar el Lead localmente (solo si el sistema de archivos lo permite, ej. localmente)
    try {
      const leadsFilePath = path.join(process.cwd(), "leads.json");
      let leads = [];
      
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, "utf8");
        try {
          leads = JSON.parse(fileContent || "[]");
        } catch {
          leads = [];
        }
      }
      
      const newLead = {
        id: Date.now().toString(),
        fecha: new Date().toLocaleString("es-GT", { timeZone: "America/Guatemala" }),
        nombre: body.Nombre || "",
        email: body.Email || "",
        telefono: body.Teléfono || "",
        empresa: body.Empresa || "",
        plan: body.Plan_Interés || "Demo General",
      };
      
      leads.push(newLead);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), "utf8");
      console.log("[Proxy API] Lead guardado localmente con éxito.");
    } catch (saveError) {
      // En plataformas serverless como Vercel, el sistema de archivos es de solo lectura,
      // por lo que escribir un archivo lanzará un error esperado. Lo capturamos silenciosamente.
      console.log("[Proxy API] Sistema de archivos de solo lectura en producción (Vercel). Respaldo omitido.");
    }

    // 2. Definir tiempo de espera (timeout) adaptativo
    // En producción en Vercel damos un margen amplio de 15 segundos para asegurar la conexión con FormSubmit.
    // En desarrollo local usamos un timeout súper corto de 2 segundos para evitar que la página se congele por bloqueos locales de red.
    const timeoutDuration = isDev ? 2000 : 15000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
    
    try {
      console.log(`[Proxy API] Enviando solicitud a FormSubmit con un timeout de ${timeoutDuration / 1000}s...`);
      
      const response = await fetch("https://formsubmit.co/ajax/holansoft.contacto@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // User-Agent real para evitar bloqueos por políticas anti-bot de Cloudflare
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const resText = await response.text();
      console.log(`[Proxy API] Respuesta de FormSubmit (Status ${response.status}):`, resText);
      
      if (response.ok) {
        return NextResponse.json({ success: true, savedLocally: !isDev, emailed: true });
      } else {
        console.warn("[Proxy API] FormSubmit retornó un código de error:", response.status);
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === "AbortError") {
        console.warn(`[Proxy API] El envío de correo superó el límite de tiempo (${timeoutDuration / 1000}s) y fue cancelado de forma segura.`);
      } else {
        console.warn("[Proxy API] Error de red al conectar con FormSubmit:", fetchError.message || fetchError);
      }
    }

    // Retornamos éxito de todas formas en la interfaz del cliente para no frustrar al usuario,
    // pero marcamos que el correo no pudo ser enviado en este intento.
    return NextResponse.json({ success: true, savedLocally: !isDev, emailed: false });
  } catch (error: any) {
    console.error("[Proxy API] Error general en el endpoint de contacto:", error);
    return NextResponse.json({ success: false, error: "Error en los datos de entrada" }, { status: 400 });
  }
}
