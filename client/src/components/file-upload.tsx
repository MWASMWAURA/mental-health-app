import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus, FileCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FileUploadProps = {
  onComplete: (data: { medicalHistory: string }) => void;
};

export function FileUpload({ onComplete }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.match('application/pdf|image/*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful upload
    const mockUrl = `https://storage.example.com/${file.name}`;
    onComplete({ medicalHistory: mockUrl });
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>Upload Medical History</h3>
        <p>
          Please upload any relevant medical history documents or previous mental health 
          assessments. We accept PDF files and images.
        </p>
        <ul>
          <li>Previous mental health evaluations</li>
          <li>Relevant medical records</li>
          <li>Treatment history documents</li>
        </ul>
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf,image/*"
          className="hidden"
          id="file-upload"
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          {file ? (
            <>
              <FileCheck className="h-8 w-8 text-primary" />
              <span>{file.name}</span>
            </>
          ) : (
            <>
              <FilePlus className="h-8 w-8 text-muted-foreground" />
              <span className="text-muted-foreground">
                Click to select a file or drag and drop
              </span>
            </>
          )}
        </label>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload Document"
        )}
      </Button>
    </div>
  );
}
