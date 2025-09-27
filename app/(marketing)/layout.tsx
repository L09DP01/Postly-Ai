import Navbar from &quot;@/components/Navbar&quot;;
import Footer from &quot;@/components/Footer&quot;;

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=&quot;min-h-screen flex flex-col&quot;>
      <Navbar />
      <main className=&quot;flex-1&quot;>
        {children}
      </main>
      <Footer />
    </div>
  );
}

