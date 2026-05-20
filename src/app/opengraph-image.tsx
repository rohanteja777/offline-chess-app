import { ImageResponse } from "next/og";

export const alt = "Offline Chess — Play free chess in your browser";
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
            fontSize: 30,
            color: "#94a3b8",
            maxWidth: 800,
            textAlign: "center",
            marginBottom: 40
          }}
        >
          Legal moves · Move history · Undo & flip board
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 48px",
            borderRadius: 12,
            background: "#3b82f6",
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 0.5
          }}
        >
          Play Now — It&apos;s Free
        </div>
      </div>
    ),
    { ...size }
  );
}
