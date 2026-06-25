import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="section-label mb-6">/ Let's build</div>
            <h3 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] max-w-[14ch]">
              Have a project in mind?
            </h3>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 text-lg md:text-xl link-underline"
            >
              hello@step7labs.com <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div>
              <div className="section-label mb-4">Studio</div>
              <ul className="space-y-3 text-foreground/80">
                <li><Link to="/about" className="hover:text-foreground">About</Link></li>
                <li><Link to="/work" className="hover:text-foreground">Work</Link></li>
                <li><Link to="/insights" className="hover:text-foreground">Insights</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="section-label mb-4">Services</div>
              <ul className="space-y-3 text-foreground/80">
                <li><Link to="/services" className="hover:text-foreground">Web Design</Link></li>
                <li><Link to="/services" className="hover:text-foreground">Development</Link></li>
                <li><Link to="/services" className="hover:text-foreground">AI Integration</Link></li>
                <li><Link to="/services" className="hover:text-foreground">Automation</Link></li>
              </ul>
            </div>
            <div>
              <div className="section-label mb-4">Connect</div>
              <ul className="space-y-3 text-foreground/80">
                <li><a href="#" className="hover:text-foreground">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground">Dribbble</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t hairline flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono-tech text-muted-foreground">
          <div>© 2026 Step7Labs — Digital Product Studio</div>
          <div>Crafted with intention. Built to perform.</div>
        </div>
      </div>
    </footer>
  );
}
