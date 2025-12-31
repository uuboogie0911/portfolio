"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import Link from "next/link";

export default function Projects() {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-900"
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
            주요 프로젝트
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title.includes('[') ? (
                    <>
                      <span className="block text-base">{project.title.match(/\[([^\]]+)\]/)?.[0]}</span>
                      <span className="block">{project.title.replace(/\[([^\]]+)\]\s*/, '')}</span>
                    </>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  자세히 보기
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
