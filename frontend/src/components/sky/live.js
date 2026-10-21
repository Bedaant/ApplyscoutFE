import { useEffect, useState } from "react";
import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const logoUrl = (domain) => (domain ? `${API}/jobs/logo/${domain}` : null);

export const daysAgo = (iso) => {
  if (!iso) return "";
  const d = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
  return d === 0 ? "today" : d === 1 ? "1 day ago" : `${d} days ago`;
};

const cache = {};

export const useLiveJobs = (region, limit = 5) => {
  const key = `${region}:${limit}`;
  const [state, setState] = useState(() => cache[key] || { status: "loading", jobs: [], adzuna: false });

  useEffect(() => {
    let alive = true;
    if (cache[key]) { setState(cache[key]); return undefined; }
    setState((s) => ({ ...s, status: "loading" }));
    axios
      .get(`${API}/jobs/live`, { params: { region, limit } })
      .then((r) => {
        const next = { status: "ready", jobs: r.data.jobs, adzuna: r.data.adzuna, refreshedAt: r.data.refreshed_at };
        cache[key] = next;
        if (alive) setState(next);
      })
      .catch(() => alive && setState({ status: "error", jobs: [], adzuna: false }));
    return () => { alive = false; };
  }, [key, region, limit]);

  return state;
};

let companiesPromise;
export const useCompanies = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    companiesPromise = companiesPromise || axios.get(`${API}/jobs/companies`).then((r) => r.data.companies);
    let alive = true;
    companiesPromise.then((c) => alive && setList(c)).catch(() => { companiesPromise = null; });
    return () => { alive = false; };
  }, []);
  return list;
};
