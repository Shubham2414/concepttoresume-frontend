export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <h2>Authentication</h2>
            {children}
        </section>
    );
}
