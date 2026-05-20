import { ImageResponse } from "next/og";

export const alt = "Offline Chess";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginBottom: 16
          }}
        >
          Offline Chess
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            maxWidth: 800,
            textAlign: "center"
          }}
        >
          Legal moves · Move history · Undo & flip board
        </div>
      </div>
    ),
    { ...size }
  );
}
