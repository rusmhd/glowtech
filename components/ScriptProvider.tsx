export default function ScriptProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  const businessStreet = process.env.NEXT_PUBLIC_BUSINESS_STREET;
  const businessCity = process.env.NEXT_PUBLIC_BUSINESS_CITY;
  const businessPostalCode = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE;
  const businessCountry = process.env.NEXT_PUBLIC_BUSINESS_COUNTRY;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "GlowTech Automotive",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200",
    "@id": "https://glowtech-auto.com",
    url: "https://glowtech-auto.com",
    priceRange: "$$$",
  };

  if (businessPhone) {
    schema.telephone = businessPhone;
  }

  if (businessStreet || businessCity || businessPostalCode || businessCountry) {
    schema.address = {
      "@type": "PostalAddress",
      ...(businessStreet ? { streetAddress: businessStreet } : {}),
      ...(businessCity ? { addressLocality: businessCity } : {}),
      ...(businessPostalCode ? { postalCode: businessPostalCode } : {}),
      ...(businessCountry ? { addressCountry: businessCountry } : {}),
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {children}
    </>
  );
}