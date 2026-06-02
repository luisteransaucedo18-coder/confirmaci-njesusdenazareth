import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { AsistenciasPage } from "@/features/asistencias/pages/AsistenciasPage";
import { CatequistasPage } from "@/features/catequistas/pages/CatequistasPage";
import { ConfirmantesPage } from "@/features/confirmantes/pages/ConfirmantesPage";
import { ConfiguracionPage } from "@/features/configuracion/pages/ConfiguracionPage";
import { EventosPage } from "@/features/eventos/pages/EventosPage";
import { GruposPage } from "@/features/grupos/pages/GruposPage";
import { InventarioPage } from "@/features/inventario/pages/InventarioPage";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { ReportesPage } from "@/features/reportes/pages/ReportesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="confirmantes" element={<ConfirmantesPage />} />
          <Route path="asistencias" element={<AsistenciasPage />} />
          <Route path="inventario" element={<InventarioPage />} />
          <Route path="catequistas" element={<CatequistasPage />} />
          <Route path="grupos" element={<GruposPage />} />
          <Route path="eventos" element={<EventosPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          <Route path="configuracion" element={<ConfiguracionPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
