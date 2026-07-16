const PORT = parseInt(process.env.PORT || "3001");

const server = Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  fetch(req) {
    const url = new URL(req.url);

    // Health check
    if (url.pathname === "/health") {
      return Response.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "0.1.0",
      });
    }

    // API root
    if (url.pathname === "/api") {
      return Response.json({
        name: "CareCircle API",
        version: "0.1.0",
        docs: "/api/health",
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`CareCircle API server running on http://localhost:${server.port}`);
