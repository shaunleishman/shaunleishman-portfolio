"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MESSAGE = "Hello I am Shaun";
const VB_W = 520;
const VB_H = 380;
/** Constant cursor speed — linear px/s feels closest to real mouse movement */
const CURSOR_SPEED_PX_S = 320;
const DRAG_SPEED_PX_S = 280;

type Point = { x: number; y: number };

type Shape = {
  id: number;
  type: "rect" | "ellipse";
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  selected: boolean;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function linearDuration(from: Point, to: Point, speedPxS: number, minMs = 180) {
  return Math.max(minMs, (distance(from, to) / speedPxS) * 1000);
}

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/** Linear interpolation over time — no easing */
function animateLinear(
  duration: number,
  onFrame: (t: number) => void,
  signal: AbortSignal,
) {
  return new Promise<void>((resolve, reject) => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      if (signal.aborted) {
        cancelAnimationFrame(raf);
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      onFrame(t);
      if (t < 1) raf = requestAnimationFrame(tick);
      else resolve();
    };

    raf = requestAnimationFrame(tick);
  });
}

function FigmaCursor({ x, y, pressing }: { x: number; y: number; pressing: boolean }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${pressing ? 0.94 : 1})`}>
      <path
        d="M0 0 L0 18 L5 14 L9 22 L12 20.5 L8 12.5 L15 12.5 Z"
        fill="#ffffff"
        stroke="#0a0a0a"
        strokeWidth="1.25"
        strokeLinejoin="round"
        filter="url(#cursor-shadow)"
      />
    </g>
  );
}

function CommentBubble({
  x,
  y,
  text,
  opacity,
  showCaret,
}: {
  x: number;
  y: number;
  text: string;
  opacity: number;
  showCaret: boolean;
}) {
  const width = Math.max(168, text.length * 7.5 + 56);

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <rect
        x={0}
        y={0}
        width={width}
        height={52}
        rx={10}
        fill="#ffffff"
        filter="url(#bubble-shadow)"
      />
      <path d="M14 52 L22 44 L30 52 Z" fill="#ffffff" />
      <circle cx={22} cy={26} r={12} fill="#3b66f5" />
      <text x={22} y={30} textAnchor="middle" fill="#ffffff" fontSize={11} fontWeight={600}>
        S
      </text>
      <text x={42} y={30} fill="#0a0a0a" fontSize={13} fontFamily="var(--font-inter, Inter, sans-serif)">
        {text}
        {showCaret && (
          <tspan className="figma-caret-blink" fill="#3b66f5">
            |
          </tspan>
        )}
      </text>
    </g>
  );
}

function StaticFallback() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full max-w-lg mx-auto lg:max-w-none"
      aria-hidden
    >
      <ArtboardBackground />
      <rect x={248} y={148} width={112} height={72} rx={4} fill="rgba(59,102,245,0.18)" stroke="#3b66f5" strokeWidth={1.5} />
      <ellipse cx={340} cy={268} rx={52} ry={34} fill="rgba(59,102,245,0.12)" stroke="#3b66f5" strokeWidth={1.5} />
      <CommentBubble x={148} y={88} text={MESSAGE} opacity={1} showCaret={false} />
      <FigmaCursor x={132} y={132} pressing={false} />
    </svg>
  );
}

function ArtboardBackground() {
  const frameX = 24;
  const frameY = 24;
  const frameW = 472;
  const frameH = 332;
  const chromeH = 36;
  const inset = 12;
  const canvasX = frameX + inset;
  const canvasY = frameY + chromeH + inset;
  const canvasW = frameW - inset * 2;
  const canvasH = frameH - chromeH - inset * 2;

  return (
    <>
      <defs>
        <clipPath id="figma-frame-clip">
          <rect x={frameX} y={frameY} width={frameW} height={frameH} rx={18} />
        </clipPath>
        <clipPath id="figma-canvas-clip">
          <rect x={canvasX} y={canvasY} width={canvasW} height={canvasH} rx={8} />
        </clipPath>
        <filter id="cursor-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.35" />
        </filter>
        <filter id="bubble-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect
        x={frameX}
        y={frameY}
        width={frameW}
        height={frameH}
        rx={18}
        fill="#181818"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.5}
      />

      <g clipPath="url(#figma-frame-clip)">
        {/* Single fill — no layered rects that create seams */}
        <rect x={frameX} y={frameY} width={frameW} height={frameH} fill="#181818" />
        <rect x={frameX} y={frameY} width={frameW} height={chromeH} fill="rgba(255,255,255,0.04)" />
        <circle cx={48} cy={frameY + 18} r={4} fill="rgba(255,255,255,0.22)" />
        <circle cx={62} cy={frameY + 18} r={4} fill="rgba(255,255,255,0.12)" />
        <circle cx={76} cy={frameY + 18} r={4} fill="rgba(255,255,255,0.12)" />

        <g clipPath="url(#figma-canvas-clip)">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={canvasX + 12 + i * 54}
              y1={canvasY}
              x2={canvasX + 12 + i * 54}
              y2={canvasY + canvasH}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={canvasX}
              y1={canvasY + 12 + i * 52}
              x2={canvasX + canvasW}
              y2={canvasY + 12 + i * 52}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          ))}
        </g>

        <rect
          x={canvasX}
          y={canvasY}
          width={canvasW}
          height={canvasH}
          rx={8}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
        />
      </g>
    </>
  );
}

export function FigmaHeroAnimation({ className }: { className?: string }) {
  const [cursor, setCursor] = useState<Point>({ x: 72, y: 300 });
  const [pressing, setPressing] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentOpacity, setCommentOpacity] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCaret, setShowCaret] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [dragPreview, setDragPreview] = useState<(Shape & { dashed?: boolean }) | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const shapeId = useRef(0);
  const cursorRef = useRef<Point>({ x: 72, y: 300 });

  const setCursorPoint = useCallback((point: Point) => {
    cursorRef.current = point;
    setCursor(point);
  }, []);

  const animateCursor = useCallback(async (to: Point, signal: AbortSignal) => {
    const from = { ...cursorRef.current };
    const duration = linearDuration(from, to, CURSOR_SPEED_PX_S);
    await animateLinear(
      duration,
      (t) => {
        const next = { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
        cursorRef.current = next;
        setCursor(next);
      },
      signal,
    );
    setCursorPoint(to);
  }, [setCursorPoint]);

  const animateDragShape = useCallback(
    async (type: "rect" | "ellipse", from: Point, to: Point, signal: AbortSignal) => {
      setPressing(true);
      const x = Math.min(from.x, to.x);
      const y = Math.min(from.y, to.y);
      const w = Math.abs(to.x - from.x);
      const h = Math.abs(to.y - from.y);
      const duration = linearDuration(from, to, DRAG_SPEED_PX_S, 220);

      await animateLinear(
        duration,
        (t) => {
          const next = { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
          cursorRef.current = next;
          setCursor(next);
          setDragPreview({
            id: -1,
            type,
            x,
            y,
            w: w * t,
            h: h * t,
            opacity: 1,
            selected: false,
            dashed: true,
          });
        },
        signal,
      );

      setPressing(false);
      setDragPreview(null);
      shapeId.current += 1;
      setShapes((prev) => [
        ...prev,
        { id: shapeId.current, type, x, y, w, h, opacity: 1, selected: false },
      ]);
    },
    [],
  );

  const fadeComment = useCallback(async (from: number, to: number, duration: number, signal: AbortSignal) => {
    await animateLinear(duration, (t) => setCommentOpacity(lerp(from, to, t)), signal);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false) return;

    const controller = new AbortController();
    const { signal } = controller;

    const reset = () => {
      setCursorPoint({ x: 72, y: 300 });
      setPressing(false);
      setCommentOpen(false);
      setCommentOpacity(0);
      setTypedText("");
      setShowCaret(false);
      setShapes([]);
      setDragPreview(null);
    };

    const run = async () => {
      while (!signal.aborted) {
        reset();
        await sleep(400, signal);

        await animateCursor({ x: 168, y: 148 }, signal);
        await sleep(120, signal);

        setCommentOpen(true);
        await fadeComment(0, 1, 200, signal);
        setShowCaret(true);

        for (let i = 0; i <= MESSAGE.length; i++) {
          setTypedText(MESSAGE.slice(0, i));
          await sleep(70, signal);
        }
        setShowCaret(false);
        await sleep(700, signal);

        const fadeMove = animateCursor({ x: 236, y: 196 }, signal);
        const fadeOut = fadeComment(1, 0, 300, signal);
        await Promise.all([fadeMove, fadeOut]);
        setCommentOpen(false);

        await animateCursor({ x: 248, y: 148 }, signal);
        await animateDragShape("rect", { x: 248, y: 148 }, { x: 360, y: 220 }, signal);
        await sleep(150, signal);

        await animateCursor({ x: 288, y: 238 }, signal);
        await animateDragShape("ellipse", { x: 288, y: 238 }, { x: 392, y: 306 }, signal);
        await sleep(200, signal);

        await animateCursor({ x: 304, y: 184 }, signal);
        setPressing(true);
        await sleep(80, signal);
        setPressing(false);
        setShapes((prev) => prev.map((s) => ({ ...s, selected: true })));
        await sleep(350, signal);

        await animateCursor({ x: 330, y: 230 }, signal);
        setPressing(true);
        await sleep(80, signal);
        setPressing(false);

        await animateLinear(350, (t) => {
          setShapes((prev) => prev.map((s) => ({ ...s, opacity: 1 - t, selected: true })));
        }, signal);
        setShapes([]);
        await sleep(150, signal);

        await animateCursor({ x: 72, y: 300 }, signal);
        await sleep(500, signal);
      }
    };

    run().catch(() => {
      /* aborted */
    });

    return () => controller.abort();
  }, [reducedMotion, animateCursor, animateDragShape, fadeComment]);

  if (reducedMotion === null) {
    return (
      <div className={cn("relative w-full", className)}>
        <StaticFallback />
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div className={cn("relative", className)}>
        <StaticFallback />
      </div>
    );
  }

  const bubbleX = cursor.x + 18;
  const bubbleY = cursor.y - 68;

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full max-w-lg mx-auto lg:max-w-none"
        aria-hidden
        role="img"
        aria-label="Animated design canvas showing a comment and shapes being drawn"
      >
        <ArtboardBackground />

        {shapes.map((shape) => (
          <g key={shape.id} opacity={shape.opacity}>
            {shape.type === "rect" ? (
              <rect
                x={shape.x}
                y={shape.y}
                width={shape.w}
                height={shape.h}
                rx={4}
                fill="rgba(59,102,245,0.16)"
                stroke={shape.selected ? "#3b66f5" : "rgba(59,102,245,0.65)"}
                strokeWidth={shape.selected ? 2 : 1.5}
              />
            ) : (
              <ellipse
                cx={shape.x + shape.w / 2}
                cy={shape.y + shape.h / 2}
                rx={shape.w / 2}
                ry={shape.h / 2}
                fill="rgba(59,102,245,0.12)"
                stroke={shape.selected ? "#3b66f5" : "rgba(59,102,245,0.65)"}
                strokeWidth={shape.selected ? 2 : 1.5}
              />
            )}
            {shape.selected && (
              <rect
                x={shape.x - 2}
                y={shape.y - 2}
                width={shape.w + 4}
                height={shape.h + 4}
                rx={shape.type === "rect" ? 6 : shape.w / 2 + 2}
                fill="none"
                stroke="#3b66f5"
                strokeWidth={1}
                strokeDasharray="4 3"
                opacity={0.55}
              />
            )}
          </g>
        ))}

        {dragPreview && (
          <g opacity={0.85}>
            {dragPreview.type === "rect" ? (
              <rect
                x={dragPreview.x}
                y={dragPreview.y}
                width={Math.max(dragPreview.w, 1)}
                height={Math.max(dragPreview.h, 1)}
                rx={4}
                fill="rgba(59,102,245,0.08)"
                stroke="#3b66f5"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
            ) : (
              <ellipse
                cx={dragPreview.x + Math.max(dragPreview.w, 1) / 2}
                cy={dragPreview.y + Math.max(dragPreview.h, 1) / 2}
                rx={Math.max(dragPreview.w, 1) / 2}
                ry={Math.max(dragPreview.h, 1) / 2}
                fill="rgba(59,102,245,0.08)"
                stroke="#3b66f5"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
            )}
          </g>
        )}

        {commentOpen && (
          <CommentBubble
            x={bubbleX}
            y={bubbleY}
            text={typedText}
            opacity={commentOpacity}
            showCaret={showCaret}
          />
        )}

        <FigmaCursor x={cursor.x} y={cursor.y} pressing={pressing} />
      </svg>
    </div>
  );
}
