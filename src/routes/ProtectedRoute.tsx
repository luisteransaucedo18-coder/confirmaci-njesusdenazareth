import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import type { AppRole } from "@/types/app";

export function ProtectedRoute({ roles }: { roles?: AppRole[] }) {
  const { loading, session, role } = useAuth();

  if (loading) return <main className="p-6"><Skeleton /></main>;
  if (!session) return <Navigate to="/login" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/app" replace />;

  return <Outlet />;
}
