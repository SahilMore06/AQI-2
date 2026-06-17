function FooterNothing() {
  return (
    <footer className="bg-white border-t border-black/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-black tracking-tight">
                Nothing.
              </h3>
              <p className="text-sm text-black/60 mt-2">
                Phone (3)
              </p>
            </div>
            <p className="text-sm text-black/50 leading-relaxed">
              Engineered to be seen through.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-mono text-black/60 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {['Overview', 'Tech Specs', 'Features', 'Buy'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-black/80 hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-mono text-black/60 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {['Documentation', 'Contact Us', 'Warranty', 'Returns'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-black/80 hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-mono text-black/60 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Community', 'Press', 'Careers'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-black/80 hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-xs text-black/40">
              © {new Date().getFullYear()} Nothing Technology Limited. All rights reserved.
            </div>

            {/* Credits */}
            <div className="text-xs text-black/40">
              Design inspired by{' '}
              <a
                href="https://github.com/codelikeanss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black transition-colors underline"
              >
                codelikeanss
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
                <span key={item} className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-xs text-black/40 hover:text-black/60 transition-colors"
                  >
                    {item}
                  </a>
                  {index < 2 && <span className="text-black/20">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterNothing
