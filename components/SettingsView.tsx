import { motion } from "motion/react";
import { X, Lock, Crown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface SettingsViewProps {
  onClose: () => void;
  isPremium: boolean;
  onUpgrade: () => void;
}

export function SettingsView({
  onClose,
  isPremium,
  onUpgrade,
}: SettingsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 p-6 flex justify-between items-center z-20">
        <h2 className="text-gray-900">Settings</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-900"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Premium Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl ${
            isPremium
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isPremium ? (
                  <Crown className="h-6 w-6 text-white" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
                <h3 className={isPremium ? "text-white" : "text-gray-900"}>
                  {isPremium ? "Premium Member" : "Free Plan"}
                </h3>
              </div>
              <p className={isPremium ? "text-white/80" : "text-gray-500"}>
                {isPremium
                  ? "You have access to all premium features"
                  : "Upgrade to unlock all features"}
              </p>
            </div>
            {!isPremium && (
              <Button
                onClick={onUpgrade}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Upgrade
              </Button>
            )}
          </div>
        </motion.div>

        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h4 className="text-gray-900">General</h4>
          <div className="space-y-4 bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice" className="text-gray-700">
                Voice Input
              </Label>
              <Switch id="voice" defaultChecked />
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-gray-700">
                Notifications
              </Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-gray-700">
                Dark Mode
              </Label>
              <Switch id="dark-mode" />
            </div>
          </div>
        </motion.div>

        {/* Premium Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <h4 className="text-gray-900">Premium Features</h4>
            {isPremium && (
              <Badge className="bg-green-500 text-white">Active</Badge>
            )}
          </div>

          <div className="space-y-3">
            {/* Voice Recipe Reading */}
            <div
              className={`p-4 rounded-xl border ${
                isPremium
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              } flex items-center justify-between`}
            >
              <div>
                <p
                  className={isPremium ? "text-green-900" : "text-gray-900"}
                >
                  Voice Recipe Reading
                </p>
                <p className={isPremium ? "text-green-700" : "text-gray-500"}>
                  Hands-free cooking instructions
                </p>
              </div>
              {!isPremium && <Lock className="h-5 w-5 text-gray-400" />}
            </div>

            {/* Remix Mode */}
            <div
              className={`p-4 rounded-xl border ${
                isPremium
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              } flex items-center justify-between`}
            >
              <div>
                <p
                  className={isPremium ? "text-green-900" : "text-gray-900"}
                >
                  Remix Mode
                </p>
                <p className={isPremium ? "text-green-700" : "text-gray-500"}>
                  AI creates unique recipe variations
                </p>
              </div>
              {!isPremium && <Lock className="h-5 w-5 text-gray-400" />}
            </div>

            {/* Nutrition Info */}
            <div
              className={`p-4 rounded-xl border ${
                isPremium
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              } flex items-center justify-between`}
            >
              <div>
                <p
                  className={isPremium ? "text-green-900" : "text-gray-900"}
                >
                  Nutrition Information
                </p>
                <p className={isPremium ? "text-green-700" : "text-gray-500"}>
                  Detailed nutritional breakdown
                </p>
              </div>
              {!isPremium && <Lock className="h-5 w-5 text-gray-400" />}
            </div>

            {/* Ingredient Blacklist */}
            <div
              className={`p-4 rounded-xl border ${
                isPremium
                  ? "border-green-200 bg-green-50 cursor-pointer hover:bg-green-100"
                  : "border-gray-200 bg-gray-50"
              } flex items-center justify-between`}
            >
              <div>
                <p
                  className={isPremium ? "text-green-900" : "text-gray-900"}
                >
                  Ingredient Preferences
                </p>
                <p className={isPremium ? "text-green-700" : "text-gray-500"}>
                  Block ingredients you don't like
                </p>
              </div>
              {isPremium ? (
                <ChevronRight className="h-5 w-5 text-green-600" />
              ) : (
                <Lock className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {/* Cookbook */}
            <div
              className={`p-4 rounded-xl border ${
                isPremium
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              } flex items-center justify-between`}
            >
              <div>
                <p
                  className={isPremium ? "text-green-900" : "text-gray-900"}
                >
                  Personal Cookbook
                </p>
                <p className={isPremium ? "text-green-700" : "text-gray-500"}>
                  Save unlimited recipes
                </p>
              </div>
              {!isPremium && <Lock className="h-5 w-5 text-gray-400" />}
            </div>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h4 className="text-gray-900">Account</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-between border-gray-200 text-gray-900"
            >
              <span>Edit Profile</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between border-gray-200 text-gray-900"
            >
              <span>Privacy & Security</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between border-gray-200 text-gray-900"
            >
              <span>Help & Support</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full text-red-600">
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
