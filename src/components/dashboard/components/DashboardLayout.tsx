import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps): JSX.Element => {
  const breadcrumbItems = useBreadcrumb();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
