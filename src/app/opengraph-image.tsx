import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.businessName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #1c2b3a 0%, #1e293b 50%, #1b5e20 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#86efac", marginBottom: 16 }}>
          Forensic accounting & quantum
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          {siteConfig.brandShort}
        </div>
        <div style={{ fontSize: 26, marginTop: 24, color: "#cbd5e1", maxWidth: 800 }}>
          Commercial dispute expert witness services for UK solicitors
        </div>
      </div>
    ),
    { ...size },
  );
}
