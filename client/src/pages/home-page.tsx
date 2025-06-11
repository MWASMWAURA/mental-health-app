import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FilePlus, Video, BrainCircuit, Gamepad, Music } from "lucide-react";
import { ChatBot } from "@/components/chat-bot";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <BrainCircuit className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Mental Health Assessment</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.fullName || user?.username}</span>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Start Assessment</CardTitle>
              <CardDescription>
                Complete your mental health assessment to receive personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/assessment">
                <Button className="w-full">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Begin Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Therapeutic Games</CardTitle>
              <CardDescription>
                Engage in calming games and activities designed to reduce stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/games">
                <Button className="w-full" variant="outline">
                  <Gamepad className="mr-2 h-4 w-4" />
                  Play Games
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Music Therapy</CardTitle>
              <CardDescription>
                Listen to calming music tailored to your stress levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/music-therapy">
                <Button className="w-full" variant="outline">
                  <Music className="mr-2 h-4 w-4" />
                  Listen Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Medical History</CardTitle>
              <CardDescription>
                Securely share your medical records for a comprehensive evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/assessment?step=upload">
                <Button className="w-full" variant="outline">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video Session</CardTitle>
              <CardDescription>
                Record a short video session for behavioral analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/assessment?step=video">
                <Button className="w-full" variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  Start Recording
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <ChatBot />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6" />
              AI-Powered Analysis
            </CardTitle>
            <CardDescription>
              Our advanced machine learning algorithms analyze your responses and data
              to provide personalized insurance category recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <p>
                Complete all three assessment components to receive your comprehensive
                evaluation and insurance recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}