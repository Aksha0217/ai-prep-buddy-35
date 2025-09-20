import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Users, 
  Code, 
  Briefcase, 
  Crown, 
  Trophy,
  CheckCircle,
  Lock,
  ArrowRight,
  Timer,
  Target
} from "lucide-react";

const StageSelection = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('resumeData');
    if (!storedData) {
      navigate('/upload');
      return;
    }
    setResumeData(JSON.parse(storedData));
  }, [navigate]);

  const stages = [
    {
      id: 1,
      name: "Basic",
      icon: <Users className="h-8 w-8" />,
      difficulty: "Beginner",
      duration: "15-20 min",
      questions: "10-12 questions",
      color: "bg-emerald-500",
      description: "HR fundamentals and basic technical concepts",
      topics: ["Introduction", "Behavioral questions", "Basic CS concepts", "Communication skills"],
      unlocked: true
    },
    {
      id: 2,
      name: "Intermediate", 
      icon: <Code className="h-8 w-8" />,
      difficulty: "Intermediate",
      duration: "25-30 min",
      questions: "12-15 questions",
      color: "bg-blue-500",
      description: "Resume-based questions and technical reasoning",
      topics: ["Experience deep-dive", "Technical problem solving", "Project discussions", "Architecture basics"],
      unlocked: true
    },
    {
      id: 3,
      name: "Professional",
      icon: <Briefcase className="h-8 w-8" />,
      difficulty: "Advanced",
      duration: "35-45 min", 
      questions: "15-18 questions",
      color: "bg-purple-500",
      description: "Advanced coding and system design challenges",
      topics: ["Live coding", "System design", "Performance optimization", "Best practices"],
      unlocked: true
    },
    {
      id: 4,
      name: "Expert",
      icon: <Star className="h-8 w-8" />,
      difficulty: "Expert",
      duration: "45-60 min",
      questions: "18-22 questions", 
      color: "bg-orange-500",
      description: "Complex algorithms and distributed systems",
      topics: ["Advanced algorithms", "Distributed systems", "Scalability", "Trade-offs"],
      unlocked: false
    },
    {
      id: 5,
      name: "Senior",
      icon: <Crown className="h-8 w-8" />,
      difficulty: "Senior",
      duration: "50-70 min",
      questions: "20-25 questions",
      color: "bg-red-500",
      description: "Leadership scenarios and strategic thinking",
      topics: ["Technical leadership", "Team management", "Strategic decisions", "Mentoring"],
      unlocked: false
    },
    {
      id: 6,
      name: "Principal",
      icon: <Trophy className="h-8 w-8" />,
      difficulty: "Principal",
      duration: "60-90 min",
      questions: "25-30 questions",
      color: "bg-amber-500",
      description: "Industry expertise and innovation challenges",
      topics: ["Industry vision", "Technology strategy", "Innovation", "Cross-team collaboration"],
      unlocked: false
    }
  ];

  const handleStageSelect = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage?.unlocked) {
      setSelectedStage(stageId);
    }
  };

  const handleStartInterview = () => {
    if (selectedStage) {
      sessionStorage.setItem('selectedStage', selectedStage.toString());
      navigate('/interview');
    }
  };

  if (!resumeData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Challenge Level
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select the difficulty level that matches your experience and interview preparation goals. 
            Start from any unlocked level and progress at your own pace.
          </p>
        </div>

        {/* Resume Summary */}
        <Card className="mb-12 border-primary/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Resume Processed Successfully
            </CardTitle>
            <CardDescription>
              Questions will be personalized based on your skills and experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Top Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.slice(0, 5).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Experience</h4>
                <p className="text-sm text-muted-foreground">
                  {resumeData.experience[0]?.position} at {resumeData.experience[0]?.company}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Ready For</h4>
                <p className="text-sm text-primary font-medium">
                  All levels unlocked based on your experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stages.map((stage) => (
            <Card
              key={stage.id}
              className={`cursor-pointer transition-all duration-300 border-2 ${
                selectedStage === stage.id
                  ? 'border-primary shadow-medium scale-105'
                  : stage.unlocked
                  ? 'border-border hover:border-primary/50 hover:shadow-soft'
                  : 'border-border/50 opacity-60'
              } ${stage.unlocked ? '' : 'cursor-not-allowed'}`}
              onClick={() => handleStageSelect(stage.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stage.color} text-white`}>
                    {stage.icon}
                  </div>
                  {stage.unlocked ? (
                    <Badge variant="outline" className="text-success border-success">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{stage.name}</CardTitle>
                <CardDescription>{stage.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge variant="secondary">{stage.difficulty}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    {stage.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    {stage.questions}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-foreground">Topics Covered:</h4>
                  <ul className="space-y-1">
                    {stage.topics.map((topic, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedStage === stage.id && (
                  <div className="pt-2 border-t border-border">
                    <Progress value={100} className="mb-2" />
                    <p className="text-xs text-primary font-medium">Selected for interview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Section */}
        {selectedStage && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Ready to start {stages.find(s => s.id === selectedStage)?.name} level?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your interview will be personalized based on your resume and the selected difficulty level.
                  </p>
                </div>
                <Button onClick={handleStartInterview} size="lg" className="min-w-[200px]">
                  Start Interview
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help Choosing?</CardTitle>
            <CardDescription>
              Here's our recommendation based on your experience level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-emerald-100 p-4 rounded-lg mb-4">
                  <Users className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">New Graduate</h4>
                <p className="text-sm text-muted-foreground">
                  Start with Basic to build confidence, then move to Intermediate
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <Code className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">2-5 Years Experience</h4>
                <p className="text-sm text-muted-foreground">
                  Jump to Intermediate or Professional based on your confidence level
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-4">
                  <Briefcase className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">Senior Engineer</h4>
                <p className="text-sm text-muted-foreground">
                  Start with Professional to prepare for senior-level interviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StageSelection;