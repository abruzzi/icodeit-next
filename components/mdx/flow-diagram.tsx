"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Barlow } from "next/font/google";
import {
  ReactFlow,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  reconnectEdge,
  Handle,
  Position,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeProps,
  type NodeTypes,
  type EdgeTypes,
  type OnReconnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type SubjectNodeData = {
  label: string;
  colorHex: string;
};

type ObserverMode = "swatch" | "hex";

type ObserverNodeData = {
  label: string;
  mode: ObserverMode;
  latestHex?: string;
};

type FlowDiagramVariant = "observer";

type FlowStep = 1 | 2 | 3 | 4;

const PALETTE = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"] as const;

function SubjectNode({ data }: NodeProps<Node<SubjectNodeData>>) {
  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border-b border-slate-200 dark:border-slate-700">
        Subject: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="mt-2 flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
            style={{ backgroundColor: data.colorHex }}
          />
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {data.colorHex}
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

function ObserverNode({ data }: NodeProps<Node<ObserverNodeData>>) {
  const hex = data.latestHex ?? "—";
  const swatch =
    data.mode === "swatch" && data.latestHex ? (
      <span
        className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: data.latestHex }}
      />
    ) : null;

  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <Handle type="target" position={Position.Left} />

      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200 border-b border-slate-200 dark:border-slate-700">
        Observer: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="mt-2 flex items-center gap-2">
          {swatch}
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {hex}
          </span>
        </div>
      </div>
    </div>
  );
}

function makeNodesForStep(step: FlowStep, colorHex: string): Node[] {
  const nodes: Node[] = [
    {
      id: "subject",
      type: "subject",
      position: { x: 80, y: 120 },
      data: { label: "Color", colorHex } satisfies SubjectNodeData,
    },
  ];

  if (step >= 2) {
    nodes.push({
      id: "observer-a",
      type: "observer",
      position: { x: 360, y: 70 },
      data: {
        label: "A",
        mode: "swatch",
        latestHex: undefined,
      } satisfies ObserverNodeData,
    });
  }

  if (step >= 3) {
    nodes.push({
      id: "observer-b",
      type: "observer",
      position: { x: 360, y: 180 },
      data: {
        label: "B",
        mode: "hex",
        latestHex: undefined,
      } satisfies ObserverNodeData,
    });
  }

  return nodes;
}

function makeEdgesForStep(step: FlowStep): Edge[] {
  const edges: Edge[] = [];

  if (step >= 2) {
    edges.push({
      id: "s-a",
      source: "subject",
      target: "observer-a",
      label: "notify",
      type: "default",
      reconnectable: true,
    });
  }

  if (step >= 3) {
    edges.push({
      id: "s-b",
      source: "subject",
      target: "observer-b",
      label: "notify",
      type: "default",
      reconnectable: true,
    });
  }

  return edges;
}

function nextColorHex(current: string) {
  const idx = PALETTE.indexOf(current as (typeof PALETTE)[number]);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % PALETTE.length;
  return PALETTE[nextIdx];
}

function observersConnectedToSubject(edges: Edge[]) {
  return new Set(
    edges
      .filter((e) => e.source === "subject")
      .map((e) => e.target)
      .filter(Boolean) as string[]
  );
}

function applyNotification(nodes: Node[], edges: Edge[], subjectHex: string): Node[] {
  const connected = observersConnectedToSubject(edges);
  return nodes.map((n) => {
    if (n.id === "subject") {
      return {
        ...n,
        data: { ...(n.data as SubjectNodeData), colorHex: subjectHex },
      };
    }

    if (n.type === "observer") {
      if (!connected.has(n.id)) {
        return n;
      }
      return {
        ...n,
        data: { ...(n.data as ObserverNodeData), latestHex: subjectHex },
      };
    }

    return n;
  });
}

export function FlowDiagram({
  variant = "observer",
  title,
  step = 1,
}: {
  variant?: FlowDiagramVariant;
  title?: string;
  step?: FlowStep;
}) {
  const [subjectHex, setSubjectHex] = useState<string>(PALETTE[0]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      subject: SubjectNode,
      observer: ObserverNode,
    }),
    []
  );
  const edgeTypes: EdgeTypes = useMemo(() => ({}), []);

  const initial = useMemo(() => {
    const ns = makeNodesForStep(step, subjectHex);
    const es = makeEdgesForStep(step);
    return {
      nodes: applyNotification(ns, es, subjectHex),
      edges: es,
    };
    // step is included so the first render matches the step
  }, [step, subjectHex]);

  const [nodes, setNodes] = useState<Node[]>(() => initial.nodes);
  const [edges, setEdges] = useState<Edge[]>(() => initial.edges);

  const reconnectingEdgeId = useRef<string | null>(null);
  const reconnectCompleted = useRef(false);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onReconnectStart = useCallback((_: unknown, edge: Edge) => {
    reconnectingEdgeId.current = edge.id;
    reconnectCompleted.current = false;
  }, []);

  const onReconnect: OnReconnect = useCallback((oldEdge, newConnection) => {
    reconnectCompleted.current = true;
    reconnectingEdgeId.current = null;
    setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds));
  }, []);

  const onReconnectEnd = useCallback(
    (_event: unknown, edge: Edge, _handleType: unknown, connectionState: any) => {
      const wasValid = connectionState?.isValid === true;
      const shouldRemove =
        !reconnectCompleted.current && (!wasValid || connectionState?.isValid === false);

      if (!shouldRemove) return;

      // React Flow may revert the edge back synchronously after an invalid drop.
      // Removing in the next tick avoids the edge “snapping back” in our state.
      const edgeId = reconnectingEdgeId.current ?? edge.id;
      setTimeout(() => {
        setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      }, 0);

      reconnectCompleted.current = false;
      reconnectingEdgeId.current = null;
    },
    []
  );

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      if (node.id !== "subject") return;

      const nextHex = nextColorHex(subjectHex);
      setSubjectHex(nextHex);

      setNodes((ns) => applyNotification(ns, edges, nextHex));
    },
    [edges, subjectHex]
  );

  // If someone changes `step` prop later (MDX edit / hot reload),
  // keep the rendered graph aligned with the new step.
  // (We also re-apply the current subject state to any connected observers.)
  const stepKey = `${variant}-${step}`;

  const edgesReconnectable = step === 4;
  const fixedZoom = 1;
  const minZoom = fixedZoom;
  const maxZoom = fixedZoom;
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <figure
      className={`my-6 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/50 ${barlow.className}`}
      style={{ minHeight: 320 }}
    >
      {title && (
        <figcaption className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
          {title}
        </figcaption>
      )}
      <div className="w-full h-[320px]">
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.25) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0",
          }}
        >
          <ReactFlow
            key={stepKey}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onReconnectStart={onReconnectStart as any}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd as any}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            edgesReconnectable={edgesReconnectable}
            snapToGrid
            snapGrid={[16, 16]}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onMove={(_, viewport) => {
              setZoom(viewport.zoom);
            }}
            fitView
            fitViewOptions={{
              padding: step === 1 ? 0.4 : 0.2,
              maxZoom,
            }}
          >
            <Controls />
          </ReactFlow>
          {zoom !== null && (
            <div className="absolute bottom-2 right-3 rounded bg-slate-900/70 text-slate-200 px-2 py-0.5 text-[11px]">
              zoom {zoom.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
