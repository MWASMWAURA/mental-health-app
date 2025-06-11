import { cn } from "@/lib/utils";
import React from "react";

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
}

interface StepItemProps {
  title: string;
}

export function Steps({ currentStep, children }: StepsProps) {
  const steps = React.Children.toArray(children);

  return (
    <div className="flex gap-4 items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "flex items-center",
              index === currentStep && "text-primary font-medium"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2",
                index === currentStep
                  ? "border-primary bg-primary/10"
                  : index < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground"
              )}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-[2px]",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function StepItem({ title }: StepItemProps) {
  return <span>{title}</span>;
}