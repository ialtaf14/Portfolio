import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, isInView }) => {
    return (
        <div className="text-center mb-16">
            <motion.h2
                className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-ios"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {title}
            </motion.h2>
            <motion.div
                className="w-20 h-1 bg-accent mx-auto"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            />
            {subtitle && (
                <motion.p
                    className="text-foreground/70 mt-6 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeading;
