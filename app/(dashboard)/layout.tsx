import Navbar from "./_components/navbar"
import OrgSidebar from "./_components/org-sidebar"
import Sidebar from "./_components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="h-full">
      <Sidebar />
      <section className="pl-[60px] h-full">
        <section className="flex gap-x-3 h-full">
          <OrgSidebar />
          <section className="h-full flex-1">
            <Navbar />
            { children }
          </section>
        </section>
      </section>
    </main>
  )
}