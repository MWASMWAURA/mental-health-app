
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(4); // Seconds per breath phase
  const [phase, setPhase] = useState("ready"); // ready, inhale, hold, exhale
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      if (phase === "ready") {
        setPhase("inhale");
        setTimeLeft(duration);
      } else if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        // Move to next phase
        if (phase === "inhale") {
          setPhase("hold");
          setTimeLeft(duration);
        } else if (phase === "hold") {
          setPhase("exhale");
          setTimeLeft(duration);
        } else if (phase === "exhale") {
          setPhase("inhale");
          setTimeLeft(duration);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, timeLeft, duration]);

  const handleStart = () => {
    setIsActive(true);
    setPhase("ready");
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase("ready");
  };

  const getCircleSize = () => {
    if (phase === "inhale") {
      return 100 - ((timeLeft / duration) * 50);
    } else if (phase === "exhale") {
      return 50 + ((timeLeft / duration) * 50);
    }
    return 100;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Breathing Exercise</CardTitle>
        <CardDescription>
          Follow the animation to regulate your breathing and reduce stress
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative h-60 w-60 flex items-center justify-center">
          <motion.div
            animate={{
              scale: isActive ? getCircleSize() / 100 : 0.5,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            className="bg-primary/20 rounded-full w-full h-full flex items-center justify-center"
          >
            <div className="text-2xl font-semibold text-primary">
              {!isActive ? "Ready" : phase.charAt(0).toUpperCase() + phase.slice(1)}
            </div>
          </motion.div>
        </div>
        
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <span>Breath Duration</span>
            <span>{duration} seconds</span>
          </div>
          <Slider
            defaultValue={[4]}
            min={2}
            max={8}
            step={1}
            onValueChange={(vals) => setDuration(vals[0])}
            disabled={isActive}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {!isActive ? (
          <Button onClick={handleStart}>Start Exercise</Button>
        ) : (
          <Button variant="outline" onClick={handleStop}>Stop Exercise</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BreathingExercise;
