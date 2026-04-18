import { NextResponse } from "next/server";

// Structure of a Part
export interface Part {
  id: string;
  name: string;
  category: string;
  image_url: string;
  description: string;
  price_visible: string;
  enquiry_link: string;
}

// Mock Data fallback if Google Sheet isn't linked yet
const mockParts: Part[] = [
  {
    id: "1",
    name: "Carbon Fiber Front Splitter",
    category: "Body Kits",
    image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600",
    description: "Aggressive front-end styling with premium aerospace-grade carbon fiber.",
    price_visible: "$850.00",
    enquiry_link: "#contact"
  },
  {
    id: "2",
    name: "Titanium Exhaust System",
    category: "Performance Parts",
    image_url: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=600",
    description: "Reduces weight and significantly improves exhaust flow and exhaust note.",
    price_visible: "$1,899.00",
    enquiry_link: "#contact"
  },
  {
    id: "3",
    name: "Forged Alloy Wheels",
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600",
    description: "Lightweight forged wheels, 19-inch staggered setup.",
    price_visible: "$2,200.00",
    enquiry_link: "#contact"
  },
  {
    id: "4",
    name: "Aero Side Skirts",
    category: "Body Kits",
    image_url: "https://images.unsplash.com/photo-1503376713289-4bc2754f9a0c?q=80&w=600",
    description: "Enhance side profile aerodynamics and ground-hugging aesthetic.",
    price_visible: "$450.00",
    enquiry_link: "#contact"
  },
];

export async function GET() {
  const sheetUrl = process.env.GOOGLE_SHEETS_PARTS_URL;
  
  if (!sheetUrl) {
    // If no Google Sheet URL is provided in .env.local, return the mock data!
    return NextResponse.json({ success: true, data: mockParts });
  }

  try {
    const response = await fetch(sheetUrl, { cache: "no-store" });
    const csvText = await response.text();
    
    // Basic CSV Parser (splits by newline, then by comma)
    const rows = csvText.split("\n").map(row => row.split(","));
    
    // Extract headers (first row) and map remaining rows to objects
    const headers = rows[0].map(h => h.trim());
    const parsedData: Part[] = rows.slice(1).filter(row => row.length === headers.length).map(row => {
      const part: Record<string, string> = {};
      headers.forEach((header, index) => {
        // Simple regex to handle quoted CSV strings roughly
        part[header] = row[index] ? row[index].replace(/(^"|"$)/g, "").trim() : "";
      });
      return part as Part;
    });

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error fetching parts from Google Sheets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch parts catalogue", data: mockParts }, // fallback to mock on error
      { status: 200 }
    );
  }
}
