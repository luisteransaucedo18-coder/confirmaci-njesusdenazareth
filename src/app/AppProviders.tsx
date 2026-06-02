import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60_000,
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
