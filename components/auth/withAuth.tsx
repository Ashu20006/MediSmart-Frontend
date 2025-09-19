"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      let token = localStorage.getItem("token");

      // If no token in localStorage, try to sync from cookie
      if (!token && typeof document !== "undefined") {
        const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
        if (match) {
          try {
            const cookieToken = decodeURIComponent(match[1]);
            if (cookieToken) {
              localStorage.setItem("token", cookieToken);
              token = cookieToken;
            }
          } catch {}
        }
      }

      if (!token) {
        router.push("/login");
        return;
      }

      // If user info missing, try to fetch and cache it
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("userRole");
      if (!storedUser || !storedRole) {
        (async () => {
          try {
            const res = await fetch("http://localhost:8080/api/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
              credentials: "include",
            });
            if (res.ok) {
              const user = await res.json();
              localStorage.setItem("user", JSON.stringify(user));
              if (user?.role) localStorage.setItem("userRole", user.role);
            } else if (res.status === 401) {
              router.push("/login");
            }
          } catch {
            // ignore
          }
        })();
      }
    }, [router]);

    return <Component {...props} />;
  };
}
