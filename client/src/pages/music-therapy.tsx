import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Play, Pause, Volume2, Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLocation } from "wouter";

// Mock audio URLs - in production these would be real audio files
const AUDIO_BASE_URL = "https://example.com/audio/";

const musicCategories = [
  {
    id: "meditation",
    title: "Meditation & Mindfulness",
    description: "Ambient sounds and gentle melodies for deep relaxation",
    tracks: [
      { title: "Ocean Waves", duration: "10:00", type: "nature", url: `${AUDIO_BASE_URL}ocean-waves.mp3` },
      { title: "Forest Rain", duration: "8:00", type: "nature", url: `${AUDIO_BASE_URL}forest-rain.mp3` },
      { title: "Zen Garden", duration: "15:00", type: "ambient", url: `${AUDIO_BASE_URL}zen-garden.mp3` }
    ]
  },
  {
    id: "calming",
    title: "Stress Relief",
    description: "Soothing melodies to reduce anxiety and stress",
    tracks: [
      { title: "Peaceful Piano", duration: "12:00", type: "instrumental", url: `${AUDIO_BASE_URL}peaceful-piano.mp3` },
      { title: "Gentle Strings", duration: "9:00", type: "instrumental", url: `${AUDIO_BASE_URL}gentle-strings.mp3` },
      { title: "Soft Wind", duration: "11:00", type: "nature", url: `${AUDIO_BASE_URL}soft-wind.mp3` }
    ]
  },
  {
    id: "focus",
    title: "Focus & Concentration",
    description: "Background music to enhance concentration",
    tracks: [
      { title: "Study Beats", duration: "20:00", type: "electronic", url: `${AUDIO_BASE_URL}study-beats.mp3` },
      { title: "Alpha Waves", duration: "30:00", type: "binaural", url: `${AUDIO_BASE_URL}alpha-waves.mp3` },
      { title: "Deep Focus", duration: "25:00", type: "ambient", url: `${AUDIO_BASE_URL}deep-focus.mp3` }
    ]
  },
  {
    id: "sleep",
    title: "Sleep Sounds",
    description: "Relaxing sounds for better sleep",
    tracks: [
      { title: "Night Rain", duration: "45:00", type: "nature", url: `${AUDIO_BASE_URL}night-rain.mp3` },
      { title: "Dream Space", duration: "60:00", type: "ambient", url: `${AUDIO_BASE_URL}dream-space.mp3` },
      { title: "Starlight", duration: "40:00", type: "ambient", url: `${AUDIO_BASE_URL}starlight.mp3` }
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
  visible: { opacity: 1, y: 0 }
};

export default function MusicTherapyPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [, setLocation] = useLocation();

  // Create or update audio element when track changes
  useEffect(() => {
    if (currentTrack) {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = currentTrack;
      audioRef.current.volume = volume / 100;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
          // For development, use a placeholder tone
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.value = volume / 100;
          osc.frequency.value = 440; // A4 note
          osc.start();
          setTimeout(() => osc.stop(), 1000);
        });
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack, isPlaying, volume]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = (trackUrl: string) => {
    if (currentTrack === trackUrl) {
      setIsPlaying(!isPlaying);
      if (audioRef.current) {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
      }
    } else {
      setCurrentTrack(trackUrl);
      setIsPlaying(true);
    }
  };

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
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Music Therapy</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the healing power of music with our curated playlists designed
            to reduce stress and promote mental wellness.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {musicCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.tracks.map((track) => (
                      <div
                        key={track.title}
                        className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => togglePlay(track.url)}
                            >
                              {isPlaying && currentTrack === track.url ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <div>
                              <p className="font-medium">{track.title}</p>
                              <p className="text-sm text-muted-foreground">{track.duration}</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground capitalize">{track.type}</span>
                        </div>
                        {currentTrack === track.url && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4"
                          >
                            <div className="flex items-center gap-4">
                              <Volume2 className="h-4 w-4 text-muted-foreground" />
                              <Slider
                                value={[volume]}
                                onValueChange={(value) => setVolume(value[0])}
                                max={100}
                                step={1}
                                className="w-32"
                              />
                            </div>
                          </motion.div>
                        )}
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
              <p>Music has been shown to reduce stress, anxiety, and depression. Choose tracks that resonate with your current mood.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}