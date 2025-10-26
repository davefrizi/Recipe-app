import { motion } from "motion/react";
import { X, Lock, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  difficulty: string;
  savedDate: string;
}

interface CookbookViewProps {
  onClose: () => void;
  isPremium: boolean;
  onUpgrade: () => void;
  recipes?: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}

export function CookbookView({
  onClose,
  isPremium,
  onUpgrade,
  recipes = [],
  onRecipeClick,
}: CookbookViewProps) {
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
        <h2 className="text-gray-900">My Cookbook</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-900"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {!isPremium ? (
        /* Premium Upsell */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-[80vh] p-6"
        >
          <div className="max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Lock className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-gray-900">Premium Feature</h3>
              <p className="text-gray-500">
                Save and organize your favorite recipes in your personal
                cookbook. Access them anytime, anywhere.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={onUpgrade}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Upgrade to Premium
              </Button>
              <p className="text-gray-400">$4.99/month or $49.99/year</p>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Premium Cookbook View */
        <div className="p-6 max-w-4xl mx-auto">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex gap-3"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search recipes..."
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-200 text-gray-900"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </motion.div>

          {recipes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 space-y-4"
            >
              <p className="text-gray-400">No recipes saved yet</p>
              <p className="text-gray-500">
                Start swiping and save your favorites!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {recipes.map((recipe, idx) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onRecipeClick?.(recipe)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-500 transition-colors cursor-pointer group"
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white mb-1">{recipe.name}</h4>
                      <div className="flex gap-2">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                          {recipe.cookTime}
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                          {recipe.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-400">Saved {recipe.savedDate}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
