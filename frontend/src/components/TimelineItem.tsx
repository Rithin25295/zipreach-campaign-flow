import { motion } from 'framer-motion';
import { MessageSquare, Bot, User } from 'lucide-react';

interface TimelineItemProps {
  type: 'user' | 'ai';
  message: string;
  emoji?: string;
}

export const TimelineItem = ({ type, message, emoji }: TimelineItemProps) => {
  const isUser = type === 'user';
  
  return (
    <motion.div 
      className="flex gap-4 items-start relative"
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
    >
      {/* Avatar */}
      <motion.div
        className={`relative flex-shrink-0 w-8 h-8 rounded-lg shadow-sm flex items-center justify-center z-10
          ${isUser ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: [
              `0 0 0 0 ${isUser ? 'rgba(99, 102, 241, 0)' : 'rgba(16, 185, 129, 0)'}`,
              `0 0 0 4px ${isUser ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
              `0 0 0 0 ${isUser ? 'rgba(99, 102, 241, 0)' : 'rgba(16, 185, 129, 0)'}`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Message bubble */}
      <motion.div 
        className={`flex-1 relative group ${
          isUser ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50' 
                : 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50'
        } rounded-xl p-4 shadow-sm`}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
          isUser ? 'from-indigo-500 to-purple-500' : 'from-emerald-500 to-teal-500'
        }`} />

        {/* Message content */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className={`w-4 h-4 ${
              isUser ? 'text-indigo-500 dark:text-indigo-400' : 'text-emerald-500 dark:text-emerald-400'
            }`} />
            <span className={`text-sm font-medium ${
              isUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {isUser ? 'You' : 'ZipReach AI'}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            {message}
            {emoji && (
              <motion.span
                className="inline-block ml-2"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                {emoji}
              </motion.span>
            )}
          </p>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
            isUser 
              ? 'from-indigo-500/0 via-indigo-500/20 to-indigo-500/0' 
              : 'from-emerald-500/0 via-emerald-500/20 to-emerald-500/0'
          }`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}; 