import Sidebar from "./_ui/Sidebar";

export default function AdminLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}