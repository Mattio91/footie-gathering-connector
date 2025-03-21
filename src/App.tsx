
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Event from "./pages/Event";
import Events from "./pages/Events";
import Fields from "./pages/Fields"; 
import Field from "./pages/Field";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import Players from "./pages/Players";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/fields/:id" element={<Field />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/players" element={<Players />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
