import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, vehicle, service, message } = body;

    // Validate
    if (!name || !vehicle || !service) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    const sheetDbUrl = process.env.NEXT_PUBLIC_SHEETDB_URL;

    if (!sheetDbUrl || sheetDbUrl === "YOUR_SHEETDB_ENDPOINT" || sheetDbUrl === "") {
      if (process.env.NODE_ENV !== "production") {
        console.log("Mocking Form Submission to Google Sheets:", { name, vehicle, service, message });
        await new Promise((resolve) => setTimeout(resolve, 500));
        return NextResponse.json({ success: true, message: "Enquiry captured in development mode." });
      }

      return NextResponse.json(
        { success: false, error: "Enquiry form is not configured on this deployment yet." },
        { status: 503 }
      );
    }

    // Submit to SheetDB or Sheet.best
    // Typically requires wrapping payload in { "data": [ {...} ] } depending on the provider
    const response = await fetch(sheetDbUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Date: new Date().toLocaleString(),
            Name: name,
            Vehicle: vehicle,
            Service: service,
            Message: message || "",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to write to Google Sheets");
    }

    return NextResponse.json({ success: true, message: "Enquiry sent securely!" });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}