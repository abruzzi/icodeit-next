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
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeTypes,
  type EdgeTypes,
  type OnReconnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  SubjectNode,
  ObserverNode,
  PALETTE,
  makeNodesForStep,
  makeEdgesForStep,
  nextColorHex,
  applyNotification,
  type FlowStep,
  type ObserverNodeData,
} from "./common";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type FlowDiagramVariant = "observer";

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
  }, [step, subjectHex]);

  const [nodes, setNodes] = useState<Node[]>(() => initial.nodes);
  const [edges, setEdges] = useState<Edge[]>(() => initial.edges);

  const reconnectingEdgeId = useRef<string | null>(null);
  const reconnectCompleted = useRef(false);
  const observerCounterRef = useRef(3);
  const reactFlowInstanceRef = useRef<{
    fitView: (opts?: { padding?: number; maxZoom?: number }) => void;
  } | null>(null);

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
        !reconnectCompleted.current &&
        (!wasValid || connectionState?.isValid === false);

      if (!shouldRemove) return;

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

  const stepKey = `${variant}-${step}`;

  const edgesReconnectable = step === 4;
  const initialZoom = 1;
  const minZoom = 0.6;
  const maxZoom = 1.6;

  const addObserver = useCallback(() => {
    if (step !== 3) return;

    setNodes((currentNodes) => {
      const idx = observerCounterRef.current + 1;
      observerCounterRef.current = idx;

      const label = String.fromCharCode("A".charCodeAt(0) + (idx - 2));
      const id = `observer-${label.toLowerCase()}`;

      const baseX = 360;
      const baseY = 70;
      const offsetY = (idx - 1) * 90;

      const newNode: Node = {
        id,
        type: "observer",
        position: { x: baseX, y: baseY + offsetY },
        data: {
          label,
          mode: "hex",
          latestHex: undefined,
        } satisfies ObserverNodeData,
      };

      return [...currentNodes, newNode];
    });

    setEdges((currentEdges) => {
      const idx = observerCounterRef.current;
      const label = String.fromCharCode("A".charCodeAt(0) + (idx - 2));
      const id = `observer-${label.toLowerCase()}`;

      const newEdge: Edge = {
        id: `s-${id}`,
        source: "subject",
        target: id,
        label: "notify",
        type: "default",
        reconnectable: true,
      };

      return [...currentEdges, newEdge];
    });

    setTimeout(() => {
      reactFlowInstanceRef.current?.fitView({
        padding: 0.2,
        maxZoom: initialZoom,
      });
    }, 0);
  }, [step]);

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
      {step === 3 && (
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Click the Subject to change color. Observer B shows the hex only.</span>
          <button
            type="button"
            onClick={addObserver}
            className="ml-2 inline-flex items-center rounded border border-slate-300 dark:border-slate-600 px-2 py-0.5 text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            + Add observer
          </button>
        </div>
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
            onInit={(instance) => {
              reactFlowInstanceRef.current = instance;
            }}
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
            minZoom={minZoom}
            maxZoom={maxZoom}
            fitView
            fitViewOptions={{
              padding: step === 1 ? 0.4 : 0.2,
              maxZoom: initialZoom,
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </figure>
  );
}
