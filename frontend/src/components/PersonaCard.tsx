import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PersonaCardProps {
  role: string;
  emoji: string;
  title: string;
  pain: string;
  win: string;
}

const getTagStyles = (role: string): { bg: string; text: string; darkBg: string; darkText: string } => {
  switch (role) {
    case 'Side-Hustle Designer':
      return {
        bg: 'from-purple-100 to-indigo-100',
        text: 'text-purple-700',
        darkBg: 'dark:from-purple-900/40 dark:to-indigo-900/40',
        darkText: 'dark:text-purple-400'
      };
    case 'Small-Shop Owner':
      return {
        bg: 'from-blue-100 to-cyan-100',
        text: 'text-blue-700',
        darkBg: 'dark:from-blue-900/40 dark:to-cyan-900/40',
        darkText: 'dark:text-blue-400'
      };
    case 'Freelance Marketer':
      return {
        bg: 'from-emerald-100 to-teal-100',
        text: 'text-emerald-700',
        darkBg: 'dark:from-emerald-900/40 dark:to-teal-900/40',
        darkText: 'dark:text-emerald-400'
      };
    case 'Gym Owner':
      return {
        bg: 'from-orange-100 to-amber-100',
        text: 'text-orange-700',
        darkBg: 'dark:from-orange-900/40 dark:to-amber-900/40',
        darkText: 'dark:text-orange-400'
      };
    default: // Solo Creator
      return {
        bg: 'from-pink-100 to-rose-100',
        text: 'text-pink-700',
        darkBg: 'dark:from-pink-900/40 dark:to-rose-900/40',
        darkText: 'dark:text-pink-400'
      };
  }
};

export const PersonaCard = ({ role, emoji, title, pain, win }: PersonaCardProps) => {
  const tagStyles = getTagStyles(role);
  
  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden group h-[340px] flex flex-col min-w-[280px] backdrop-blur-sm border border-gray-100/20 dark:border-gray-700/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: {
          duration: 0.4,
          ease: [0.21, 1.11, 0.81, 0.99], // spring-like easing
        }
      }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
      style={{
        background: 'linear-gradient(145deg, var(--card-bg-start) 0%, var(--card-bg-end) 100%)',
        '--card-bg-start': 'var(--tw-bg-opacity)',
        '--card-bg-end': 'var(--tw-bg-opacity)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      } as React.CSSProperties}
    >
      {/* Add subtle parallax effect to the content */}
      <motion.div
        className="relative z-10 h-full"
        whileHover={{
          rotateX: 2,
          rotateY: 2,
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        }}
      >
        {/* Header */}
        <div className="relative mb-2">
          <div className="flex items-start justify-between">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-3xl shadow-sm"
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -10, 10, 0],
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }}
            >
              {emoji}
            </motion.div>
            <motion.div
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tagStyles.bg} ${tagStyles.text} ${tagStyles.darkBg} ${tagStyles.darkText} shadow-sm`}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
            >
              {role.split(' ')[0]}
            </motion.div>
          </div>
          
          <motion.h3 
            className="font-semibold text-gray-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-lg"
            whileHover={{ 
              x: 5,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
          >
            {title}
          </motion.h3>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2.5 relative">
          <motion.div 
            className="text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-red-500 dark:text-red-400 font-bold block mb-0.5">
              Pain
            </span>
            <p className="text-gray-600 dark:text-gray-300 leading-snug">{pain}</p>
          </motion.div>
          
          <motion.div 
            className="text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">
              Win
            </span>
            <p className="text-gray-600 dark:text-gray-300 leading-snug">{win}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced bottom decoration with glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0 dark:from-purple-400/0 dark:via-purple-400/30 dark:to-purple-400/0"
        initial={{ scaleX: 0 }}
        whileHover={{ 
          scaleX: 1,
          filter: "brightness(1.2) blur(1px)",
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        }}
      />

      {/* Add subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-indigo-500/0 to-blue-500/0 opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{
          boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 20px rgba(99,102,241,0.2)", "0 0 0px rgba(99,102,241,0)"],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
  );
}; 