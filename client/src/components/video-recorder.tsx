import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Video, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VideoRecorderProps = {
  onComplete: (data: { videoUrl: string }) => void;
};

export function VideoRecorder({ onComplete }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Automatically stop after 2 minutes
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          stopRecording();
        }
      }, 120000);

    } catch (err) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to record your session",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);

      mediaRecorderRef.current.onstop = () => {
        // Clean up stream
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);

        // Simulate upload delay
        setTimeout(() => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          // Mock successful upload
          const mockUrl = `https://storage.example.com/video-${Date.now()}.webm`;
          onComplete({ videoUrl: mockUrl });
          setIsProcessing(false);
        }, 2000);
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>Video Session</h3>
        <p>
          Please record a short video session (up to 2 minutes) where you describe your
          current mental state and any concerns you'd like to share. This helps our
          system better understand your needs.
        </p>
      </div>

      <div className="relative aspect-video rounded-lg bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {!stream && !isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Video className="h-12 w-12 text-white/50" />
          </div>
        )}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
      </div>

      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className="w-full"
        variant={isRecording ? "destructive" : "default"}
      >
        {isRecording ? (
          <>
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Video className="mr-2 h-4 w-4" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
}
