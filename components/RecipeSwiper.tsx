import { motion, useMotionValue, useTransform } from "motion/react";
import { ChevronDown, X, Heart, Menu, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeSwiperProps {
  recipes: Recipe[];
  onSwipeLeft: (recipe: Recipe) => void;
  onSwipeRight: (recipe: Recipe) => void;
  onSwipeDown: (recipe: Recipe) => void;
  onMenuClick: () => void;
  onBack: () => void;
}

export function RecipeSwiper({
  recipes,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  onMenuClick,
  onBack,
}: RecipeSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateRaw = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const currentRecipe = recipes[currentIndex];

  if (!currentRecipe) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <h2 className="text-gray-900">All done!</h2>
          <p className="text-gray-500">You've reviewed all recipes</p>
          <Button onClick={onBack} className="bg-gray-900 hover:bg-gray-800">
            Start Over
          </Button>
        </div>
      </motion.div>
    );
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 150) {
      onSwipeRight(currentRecipe);
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x < -150) {
      onSwipeLeft(currentRecipe);
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.y > 100) {
      setShowDetails(true);
    }
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white relative overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <p className="text-gray-400">
          {currentIndex + 1} / {recipes.length}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-gray-900 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Recipe Card */}
      <div className="flex items-center justify-center min-h-screen p-6 pt-24">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, y, rotateZ: rotateRaw, opacity }}
          className="w-full max-w-md"
        >
          <motion.div
            layoutId={`recipe-${currentRecipe.id}`}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Image - 50% of screen */}
            <div className="relative h-[50vh]">
              <ImageWithFallback
                src={currentRecipe.image}
                alt={currentRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-white mb-2">{currentRecipe.name}</h2>
                <div className="flex gap-2">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                    {currentRecipe.cookTime}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                    {currentRecipe.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-500 mb-2">Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {currentRecipe.ingredients.slice(0, 5).map((ing, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-gray-200 text-gray-700"
                    >
                      {ing}
                    </Badge>
                  ))}
                  {currentRecipe.ingredients.length > 5 && (
                    <Badge
                      variant="outline"
                      className="border-gray-200 text-gray-400"
                    >
                      +{currentRecipe.ingredients.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400">
                <ChevronDown className="h-4 w-4 animate-bounce" />
                <span>Swipe down for full recipe</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Action Hints */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <X className="h-6 w-6 text-gray-900" />
          </div>
          <span className="text-gray-400">Nope</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-gray-900">Yes!</span>
        </div>
      </motion.div>

      {/* Detailed View - Slides up */}
      {showDetails && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute inset-0 bg-white z-30 overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 p-6 flex justify-between items-center">
            <h3 className="text-gray-900">{currentRecipe.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDetails(false)}
              className="text-gray-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h4 className="text-gray-900 mb-4">Ingredients</h4>
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 mb-4">Instructions</h4>
              <ol className="space-y-4">
                {currentRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setShowDetails(false);
                  onSwipeLeft(currentRecipe);
                  setCurrentIndex((prev) => prev + 1);
                }}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-900"
              >
                Skip
              </Button>
              <Button
                onClick={() => {
                  setShowDetails(false);
                  onSwipeRight(currentRecipe);
                  setCurrentIndex((prev) => prev + 1);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                Choose This Recipe
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
