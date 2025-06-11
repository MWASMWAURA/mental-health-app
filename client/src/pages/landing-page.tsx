import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Shield, Music, Sparkles, Gamepad, BookOpen, Puzzle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const testimonials = [
  {
    name: "Sarah M.",
    text: "The games and music therapy helped reduce my anxiety levels significantly. The AI recommendations were spot-on!",
    role: "Teacher"
  },
  {
    name: "James P.",
    text: "From puzzles to meditation music, this platform offers a comprehensive approach to mental wellness that I haven't found anywhere else.",
    role: "Software Engineer"
  },
  {
    name: "Maria R.",
    text: "The musical therapy section became my daily companion. It's amazing how the right melody can change your entire mood.",
    role: "Healthcare Worker"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze your responses for personalized insights"
  },
  {
    icon: Gamepad,
    title: "Therapeutic Games",
    description: "Engaging games designed to improve cognitive function and reduce stress"
  },
  {
    icon: Music,
    title: "Music Therapy",
    description: "Curated playlists tailored to your stress levels"
  },
  {
    icon: Puzzle,
    title: "Mental Exercises",
    description: "Interactive puzzles and activities for cognitive wellness"
  }
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 2 }}
            d="M 0 300 Q 300 150 600 300 T 1200 300"
            fill="none"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="2"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.05 }}
            transition={{ duration: 2, delay: 0.5 }}
            d="M 0 400 Q 300 250 600 400 T 1200 400"
            fill="none"
            stroke="currentColor"
            className="text-primary"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div
              className="mb-8"
              variants={fadeIn}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Brain className="w-full h-full text-primary" />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              variants={fadeIn}
            >
              Your Mental Health Journey Starts Here
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              variants={fadeIn}
            >
              Experience a comprehensive approach to mental wellness through AI analysis,
              therapeutic games, and personalized music therapy.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="text-lg px-8">
                  Begin Your Journey
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Comprehensive Mental Health Support</h2>
            <p className="text-muted-foreground text-lg">
              Our platform combines technology and expertise to provide you with the best care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2 }
                  }
                }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mb-4"
                    >
                      <feature.icon className="h-12 w-12 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Parallax */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary opacity-20" />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-lg">
              Read how our platform has helped others on their mental health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.2 }
                  }
                }}
              >
                <Card className="h-full backdrop-blur-sm bg-card/90">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]" />
        </motion.div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">
              Start Your Mental Health Journey Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of others who have taken the first step towards better mental health
              through our innovative platform.
            </p>
            <Link href={user ? "/dashboard" : "/auth"}>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}