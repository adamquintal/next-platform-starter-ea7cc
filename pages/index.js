import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plug, BarChart2, Mail, CheckCircle } from 'lucide-react';

// Variants for scroll animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-screen"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            BoardReady
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Your donor insights on autopilot!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Plug className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Data</h3>
              <p className="text-gray-600">
                Securely connect your Bloomerang account using industry‑standard OAuth. We
                never see or store your credentials.
              </p>
            </motion.div>
            {/* Step 2 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BarChart2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See Insights Instantly</h3>
              <p className="text-gray-600">
                Your personalized dashboard shows key donor metrics, trends and
                lapsed donors at a glance.
              </p>
            </motion.div>
            {/* Step 3 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Weekly Reports</h3>
              <p className="text-gray-600">
                Receive beautiful board‑ready reports delivered to your inbox each
                week—no more spreadsheets required.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Board-Ready Reports
            </h2>
            <p className="text-gray-700 mb-4">
              Wow your leadership team with professional reports that summarize
              donor growth, recent donations and lapsed supporters. Our templates
              are designed to impress and can be sent on demand or on a
              scheduled basis.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Snapshot of donor growth and retention
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Break down of recent donations
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                Identify lapsed donors automatically
              </li>
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/board_report_preview.png"
              alt="Board report preview"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Simple Pricing
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-4">Free</h3>
              <p className="text-gray-700 mb-6">Get started with basic donor analytics.</p>
              <div className="text-4xl font-bold mb-6">$0</div>
              <ul className="text-left mb-6 space-y-2 flex-1">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Connect your Bloomerang account
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Dashboard with basic metrics
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Manual report generation
                </li>
              </ul>
              <Link
                href="/signup"
                className="mt-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Get Started
              </Link>
            </motion.div>
            {/* Paid Tier */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="border border-primary rounded-lg p-8 bg-white shadow-md flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <p className="text-gray-700 mb-6">Unlock the full power of BoardReady.</p>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg font-medium">/mo</span></div>
              <ul className="text-left mb-6 space-y-2 flex-1">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  All Free tier features
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Automated weekly report emails
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Advanced donor segmentation & charts
                </li>
              </ul>
              <Link
                href="/signup?plan=pro"
                className="mt-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Try Pro
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 text-center border-t border-gray-100">
        <p className="text-gray-500">
          © {new Date().getFullYear()} BoardReady. All rights reserved.
        </p>
      </footer>
    </div>
  );
}