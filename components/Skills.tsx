"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function Skills() {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section
      id="skills"
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
            기술 스택 및 도구
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            아래의 기술을 사용할 수 있습니다.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skills.map((skillCategory, index) => {
            const isToolsAndLanguage = skillCategory.category === "기타 도구 & 언어";
            const toolsItems = isToolsAndLanguage 
              ? skillCategory.items.filter(item => item.name !== "중국어")
              : [];
            const languageItems = isToolsAndLanguage
              ? skillCategory.items.filter(item => item.name === "중국어")
              : [];

            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {skillCategory.category}
                </h3>
                {isToolsAndLanguage ? (
                  <div className="space-y-8">
                    {toolsItems.length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-3">
                          {toolsItems.map((item) => (
                            <span
                              key={item.name}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                            >
                                {item.name}
                              </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {languageItems.length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-3">
                          {languageItems.map((item) => (
                            <span
                              key={item.name}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                            >
                                {item.name}
                              </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((item) => (
                      <span
                        key={item.name}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                      >
                          {item.name}
                        </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

