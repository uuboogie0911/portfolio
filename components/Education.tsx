"use client";

import { motion } from "framer-motion";
import { educations } from "@/data/portfolio";

export default function Education() {
  if (!educations || educations.length === 0) {
    return null;
  }

  return (
    <section
      id="education"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            교육 및 어학
          </h2>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.school}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {edu.major} {edu.status && `• ${edu.status}`} {edu.degree && `• ${edu.degree}`}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {edu.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

