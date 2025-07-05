const Footer = () => {
  return (
    <footer className="w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-t border-indigo-200 dark:border-indigo-700 shadow-inner mt-12 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-indigo-700 dark:text-indigo-300 text-sm select-none">
        <p className="mb-3 sm:mb-0">
          © {new Date().getFullYear()} BookStore. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="/privacy"
            className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Terms of Service
          </a>
          <a
            href="mailto:support@rlibrary.com"
            className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
