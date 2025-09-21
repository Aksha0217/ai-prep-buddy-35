import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
    }
  }, [toast]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Validate file directly
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(droppedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }

      if (droppedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setFile(droppedFile);
    }
  }, [toast]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const simulateResumeProcessing = async (file: File) => {
    // Simulate AI processing with realistic extracted data
    const mockExtractedData = {
      personalInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567"
      },
      skills: [
        "JavaScript", "TypeScript", "React", "Node.js", "Python", 
        "SQL", "MongoDB", "AWS", "Docker", "Git", "REST APIs", 
        "GraphQL", "Redux", "Express.js", "Jest"
      ],
      experience: [
        {
          company: "Tech Corp",
          position: "Senior Software Engineer",
          duration: "2021-Present",
          technologies: ["React", "Node.js", "AWS", "TypeScript"]
        },
        {
          company: "StartupXYZ",
          position: "Full Stack Developer", 
          duration: "2019-2021",
          technologies: ["JavaScript", "Python", "MongoDB", "Express.js"]
        }
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "State University",
          year: "2019"
        }
      ],
      projects: [
        {
          name: "E-commerce Platform",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"],
          description: "Built a full-stack e-commerce platform with payment integration"
        },
        {
          name: "Task Management App",
          technologies: ["React Native", "Firebase", "Redux"],
          description: "Mobile app for team task management with real-time updates"
        }
      ]
    };

    // Simulate processing steps
    const steps = [
      { progress: 20, message: "Extracting text from resume..." },
      { progress: 40, message: "Analyzing skills and experience..." },
      { progress: 60, message: "Identifying key technologies..." },
      { progress: 80, message: "Generating question categories..." },
      { progress: 100, message: "Processing complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setUploadProgress(step.progress);
    }

    return mockExtractedData;
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const extractedData = await simulateResumeProcessing(file);
      setExtractedData(extractedData);
      
      // Store in session storage for use in interview
      sessionStorage.setItem('resumeData', JSON.stringify(extractedData));
      sessionStorage.setItem('resumeFileName', file.name);
      
      toast({
        title: "Resume processed successfully!",
        description: "Your resume has been analyzed. Ready to start preparing!",
      });

    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Failed to process resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartPreparation = () => {
    if (extractedData) {
      navigate('/stages');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume to get personalized interview questions based on your skills, experience, and projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Resume
              </CardTitle>
              <CardDescription>
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {file ? (
                  <div className="space-y-4">
                    <FileText className="h-12 w-12 text-primary mx-auto" />
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {!isUploading && !extractedData && (
                      <Button onClick={handleUpload} className="mt-4">
                        Process Resume
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drop your resume here
                      </p>
                      <p className="text-muted-foreground">
                        or click to browse files
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="mt-6 space-y-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing your resume...
                  </div>
                </div>
              )}

              {extractedData && (
                <Alert className="mt-6 border-success/20 bg-success/5">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success-foreground">
                    Resume processed successfully! Click "Start Preparation" to begin.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>What We Extract</CardTitle>
              <CardDescription>
                Our AI analyzes your resume to create personalized questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {extractedData ? (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Skills Identified</h4>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.skills.slice(0, 8).map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {extractedData.skills.length > 8 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                          +{extractedData.skills.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Experience</h4>
                    <div className="space-y-2">
                      {extractedData.experience.map((exp: any, index: number) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <p className="font-medium text-foreground">{exp.position}</p>
                          <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleStartPreparation}
                    className="w-full"
                    size="lg"
                  >
                    Start Preparation
                  </Button>
                </>
              ) : (
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Technical Skills</p>
                      <p className="text-sm">Programming languages, frameworks, tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Work Experience</p>
                      <p className="text-sm">Companies, roles, and responsibilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Projects</p>
                      <p className="text-sm">Technologies used and achievements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Education</p>
                      <p className="text-sm">Degrees and certifications</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium text-foreground mb-2">Privacy Notice</p>
                <p className="text-sm text-muted-foreground">
                  Your resume is processed locally and used only to generate personalized interview questions. 
                  We do not store your personal information or share it with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeUpload;