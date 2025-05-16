
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UploadCloud } from "lucide-react";
import { Certificate } from "@/lib/types";
import { parseCertificateFromJSON } from "@/lib/certificate";

interface FileUploaderProps {
  onFileLoaded: (certificate: Certificate) => void;
  onError: (message: string) => void;
}

export function FileUploader({ onFileLoaded, onError }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    handleFile(file);
  };
  
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (!file) return;
    
    handleFile(file);
  };
  
  const handleFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      onError("Please upload a valid JSON credential file");
      return;
    }
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const certificate = parseCertificateFromJSON(content);
        
        // Validate required fields
        if (!certificate.id || !certificate.studentName || 
            !certificate.universityName || !certificate.signature) {
          throw new Error("Invalid certificate format: missing required fields");
        }
        
        onFileLoaded(certificate);
      } catch (error) {
        console.error("File parsing error:", error);
        onError("Invalid certificate format. Please upload a valid credential file.");
      }
    };
    
    reader.onerror = () => {
      onError("Failed to read file. Please try again.");
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? "border-brand-blue bg-brand-blue/5" : "border-gray-300 hover:border-gray-400"
      } transition-all`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-muted rounded-full">
          <UploadCloud className="h-8 w-8 text-brand-blue" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Upload Credential</h3>
          <p className="text-sm text-gray-500">
            {fileName ? (
              <>Selected file: <span className="font-medium">{fileName}</span></>
            ) : (
              <>Drag and drop or click to upload a JSON credential file</>
            )}
          </p>
        </div>
        
        <div className="pt-2">
          <Input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Button 
            type="button" 
            variant="outline" 
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </Button>
        </div>
      </div>
    </div>
  );
}
