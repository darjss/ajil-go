function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xs">J</span>
              </div>
              <span>JobHuntly</span>
            </div>
            <p className="text-sm text-gray-400">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">About</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Advice
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Get job notifications</h3>
            <p className="text-xs text-gray-400">The latest job news, articles, sent to your inbox weekly.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="px-3 py-2 bg-slate-800 text-white placeholder-gray-500 rounded text-sm flex-1"
              />
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>2021 © JobHuntly. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;