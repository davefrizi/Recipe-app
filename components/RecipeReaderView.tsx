import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Menu,
  X,
} from "lucide-react";
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

interface RecipeReaderViewProps {
  recipe: Recipe;
  onClose: () => void;
  onMenuClick: () => void;
}

export function RecipeReaderView({
  recipe,
  onClose,
  onMenuClick,
}: RecipeReaderViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) =>
      Math.min(recipe.instructions.length - 1, prev + 1)
    );
  };

  const handleRepeat = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 2000);
  };

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
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-900"
        >
          <X className="h-5 w-5" />
        </Button>
        <h3 className="text-gray-900">Cooking Mode</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-gray-900"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Recipe Header */}
      <div className="relative h-48">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-white mb-2">{recipe.name}</h2>
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

      {/* Voice Control Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border-b border-green-100 p-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isListening ? "bg-green-500 animate-pulse" : "bg-gray-300"
            }`}
          />
          <p className="text-gray-700">
            {isListening
              ? 'Listening for "next step" or "repeat step"...'
              : "Voice control active"}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsListening(!isListening)}
            className={
              isListening
                ? "text-green-600 hover:text-green-700"
                : "text-gray-400"
            }
          >
            {isListening ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Current Step */}
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">
              Step {currentStep + 1} of {recipe.instructions.length}
            </span>
            <Badge
              variant="outline"
              className="border-green-500 text-green-600"
            >
              In Progress
            </Badge>
          </div>

          <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
            <motion.div
              className="bg-green-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((currentStep + 1) / recipe.instructions.length) * 100
                }%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-900 leading-relaxed">
              {recipe.instructions[currentStep]}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="border-gray-200 text-gray-900 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleRepeat}
              variant="outline"
              className={`border-gray-200 ${
                isReading ? "text-green-600 border-green-500" : "text-gray-900"
              }`}
            >
              <RotateCcw
                className={`h-4 w-4 mr-2 ${isReading ? "animate-spin" : ""}`}
              />
              Repeat
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === recipe.instructions.length - 1}
              className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-30 disabled:bg-gray-300"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* All Ingredients Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 space-y-4"
        >
          <h4 className="text-gray-900">All Ingredients</h4>
          <div className="grid grid-cols-2 gap-2">
            {recipe.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-700">{ing}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Voice Commands Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-green-50 rounded-xl"
        >
          <p className="text-green-900 mb-2">Voice Commands (Premium):</p>
          <div className="space-y-1 text-green-700">
            <p>• "Next step" - Move to next instruction</p>
            <p>• "Previous step" - Go back one step</p>
            <p>• "Repeat step" - Read current step again</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
