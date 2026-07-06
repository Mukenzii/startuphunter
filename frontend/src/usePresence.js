import { useEffect, useState } from 'react';
import { apiUrl } from './api';

// How often to tell the backend we're still here. Must be shorter than the
// backend's ONLINE_WINDOW_SECONDS (60s) so an active tab never flickers offline.
const HEARTBEAT_MS = 30000;

// A stable anonymous id per browser, used to de-duplicate presence.
function getClientId() {
  try {
    let id = localStorage.getItem('sh_client_id');
    if (!id) {
      id =
        (crypto.randomUUID && crypto.randomUUID()) ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem('sh_client_id', id);
    }
    return id;
  } catch {
    // Private mode / storage disabled: fall back to a per-session id.
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

// Sends a heartbeat on mount and every HEARTBEAT_MS, and returns the live
// count of visitors currently online (null until the first response).
export function usePresence() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    const clientId = getClientId();
    let alive = true;

    const beat = async () => {
      try {
        const res = await fetch(apiUrl('/startuphunterapp/presence/heartbeat/'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_id: clientId }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (alive && typeof data.online === 'number') setOnline(data.online);
      } catch {
        /* ignore transient network errors; next beat will retry */
      }
    };

    beat();
    const timer = setInterval(beat, HEARTBEAT_MS);

    // Re-check immediately when the user returns to the tab.
    const onVisible = () => {
      if (document.visibilityState === 'visible') beat();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return online;
}
