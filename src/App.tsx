import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Project from "./pages/Project.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SmoothScroll>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
