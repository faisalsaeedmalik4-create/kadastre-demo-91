import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, FileText, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleProcess = () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/results");
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kadastre
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            As Australia enters a decade of major growth and infrastructure expansion, the need for
            faster, more dependable cadastral survey data will continue to rise. Kadastre marks a
            significant transformation in how this information is handled—evolving it from static
            records into dynamic, digital assets.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="p-8 shadow-lg animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
              file
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={processing}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              {file ? (
                <>
                  <FileText className="w-16 h-16 text-primary animate-scale-in" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <UploadIcon className="w-16 h-16 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      Drop your PDF here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports PDF files up to 50MB
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          {processing && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <p className="text-sm font-medium text-foreground">Processing your document...</p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          )}

          {file && !processing && (
            <div className="mt-8 flex justify-center animate-fade-in">
              <Button
                size="lg"
                onClick={handleProcess}
                className="px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Process PDF
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Upload;
