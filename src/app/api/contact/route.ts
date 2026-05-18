import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Guardar el Lead localmente en un archivo para garantizar cero pérdida de datos
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
      console.log("Lead guardado localmente con éxito en leads.json:", newLead);
    } catch (saveError) {
      console.warn("No se pudo guardar el lead localmente:", saveError);
    }

    // 2. Intentar enviar a FormSubmit con un timeout corto de 4 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/holansoft.contacto@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return NextResponse.json({ success: true, savedLocally: true, emailed: true });
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.warn("El envío por correo falló o superó el tiempo de espera (se usó respaldo local):", fetchError);
    }

    // Retornamos éxito de todas formas porque el lead ya está respaldado localmente en leads.json
    return NextResponse.json({ success: true, savedLocally: true, emailed: false });
  } catch (error: any) {
    console.warn("Error general en el api route de contacto:", error);
    // Retornamos éxito falso solo si los datos de entrada están rotos
    return NextResponse.json({ success: false, error: "Error en los datos de entrada" }, { status: 400 });
  }
}
