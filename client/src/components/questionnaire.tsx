import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionnaireData } from "@shared/schema";

const QUESTIONS = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 4,
    text: "Feeling tired or having little energy?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 5,
    text: "Poor appetite or overeating?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 6,
    text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 7,
    text: "Trouble concentrating on things, such as reading or watching TV?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 8,
    text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving a lot more than usual?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 9,
    text: "Thoughts that you would be better off dead or of hurting yourself in some way?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 10,
    text: "Feeling nervous, anxious, or on edge?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 11,
    text: "Not being able to stop or control worrying?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 12,
    text: "Worrying too much about different things?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 13,
    text: "Trouble relaxing?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 14,
    text: "Being so restless that it is hard to sit still?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 15,
    text: "Becoming easily annoyed or irritable?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 16,
    text: "Feeling afraid as if something awful might happen?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 17,
    text: "Difficulty making decisions?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 18,
    text: "Feeling overwhelmed by responsibilities?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 19,
    text: "Feeling detached or distant from others?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 20,
    text: "Loss of interest in social activities?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 21,
    text: "Difficulty concentrating at work or school?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 22,
    text: "Feeling easily fatigued?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 23,
    text: "Experiencing muscle tension or aches?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 24,
    text: "Experiencing headaches or unexplained pain?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 25,
    text: "Feeling tense or wound up?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 26,
    text: "Experiencing panic or sudden feelings of terror?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 27,
    text: "Avoiding places or situations due to fear or anxiety?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 28,
    text: "Experiencing flashbacks or intrusive memories?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 29,
    text: "Feeling emotionally numb or disconnected?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
  {
    id: 30,
    text: "Having difficulty controlling anger or irritability?",
    choices: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
  },
];

type QuestionnaireProps = {
  onComplete: (data: {
    questionnaire: { answers: { questionId: number; value: number }[] };
  }) => void;
};

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [showUnanswered, setShowUnanswered] = useState(false);

  // Automatically submit when all questions are answered
  useEffect(() => {
    if (Object.keys(responses).length === QUESTIONS.length) {
      handleSubmit();
    }
    // eslint-disable-next-line
  }, [responses]);

  const handleSubmit = () => {
    if (Object.keys(responses).length !== QUESTIONS.length) {
      setShowUnanswered(true);
      return;
    }
    const answers = Object.entries(responses).map(([questionId, value]) => ({
      questionId: Number(questionId),
      value,
    }));
    onComplete({ questionnaire: { answers } });
  };

  const unansweredIds = QUESTIONS.filter(
    (q) => responses[q.id] === undefined
  ).map((q) => q.id);

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p>
          Please answer the following questions honestly to help us better
          understand your mental health status. Your responses will be kept
          confidential.
        </p>
        {showUnanswered && unansweredIds.length > 0 && (
          <div className="text-red-600 font-semibold">
            Please answer all questions. Unanswered: {unansweredIds.join(", ")}
          </div>
        )}
      </div>

      {QUESTIONS.map((question) => (
        <Card
          key={question.id}
          className={
            showUnanswered && responses[question.id] === undefined
              ? "border-red-500"
              : ""
          }
        >
          <CardContent className="pt-6">
            <Label className="text-lg mb-4 block">{question.text}</Label>
            <RadioGroup
              value={responses[question.id]?.toString()}
              onValueChange={(value) =>
                setResponses((prev) => ({
                  ...prev,
                  [question.id]: Number(value),
                }))
              }
            >
              {question.choices.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`${question.id}-${option.value}`}
                  />
                  <Label htmlFor={`${question.id}-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={Object.keys(responses).length !== QUESTIONS.length}
        className="w-full"
      >
        Submit Questionnaire
      </Button>
    </div>
  );
}
