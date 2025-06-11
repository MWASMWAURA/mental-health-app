import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain } from "lucide-react";
import { useLocation } from "wouter";

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const emojis = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎪", "🎯"];

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Initialize game
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isMatched) return;
    if (flippedCards.includes(cardId)) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      // Check for match
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCard].isMatched = true;
          matchedCards[secondCard].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCard].isFlipped = false;
          resetCards[secondCard].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => setLocation("/games")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Memory Match
          </h1>
          <p className="text-muted-foreground">
            Match pairs of cards to test and improve your memory.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              onClick={() => !card.isFlipped && handleCardClick(card.id)}
            >
              <Card className={`h-24 cursor-pointer ${card.isMatched ? 'opacity-50' : ''}`}>
                <CardContent className="p-6 flex items-center justify-center text-4xl">
                  {card.isFlipped || card.isMatched ? card.emoji : "❓"}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {matches === emojis.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Congratulations! 🎉
            </h2>
            <Button onClick={() => window.location.reload()}>
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
