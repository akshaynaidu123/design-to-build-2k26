import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-8">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <span className="font-heading text-sm tracking-wider text-muted-foreground">
          Design to Build Challenges 2K26
        </span>
      </div>
      <p className="font-body text-xs text-muted-foreground">
        © 2026 Swarnandhra College of Engineering & Technology. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
