async function test() {
  try {
    const response = await fetch("https://formsubmit.co/ajax/holansoft.contacto@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Nombre: "Test Diagnóstico",
        Email: "test@holansoft.com",
        Teléfono: "12345678",
        Empresa: "HolanSoft Diagnóstico",
        Plan_Interés: "Plan Crecimiento",
        _subject: "Diagnóstico de Integración de Correo"
      })
    });
    
    console.log("Status Code:", response.status);
    const data = await response.json();
    console.log("Response Data:", data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

test();
