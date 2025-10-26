import { motion, AnimatePresence } from "motion/react";
import { X, Home, BookOpen, Settings, Crown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  isPremium: boolean;
}

export function MenuDrawer({
  isOpen,
  onClose,
  onNavigate,
  isPremium,
}: MenuDrawerProps) {
  const menuItems = [
    { icon: Home, label: "Home", screen: "prompter" },
    { icon: BookOpen, label: "Cookbook", screen: "cookbook", premium: true },
    { icon: Sparkles, label: "Remix Mode", screen: "remix", premium: true },
    { icon: Settings, label: "Settings", screen: "settings" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div>
                  <h3 className="text-gray-900">Chef AI</h3>
                  {isPremium && (
                    <Badge className="bg-green-500 text-white mt-2">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-900"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-4 space-y-2">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.screen}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Button
                      onClick={() => {
                        onNavigate(item.screen);
                        onClose();
                      }}
                      variant="ghost"
                      className={`w-full justify-start text-gray-900 hover:bg-gray-100 ${
                        item.premium && !isPremium ? "opacity-60" : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.premium && !isPremium && (
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600"
                        >
                          Premium
                        </Badge>
                      )}
                    </Button>
                  </motion.div>
                ))}

                <Separator className="my-4 bg-gray-200" />

                {!isPremium && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl"
                  >
                    <Crown className="h-8 w-8 text-white mb-3" />
                    <h4 className="text-white mb-2">Go Premium</h4>
                    <p className="text-white/80 mb-4">
                      Unlock all features including voice reading, remix mode,
                      and more
                    </p>
                    <Button
                      onClick={() => {
                        onNavigate("settings");
                        onClose();
                      }}
                      className="w-full bg-white text-green-600 hover:bg-gray-100"
                    >
                      Upgrade Now
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100">
                <p className="text-gray-400">Version 1.0.0</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
