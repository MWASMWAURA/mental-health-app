import { useSearchParams } from "@/hooks/use-search-params";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, StepItem } from "@/components/ui/steps";
import { useState } from "react";
import { Questionnaire } from "@/components/questionnaire";
import { FileUpload } from "@/components/file-upload";
import { VideoRecorder } from "@/components/video-recorder";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Assessment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

type AssessmentData = {
  questionnaire?: Assessment["questionnaire"];
  medicalHistory?: string;
  videoUrl?: string;
};

export default function AssessmentPage() {
  const [searchParams] = useSearchParams();
  const initialStep = searchParams.get("step");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(() => {
    switch (initialStep) {
      case "upload": return 1;
      case "video": return 2;
      default: return 0;
    }
  });

  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});

  // Mock ML processing delay
  const processMutation = useMutation({
    mutationFn: async (data: AssessmentData) => {
      const res = await apiRequest("POST", "/api/assessment", {
        ...data,
        mlResults: {
          riskCategory: "low",
          confidenceScore: 0.85,
          recommendedPlan: "Standard Coverage",
          factors: ["Low anxiety levels", "Good sleep patterns"]
        }
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      toast({
        title: "Assessment Complete",
        description: "Your results have been processed successfully.",
      });
      setLocation("/");
    }
  });

  const handleStepComplete = (data: Partial<AssessmentData>) => {
    const newData = { ...assessmentData, ...data };
    setAssessmentData(newData);

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      processMutation.mutate(newData);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Mental Health Assessment</CardTitle>
          <Steps currentStep={currentStep}>
            <StepItem title="Questionnaire" />
            <StepItem title="Medical History" />
            <StepItem title="Video Session" />
          </Steps>
        </CardHeader>
        <CardContent>
          {processMutation.isPending ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Processing your assessment...</p>
            </div>
          ) : (
            <>
              {currentStep === 0 && (
                <Questionnaire onComplete={handleStepComplete} />
              )}
              {currentStep === 1 && (
                <FileUpload onComplete={handleStepComplete} />
              )}
              {currentStep === 2 && (
                <VideoRecorder onComplete={handleStepComplete} />
              )}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/")}
                >
                  Save for Later
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}