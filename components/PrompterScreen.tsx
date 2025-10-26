import { motion } from "motion/react";
import { Menu, Mic, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PrompterScreenProps {
  onMenuClick: () => void;
  onSubmit: (text: string) => void;
  isListening?: boolean;
  onVoiceToggle: () => void;
}

export function PrompterScreen({
  onMenuClick,
  onSubmit,
  isListening = false,
  onVoiceToggle,
}: PrompterScreenProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white relative"
    >
      {/* Burger Menu */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-6 left-6 z-10"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-gray-900 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ scale: 0 }}
              animate={{
                scale: [0.8, 1, 0.8],
                x: [
                  0,
                  i === 0 ? -20 : i === 1 ? 0 : 20,
                  0,
                ],
                y: [
                  0,
                  i === 0 ? -10 : i === 1 ? 10 : -10,
                  0,
                ],
              }}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${i * 35}px`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <div
                className={`w-12 h-12 rounded-full ${
                  isListening ? "bg-green-500" : "bg-gray-900"
                }`}
                style={{
                  boxShadow: isListening
                    ? "0 0 30px rgba(34, 197, 94, 0.5)"
                    : "0 0 20px rgba(0, 0, 0, 0.1)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Listening State Text */}
        {isListening && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 mt-24 text-gray-600"
          >
            Listening...
          </motion.p>
        )}

        {!isListening && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 mt-24 text-gray-400"
          >
            Tap mic or type what you have
          </motion.p>
        )}
      </div>

      {/* Chat Input at Bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent"
      >
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <Button
            size="icon"
            onClick={onVoiceToggle}
            className={`h-12 w-12 rounded-full ${
              isListening
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            <Mic className="h-5 w-5" />
          </Button>

          <div className="flex-1 flex gap-2">
            <Input
              placeholder="I have chicken, pasta, and cheese..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="flex-1 border-gray-200 focus:border-green-500 focus:ring-green-500 bg-gray-50"
            />
            <Button
              onClick={handleSubmit}
              size="icon"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
