"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        if (!data.authenticated) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: "var(--primary-bg)" }}
      >
        <div className="animate-pulse" style={{ color: "var(--text-primary)" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: "var(--primary-bg)", fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center flex-wrap gap-2">
            <h1
              className="font-black tracking-tight cursor-pointer"
              onClick={() => router.push("/")}
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(24px, 5vw, 48px)",
                lineHeight: "1",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              LA
              <FontAwesomeIcon
                icon={faRocket}
                className="mx-1 animate-rocket"
                style={{ fontSize: "clamp(16px, 3vw, 30px)" }}
              />
              NCHPAD
            </h1>
            <span
              className="px-3 py-1 rounded border text-xs sm:text-sm"
              style={{
                color: "var(--text-secondary)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                fontFamily: "var(--font-display)",
              }}
            >
              DASHBOARD
            </span>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8">
          <h2
            className="font-bold mb-4"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(20px, 4vw, 32px)",
              fontFamily: "var(--font-display)",
            }}
          >
            Welcome, {user?.username}!
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            This is your dashboard. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
