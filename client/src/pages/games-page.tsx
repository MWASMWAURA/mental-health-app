import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  PlayCircle as PlayingCards, 
  Type, 
  Puzzle, 
  Gamepad,
  Paintbrush,
  Music,
  Crown,
  Brain,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const categories = [
  {
    id: "card-games",
    title: "Card Games",
    icon: PlayingCards,
    description: "Improve memory and strategic thinking",
    games: [
      { name: "Memory Match", description: "Test and improve your memory" },
      { name: "Solitaire", description: "Classic single-player card game" },
      { name: "Pattern Matching", description: "Find and match patterns" },
    ]
  },
  {
    id: "word-games",
    title: "Word Games",
    icon: Type,
    description: "Enhance vocabulary and cognitive skills",
    games: [
      { name: "Word Search", description: "Find hidden words in a grid" },
      { name: "Anagrams", description: "Create words from jumbled letters" },
      { name: "Crossword Light", description: "Solve crossword puzzles" },
    ]
  },
  {
    id: "puzzle-games",
    title: "Puzzles",
    icon: Puzzle,
    description: "Challenge your problem-solving abilities",
    games: [
      { name: "Jigsaw", description: "Digital jigsaw puzzles" },
      { name: "Picture Recall", description: "Test your visual memory" },
      { name: "Pattern Completion", description: "Complete the pattern" },
    ]
  },
  {
    id: "board-games",
    title: "Board Games",
    icon: Crown,
    description: "Classic games for strategic thinking",
    games: [
      { name: "Chess Trainer", description: "Learn and play chess" },
      { name: "Checkers", description: "Classic game of checkers" },
      { name: "Four in Line", description: "Connect four pieces in a row" },
    ]
  },
  {
    id: "creative-activities",
    title: "Creative Corner",
    icon: Paintbrush,
    description: "Express yourself through art",
    games: [
      { name: "Origami Guide", description: "Learn paper folding art" },
      { name: "Digital Coloring", description: "Relaxing coloring activities" },
      { name: "Pattern Art", description: "Create geometric patterns" },
    ]
  },
  {
    id: "music-therapy",
    title: "Music & Rhythm",
    icon: Music,
    description: "Engage with music and sound",
    games: [
      { name: "Rhythm Tapper", description: "Follow the beat" },
      { name: "Music Memory", description: "Remember and repeat melodies" },
      { name: "Karaoke Light", description: "Sing along to your favorite tunes" },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function GamesPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => setLocation("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Therapeutic Games & Activities</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Engage in mentally stimulating activities designed to improve cognitive function,
            reduce stress, and promote mental wellness.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.games.map((game) => (
                      <div
                        key={game.name}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => {
                          alert(`${game.name} will be available soon!`);
                        }}
                      >
                        <h3 className="font-medium mb-1">{game.name}</h3>
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Brain className="h-5 w-5" />
              <p>Games are designed to be both engaging and therapeutic. Start with easier levels and progress at your own pace.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}