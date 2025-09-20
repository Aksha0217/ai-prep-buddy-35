import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  RotateCcw, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Star,
  Award
} from "lucide-react";

interface ResultsData {
  stage: number;
  score: number;
  timeElapsed: number;
  totalQuestions: number;
  incorrectQuestions: string[];
}

const Results = () => {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('interviewResults');
    if (!storedResults) {
      navigate('/');
      return;
    }
    setResultsData(JSON.parse(storedResults));
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (percentage >= 75) return { level: "Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage >= 60) return { level: "Average", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "Needs Improvement", color: "text-red-600", bg: "bg-red-100" };
  };

  const getRecommendations = (score: number, total: number, stage: number) => {
    const percentage = (score / total) * 100;
    const recommendations = [];

    if (percentage < 60) {
      recommendations.push("Review fundamental concepts for this stage");
      recommendations.push("Practice with similar questions before moving to next level");
    } else if (percentage < 80) {
      recommendations.push("Good progress! Focus on areas where you struggled");
      recommendations.push("Consider reviewing advanced topics for this stage");
    } else {
      recommendations.push("Excellent performance! You're ready for the next level");
      recommendations.push("Consider challenging yourself with higher difficulty stages");
    }

    if (stage < 6) {
      recommendations.push(`Consider attempting Stage ${stage + 1} when ready`);
    }

    return recommendations;
  };

  const handleRetryStage = () => {
    sessionStorage.removeItem('interviewResults');
    navigate('/stages');
  };

  const handleNextStage = () => {
    if (resultsData && resultsData.stage < 6) {
      sessionStorage.setItem('selectedStage', (resultsData.stage + 1).toString());
      navigate('/interview');
    }
  };

  const handleStartOver = () => {
    sessionStorage.clear();
    navigate('/upload');
  };

  if (!resultsData) {
    return null;
  }

  const percentage = (resultsData.score / resultsData.totalQuestions) * 100;
  const performance = getPerformanceLevel(percentage);
  const recommendations = getRecommendations(resultsData.score, resultsData.totalQuestions, resultsData.stage);

  const stageNames = {
    1: "Basic",
    2: "Intermediate", 
    3: "Professional",
    4: "Expert",
    5: "Senior",
    6: "Principal"
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${performance.bg} mb-4`}>
              <Trophy className={`h-10 w-10 ${performance.color}`} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Interview Complete!
          </h1>
          <p className="text-xl text-muted-foreground">
            Stage {resultsData.stage} - {stageNames[resultsData.stage as keyof typeof stageNames]}
          </p>
        </div>

        {/* Performance Overview */}
        <Card className="mb-8 border-primary/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">{resultsData.score}</div>
                <div className="text-sm text-muted-foreground">Questions Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{resultsData.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{Math.round(percentage)}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{formatTime(resultsData.timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Performance</span>
                <Badge className={`${performance.bg} ${performance.color} border-0`}>
                  {performance.level}
                </Badge>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Questions Answered Correctly</span>
                  <span className="font-semibold text-success">{resultsData.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-semibold text-success">{Math.round(percentage)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stage Attempted</span>
                  <Badge variant="outline" className="text-success border-success">
                    {stageNames[resultsData.stage as keyof typeof stageNames]}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <XCircle className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Questions to Review</span>
                  <span className="font-semibold text-warning">{resultsData.incorrectQuestions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Time per Question</span>
                  <span className="font-semibold text-muted-foreground">
                    {Math.round(resultsData.timeElapsed / resultsData.totalQuestions)}s
                  </span>
                </div>
                {resultsData.incorrectQuestions.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Focus on practicing similar questions to improve your performance.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Recommendations
            </CardTitle>
            <CardDescription>
              Based on your performance, here's what we recommend for your continued preparation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleRetryStage} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-5 w-5" />
            Retry This Stage
          </Button>
          
          {percentage >= 70 && resultsData.stage < 6 && (
            <Button onClick={handleNextStage} className="flex-1">
              Try Next Stage
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
          
          <Button onClick={handleStartOver} variant="outline" className="flex-1">
            <Target className="mr-2 h-5 w-5" />
            Start Over
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">
                Keep Practicing!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Consistent practice is key to mastering interview skills. 
                {percentage >= 80 
                  ? " You're doing great - keep challenging yourself!" 
                  : " Focus on your weak areas and try again when ready."
                }
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Practice daily</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Track progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Improve gradually</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;