export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <h2>App Area</h2>
            {children}
        </section>
    );
}
