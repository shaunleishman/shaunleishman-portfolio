"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MESSAGE = "Hello I am Shaun";
const VB_W = 520;
const VB_H = 380;
const FRAME = { x: 24, y: 24, w: 472, h: 332, chromeH: 36, inset: 12 };
const CANVAS = {
  x: FRAME.x + FRAME.inset,
  y: FRAME.y + FRAME.chromeH + FRAME.inset,
  w: FRAME.w - FRAME.inset * 2,
  h: FRAME.h - FRAME.chromeH - FRAME.inset * 2,
};
const CANVAS_RIGHT = CANVAS.x + CANVAS.w;
const CANVAS_BOTTOM = CANVAS.y + CANVAS.h;
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
        stroke="#171717"
        strokeWidth="1.25"
        strokeLinejoin="round"
        filter="url(#cursor-shadow)"
      />
    </g>
  );
}

function measureCommentBubble(text: string, showCaret: boolean) {
  const padX = 10;
  const padY = 8;
  const avatarR = 11;
  const gap = 8;
  const fontSize = 13;
  const charW = 7.15;
  const minTextW = showCaret ? 4 : 0;
  const textW = Math.max(minTextW, text.length * charW + (showCaret ? 3 : 0));
  const width = padX + avatarR * 2 + gap + textW + padX;
  const height = padY * 2 + avatarR * 2;
  const midY = height / 2;
  const avatarCx = padX + avatarR;
  const textX = padX + avatarR * 2 + gap;

  return { width, height, midY, avatarCx, textX, fontSize };
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
  const { width, height, midY, avatarCx, textX, fontSize } = measureCommentBubble(text, showCaret);
  const tailX = Math.min(width * 0.22, 28);

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={8}
        fill="#ffffff"
        filter="url(#bubble-shadow)"
      />
      <path d={`M${tailX} ${height} L${tailX + 8} ${height - 8} L${tailX + 16} ${height} Z`} fill="#ffffff" />
      <circle cx={avatarCx} cy={midY} r={11} fill="#3b66f5" />
      <text x={avatarCx} y={midY + 4} textAnchor="middle" fill="#ffffff" fontSize={10} fontWeight={600}>
        S
      </text>
      <text
        x={textX}
        y={midY + 4}
        fill="#171717"
        fontSize={fontSize}
        fontFamily="var(--font-inter, Inter, sans-serif)"
      >
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
  const { x: frameX, y: frameY, w: frameW, h: frameH, chromeH } = FRAME;
  const { x: canvasX, y: canvasY, w: canvasW, h: canvasH } = CANVAS;

  return (
    <>
      <defs>
        <clipPath id="figma-frame-clip">
          <rect x={frameX} y={frameY} width={frameW} height={frameH} rx={18} />
        </clipPath>
        <clipPath id="figma-canvas-clip">
          <rect x={canvasX} y={canvasY} width={canvasW} height={canvasH} rx={8} />
        </clipPath>
        <pattern
          id="figma-canvas-dots"
          x={0}
          y={0}
          width={18}
          height={18}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={9} cy={9} r={1.25} fill="rgba(255,255,255,0.14)" />
        </pattern>
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
          <rect x={canvasX} y={canvasY} width={canvasW} height={canvasH} fill="#141414" />
          <rect x={canvasX} y={canvasY} width={canvasW} height={canvasH} fill="url(#figma-canvas-dots)" />
        </g>
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
  const [marqueePreview, setMarqueePreview] = useState<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );
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

  const animateMarqueeSelect = useCallback(async (from: Point, to: Point, signal: AbortSignal) => {
    setPressing(true);
    const x = Math.min(from.x, to.x);
    const y = Math.min(from.y, to.y);
    const w = Math.abs(to.x - from.x);
    const h = Math.abs(to.y - from.y);
    const duration = linearDuration(from, to, DRAG_SPEED_PX_S, 240);

    await animateLinear(
      duration,
      (t) => {
        const next = { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
        cursorRef.current = next;
        setCursor(next);
        setMarqueePreview({ x, y, w: w * t, h: h * t });
      },
      signal,
    );

    setPressing(false);
    setMarqueePreview(null);
  }, []);

  const animateGroupDrag = useCallback(
    async (from: Point, to: Point, startShapes: Shape[], signal: AbortSignal) => {
      setPressing(true);
      const duration = linearDuration(from, to, DRAG_SPEED_PX_S, 360);
      const dx = to.x - from.x;
      const dy = to.y - from.y;

      await animateLinear(
        duration,
        (t) => {
          const next = { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
          cursorRef.current = next;
          setCursor(next);
          setShapes(
            startShapes.map((s) => ({
              ...s,
              x: s.x + dx * t,
              y: s.y + dy * t,
              selected: true,
            })),
          );
        },
        signal,
      );

      setPressing(false);
    },
    [],
  );

  const dragShapesOffCanvas = useCallback(
    (cursorFrom: Point, shapes: Shape[]) => {
      if (shapes.length === 0) return cursorFrom;

      const maxX = Math.max(...shapes.map((shape) => shape.x + shape.w));
      const maxY = Math.max(...shapes.map((shape) => shape.y + shape.h));
      const dx = CANVAS_RIGHT + 48 - maxX;
      const dy = Math.max(28, Math.min(CANVAS_BOTTOM + 32 - maxY, dx * 0.38));

      return { x: cursorFrom.x + dx, y: cursorFrom.y + dy };
    },
    [],
  );

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
      setMarqueePreview(null);
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
        await sleep(250, signal);

        await animateCursor({ x: 236, y: 136 }, signal);
        await animateMarqueeSelect({ x: 236, y: 136 }, { x: 406, y: 316 }, signal);
        let dragShapes: Shape[] = [];
        setShapes((prev) => {
          dragShapes = prev.map((s) => ({ ...s, selected: true }));
          return dragShapes;
        });
        await sleep(280, signal);

        await animateCursor({ x: 318, y: 218 }, signal);
        await sleep(100, signal);
        const dragFrom = { x: 318, y: 218 };
        const dragTo = dragShapesOffCanvas(dragFrom, dragShapes);
        await animateGroupDrag(dragFrom, dragTo, dragShapes, signal);
        setShapes([]);
        await sleep(200, signal);

        await animateCursor({ x: 72, y: 300 }, signal);
        await sleep(500, signal);
      }
    };

    run().catch(() => {
      /* aborted */
    });

    return () => controller.abort();
  }, [reducedMotion, animateCursor, animateDragShape, animateMarqueeSelect, animateGroupDrag, dragShapesOffCanvas, fadeComment, setCursorPoint]);

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

  const bubbleMetrics = measureCommentBubble(typedText, showCaret);
  const bubbleX = cursor.x + 16;
  const bubbleY = cursor.y - bubbleMetrics.height - 14;

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

        <g clipPath="url(#figma-canvas-clip)">
        {shapes.length > 1 && shapes.every((s) => s.selected) && (
          <rect
            x={Math.min(...shapes.map((s) => s.x)) - 6}
            y={Math.min(...shapes.map((s) => s.y)) - 6}
            width={Math.max(...shapes.map((s) => s.x + s.w)) - Math.min(...shapes.map((s) => s.x)) + 12}
            height={Math.max(...shapes.map((s) => s.y + s.h)) - Math.min(...shapes.map((s) => s.y)) + 12}
            rx={6}
            fill="rgba(59,102,245,0.06)"
            stroke="#3b66f5"
            strokeWidth={1.5}
          />
        )}

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

        {marqueePreview && (
          <rect
            x={marqueePreview.x}
            y={marqueePreview.y}
            width={Math.max(marqueePreview.w, 1)}
            height={Math.max(marqueePreview.h, 1)}
            fill="rgba(59,102,245,0.12)"
            stroke="#3b66f5"
            strokeWidth={1.5}
          />
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
        </g>
      </svg>
    </div>
  );
}
