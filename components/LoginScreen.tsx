import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-gray-900">Chef AI</h1>
          <p className="text-gray-500">Discover recipes with what you have</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <Button
            onClick={onLogin}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-400">or</span>
            </div>
          </div>

          <Button
            onClick={onLogin}
            variant="outline"
            className="w-full border-gray-200 text-gray-900 hover:bg-gray-50"
          >
            Create Account
          </Button>

          <p className="text-center text-gray-400 pt-4">
            Premium features available after signup
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
