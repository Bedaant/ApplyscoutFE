import { useState } from "react";

export const SAMPLE_QUEUE = [
  { id: 1, title: "Product Operations Lead", company: "Northwind Labs", status: "ready" },
  { id: 2, title: "Senior Ops Analyst", company: "Halden & Co.", status: "ready" },
  { id: 3, title: "Program Manager", company: "Brightloom", status: "ready" },
];

export const useQueue = () => {
  const [items, setItems] = useState(SAMPLE_QUEUE);
  const [history, setHistory] = useState([]);
  const [paused, setPaused] = useState(false);

  const act = (id, status) => {
    if (paused && status === "approved") return;
    setHistory((h) => [...h, items]);
    setItems((list) => list.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const undo = () => {
    if (!history.length) return;
    setItems(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };
  const firstReady = items.find((x) => x.status === "ready");

  return { items, paused, setPaused, act, undo, canUndo: history.length > 0, firstReady };
};
