"use client";

import { motion } from "framer-motion";
import { StrengthCard } from "@/ui/core_strengths/StrengthCard";
import { strengths } from "@/ui/core_strengths/strengths";

export default function About() {
  return (
    <section
      id="about"
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
            핵심 역량
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            공통 도메인을 기반으로 서비스 전반을 구조화하고, 데이터와 운영 기준 중심으로 문제를 해결하는 PM입니다. 제한적인 상황에서 일이 진행될 수 있는 방향으로 고민합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {strengths.map((strength, index) => (
            <StrengthCard
              key={strength.id}
              title={strength.title}
              description={strength.description}
              index={index}
            />
          ))}
            </div>
      </div>
    </section>
  );
}

