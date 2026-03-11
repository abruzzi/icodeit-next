"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { SubjectNode, ObserverNode, makeEdgesForStep, type FlowStep } from "./common";
import { color as colorPreset, farm as farmPreset } from "./presets";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type FlowDiagramVariant = "observer" | "farm";

const presets = { observer: colorPreset, farm: farmPreset } as const;

export function FlowDiagram({
  variant = "observer",
  title,
  step = 1,
}: {
  variant?: FlowDiagramVariant;
  title?: string;
  step?: FlowStep;
}) {
  const preset = presets[variant];
  const [state, setState] = useState<string>(() => preset.initialState);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      subject: SubjectNode,
      observer: ObserverNode,
    }),
    []
  );
  const edgeTypes: EdgeTypes = useMemo(() => ({}), []);

  const initial = useMemo(() => {
    const es = (preset.makeEdgesForStep ?? makeEdgesForStep)(step);
    const ns = preset.makeNodesForStep(step, state);
    return {
      nodes: preset.applyNotification(ns, es, state),
      edges: es,
    };
  }, [step, state, preset]);

  const [nodes, setNodes] = useState<Node[]>(() => initial.nodes);
  const [edges, setEdges] = useState<Edge[]>(() => initial.edges);

  useEffect(() => {
    setState(preset.initialState);
    const es = (preset.makeEdgesForStep ?? makeEdgesForStep)(step);
    const ns = preset.makeNodesForStep(step, preset.initialState);
    setNodes(preset.applyNotification(ns, es, preset.initialState));
    setEdges(es);
  }, [step, variant, preset]);

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
      const next = preset.nextState(state);
      setState(next);
      setNodes((ns) => preset.applyNotification(ns, edges, next));
    },
    [edges, state, preset]
  );

  const stepKey = `${variant}-${step}`;

  const edgesReconnectable = step === 4;
  const initialZoom = 1;
  const minZoom = 0.6;
  const maxZoom = 1.6;

  const addObserver = useCallback(() => {
    if (step !== 3 || !preset.createNewObserver) return;

    const idx = observerCounterRef.current + 1;
    observerCounterRef.current = idx;
    const { node: newNode, edge: newEdge } = preset.createNewObserver(idx);

    setNodes((currentNodes) => [...currentNodes, newNode]);
    setEdges((currentEdges) => [...currentEdges, newEdge]);

    setTimeout(() => {
      reactFlowInstanceRef.current?.fitView({
        padding: 0.2,
        maxZoom: initialZoom,
      });
    }, 0);
  }, [step, preset]);

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
          <span>{preset.step3Message}</span>
          {preset.createNewObserver && (
            <button
              type="button"
              onClick={addObserver}
              className="ml-2 inline-flex items-center rounded border border-slate-300 dark:border-slate-600 px-2 py-0.5 text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              + Add observer
            </button>
          )}
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
