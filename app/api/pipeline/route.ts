import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  const { depth = "quick" } = await req.json();

  const orchestrator = path.join(
    process.cwd(),
    "content-machine",
    "orchestrator.py"
  );

  return new Promise<NextResponse>((resolve) => {
    const logs: string[] = [];

    const proc = spawn("python3", [orchestrator, "--full", "--depth", depth], {
      cwd: path.join(process.cwd(), "content-machine"),
      env: { ...process.env },
    });

    proc.stderr.on("data", (data: Buffer) => {
      const lines = data.toString().split("\n").filter(Boolean);
      logs.push(...lines);
    });

    proc.stdout.on("data", (data: Buffer) => {
      const lines = data.toString().split("\n").filter(Boolean);
      logs.push(...lines);
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve(
          NextResponse.json({ success: true, logs })
        );
      } else {
        resolve(
          NextResponse.json(
            { success: false, error: `Pipeline saiu com codigo ${code}`, logs },
            { status: 500 }
          )
        );
      }
    });

    proc.on("error", (err) => {
      resolve(
        NextResponse.json(
          { success: false, error: err.message, logs },
          { status: 500 }
        )
      );
    });

    // Timeout de 5 minutos
    setTimeout(() => {
      proc.kill();
      resolve(
        NextResponse.json(
          { success: false, error: "Pipeline timeout (5min)", logs },
          { status: 504 }
        )
      );
    }, 5 * 60 * 1000);
  });
}
