import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { LoginScreen } from "./components/LoginScreen";
import { PrompterScreen } from "./components/PrompterScreen";
import { RecipeSwiper } from "./components/RecipeSwiper";
import { RecipeReaderView } from "./components/RecipeReaderView";
import { CookbookView } from "./components/CookbookView";
import { SettingsView } from "./components/SettingsView";
import { LoadingScreen } from "./components/LoadingScreen";
import { MenuDrawer } from "./components/MenuDrawer";

type Screen =
  | "login"
  | "prompter"
  | "loading"
  | "recipes"
  | "reader"
  | "cookbook"
  | "settings";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  savedDate?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  // Mock recipe data
  const mockRecipes: Recipe[] = [
    {
      id: 1,
      name: "Creamy Chicken Pasta",
      image:
        "https://images.unsplash.com/photo-1564813227527-a99b83712e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGFzdGElMjBkaW5uZXIlMjBmb29kfGVufDF8fHx8MTc2MTQxNzI3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "30 min",
      difficulty: "Easy",
      ingredients: [
        "2 chicken breasts, diced",
        "8 oz pasta",
        "1 cup heavy cream",
        "1 cup shredded cheese",
        "2 cloves garlic, minced",
        "1 tbsp olive oil",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
      ],
      instructions: [
        "Cook pasta according to package directions. Drain and set aside.",
        "In a large skillet, heat olive oil over medium-high heat. Add diced chicken and cook until golden brown, about 5-7 minutes.",
        "Add minced garlic and cook for 1 minute until fragrant.",
        "Pour in heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.",
        "Add shredded cheese and stir until melted and smooth.",
        "Toss cooked pasta with the creamy chicken sauce. Season with salt and pepper.",
        "Garnish with fresh parsley and serve hot.",
      ],
    },
    {
      id: 2,
      name: "Avocado Toast Deluxe",
      image:
        "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzYxMzc0Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "10 min",
      difficulty: "Easy",
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "2 eggs",
        "Cherry tomatoes, halved",
        "Feta cheese, crumbled",
        "Red pepper flakes",
        "Lemon juice",
        "Salt and pepper",
      ],
      instructions: [
        "Toast the bread slices until golden and crispy.",
        "Mash the avocado with lemon juice, salt, and pepper.",
        "Fry or poach eggs to your preference.",
        "Spread mashed avocado on toasted bread.",
        "Top with eggs, cherry tomatoes, and feta cheese.",
        "Sprinkle with red pepper flakes and additional salt if desired.",
        "Serve immediately and enjoy!",
      ],
    },
    {
      id: 3,
      name: "Grilled Salmon with Herbs",
      image:
        "https://images.unsplash.com/photo-1704007573697-6a516da421ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwcGxhdGV8ZW58MXx8fHwxNzYxMzgwODYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "25 min",
      difficulty: "Medium",
      ingredients: [
        "2 salmon fillets",
        "2 tbsp olive oil",
        "Fresh dill, chopped",
        "Fresh parsley, chopped",
        "2 cloves garlic, minced",
        "Lemon slices",
        "Salt and pepper",
        "Asparagus for serving",
      ],
      instructions: [
        "Preheat grill or grill pan to medium-high heat.",
        "Mix olive oil, garlic, dill, and parsley in a small bowl.",
        "Season salmon fillets with salt and pepper.",
        "Brush herb mixture generously over salmon.",
        "Grill salmon skin-side down for 4-5 minutes.",
        "Flip carefully and grill for another 3-4 minutes until cooked through.",
        "Serve with grilled asparagus and lemon slices.",
      ],
    },
    {
      id: 4,
      name: "Asian Vegetable Stir Fry",
      image:
        "https://images.unsplash.com/photo-1464500650248-1a4b45debb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc2MTM3OTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "20 min",
      difficulty: "Easy",
      ingredients: [
        "Mixed vegetables (bell peppers, broccoli, carrots)",
        "2 tbsp soy sauce",
        "1 tbsp sesame oil",
        "2 cloves garlic, minced",
        "1 tsp ginger, grated",
        "2 tbsp vegetable oil",
        "Sesame seeds for garnish",
        "Cooked rice for serving",
      ],
      instructions: [
        "Heat vegetable oil in a large wok or skillet over high heat.",
        "Add garlic and ginger, stir-fry for 30 seconds.",
        "Add harder vegetables like carrots and broccoli first, stir-fry for 3 minutes.",
        "Add softer vegetables like bell peppers, continue stir-frying.",
        "Pour in soy sauce and sesame oil, toss everything together.",
        "Cook for 2-3 more minutes until vegetables are tender-crisp.",
        "Garnish with sesame seeds and serve over rice.",
      ],
    },
    {
      id: 5,
      name: "Gourmet Burger & Fries",
      image:
        "https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZnJpZXN8ZW58MXx8fHwxNzYxMzM2ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "35 min",
      difficulty: "Medium",
      ingredients: [
        "1 lb ground beef",
        "Burger buns",
        "Cheddar cheese slices",
        "Lettuce, tomato, onion",
        "Pickles",
        "Special sauce (mayo, ketchup, relish)",
        "4 potatoes for fries",
        "Salt and pepper",
      ],
      instructions: [
        "Cut potatoes into fries and soak in cold water for 15 minutes.",
        "Form ground beef into patties, season with salt and pepper.",
        "Heat grill or skillet to medium-high heat.",
        "Cook burger patties for 4-5 minutes per side.",
        "Add cheese in last minute to melt.",
        "Fry potato fries in oil until golden and crispy.",
        "Assemble burgers with sauce, lettuce, tomato, pickles, and serve with fries.",
      ],
    },
  ];

  const handleLogin = () => {
    setCurrentScreen("prompter");
  };

  const handleIngredientSubmit = (text: string) => {
    setCurrentScreen("loading");
    // Simulate API call
    setTimeout(() => {
      setCurrentScreen("recipes");
    }, 2500);
  };

  const handleSwipeLeft = (recipe: Recipe) => {
    console.log("Passed on:", recipe.name);
  };

  const handleSwipeRight = (recipe: Recipe) => {
    console.log("Liked:", recipe.name);
    setSelectedRecipe(recipe);
    setCurrentScreen("reader");
    // Save to cookbook if premium
    if (isPremium) {
      setSavedRecipes((prev) => [
        ...prev,
        { ...recipe, savedDate: "Today" },
      ]);
    }
  };

  const handleSwipeDown = (recipe: Recipe) => {
    console.log("View details:", recipe.name);
  };

  const handleMenuNavigate = (screen: string) => {
    if (screen === "prompter") {
      setCurrentScreen("prompter");
    } else if (screen === "cookbook") {
      setCurrentScreen("cookbook");
    } else if (screen === "settings") {
      setCurrentScreen("settings");
    } else if (screen === "remix") {
      // Could show a special remix mode
      setCurrentScreen("prompter");
    }
  };

  const handleUpgrade = () => {
    // In a real app, this would show payment flow
    setIsPremium(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigate}
        isPremium={isPremium}
      />

      <AnimatePresence mode="wait">
        {currentScreen === "login" && (
          <LoginScreen key="login" onLogin={handleLogin} />
        )}

        {currentScreen === "prompter" && (
          <PrompterScreen
            key="prompter"
            onMenuClick={() => setIsMenuOpen(true)}
            onSubmit={handleIngredientSubmit}
            isListening={isListening}
            onVoiceToggle={() => setIsListening(!isListening)}
          />
        )}

        {currentScreen === "loading" && (
          <LoadingScreen key="loading" message="Finding perfect recipes..." />
        )}

        {currentScreen === "recipes" && (
          <RecipeSwiper
            key="recipes"
            recipes={mockRecipes}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeDown={handleSwipeDown}
            onMenuClick={() => setIsMenuOpen(true)}
            onBack={() => setCurrentScreen("prompter")}
          />
        )}

        {currentScreen === "reader" && selectedRecipe && (
          <RecipeReaderView
            key="reader"
            recipe={selectedRecipe}
            onClose={() => setCurrentScreen("recipes")}
            onMenuClick={() => setIsMenuOpen(true)}
          />
        )}

        {currentScreen === "cookbook" && (
          <CookbookView
            key="cookbook"
            onClose={() => setCurrentScreen("prompter")}
            isPremium={isPremium}
            onUpgrade={handleUpgrade}
            recipes={isPremium ? savedRecipes : []}
            onRecipeClick={(recipe) => {
              setSelectedRecipe(recipe);
              setCurrentScreen("reader");
            }}
          />
        )}

        {currentScreen === "settings" && (
          <SettingsView
            key="settings"
            onClose={() => setCurrentScreen("prompter")}
            isPremium={isPremium}
            onUpgrade={handleUpgrade}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
