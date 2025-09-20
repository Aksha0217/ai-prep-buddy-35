import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Brain,
  Clock,
  Target,
  Trophy,
  AlertCircle
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: 'hr' | 'technical' | 'coding' | 'behavioral';
  difficulty: number;
  category: string;
  expectedAnswer?: string;
  hints?: string[];
}

interface InterviewState {
  currentQuestion: Question | null;
  answeredQuestions: string[];
  incorrectQuestions: string[];
  currentAnswer: string;
  score: number;
  timeElapsed: number;
  stage: number;
  isCompleted: boolean;
}

const Interview = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    currentQuestion: null,
    answeredQuestions: [],
    incorrectQuestions: [],
    currentAnswer: '',
    score: 0,
    timeElapsed: 0,
    stage: 1,
    isCompleted: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample questions bank based on different stages
  const questionBank: { [key: number]: Question[] } = {
    1: [ // Basic
      {
        id: 'hr_1',
        text: 'Tell me about yourself and your background in software development.',
        type: 'hr',
        difficulty: 1,
        category: 'Introduction',
        hints: ['Focus on your education, key experiences, and what drives you in tech']
      },
      {
        id: 'hr_2', 
        text: 'Why are you interested in this role and our company?',
        type: 'hr',
        difficulty: 1,
        category: 'Motivation',
        hints: ['Research the company, mention specific projects or values that attract you']
      },
      {
        id: 'tech_basic_1',
        text: 'What is the difference between let, const, and var in JavaScript?',
        type: 'technical',
        difficulty: 1,
        category: 'JavaScript Fundamentals',
        hints: ['Think about scope, hoisting, and reassignment']
      },
      {
        id: 'tech_basic_2',
        text: 'Explain what REST API is and its principles.',
        type: 'technical',
        difficulty: 1,
        category: 'Web Development',
        hints: ['Consider HTTP methods, statelessness, and resource-based URLs']
      }
    ],
    2: [ // Intermediate
      {
        id: 'tech_int_1',
        text: 'Based on your resume, you worked with React. Can you explain the React component lifecycle?',
        type: 'technical',
        difficulty: 2,
        category: 'React',
        hints: ['Think about mounting, updating, and unmounting phases']
      },
      {
        id: 'tech_int_2',
        text: 'You mentioned using Node.js in your projects. How does Node.js handle asynchronous operations?',
        type: 'technical',
        difficulty: 2,
        category: 'Node.js',
        hints: ['Consider event loop, callbacks, promises, and async/await']
      },
      {
        id: 'tech_int_3',
        text: 'Describe a challenging project from your resume and how you solved technical difficulties.',
        type: 'behavioral',
        difficulty: 2,
        category: 'Problem Solving',
        hints: ['Use STAR method: Situation, Task, Action, Result']
      }
    ],
    3: [ // Professional
      {
        id: 'coding_1',
        text: 'Write a function to find the two numbers in an array that add up to a target sum. Optimize for time complexity.',
        type: 'coding',
        difficulty: 3,
        category: 'Algorithms',
        hints: ['Consider using a hash map for O(n) solution']
      },
      {
        id: 'system_1',
        text: 'Design a URL shortening service like bit.ly. Consider scalability and performance.',
        type: 'technical',
        difficulty: 3,
        category: 'System Design',
        hints: ['Think about database design, caching, load balancing']
      },
      {
        id: 'coding_2',
        text: 'Implement a debounce function in JavaScript. Explain when you would use it.',
        type: 'coding',
        difficulty: 3,
        category: 'JavaScript',
        hints: ['Consider setTimeout, closure, and performance optimization']
      }
    ]
  };

  useEffect(() => {
    const storedResumeData = sessionStorage.getItem('resumeData');
    const storedStage = sessionStorage.getItem('selectedStage');
    
    if (!storedResumeData || !storedStage) {
      navigate('/upload');
      return;
    }

    setResumeData(JSON.parse(storedResumeData));
    const stage = parseInt(storedStage);
    setInterviewState(prev => ({ ...prev, stage }));
    
    // Load first question
    loadNextQuestion(stage, [], []);
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setInterviewState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadNextQuestion = (stage: number, answered: string[], incorrect: string[]) => {
    const availableQuestions = questionBank[stage] || [];
    const unansweredQuestions = availableQuestions.filter(q => 
      !answered.includes(q.id) && !incorrect.includes(q.id)
    );

    // If no new questions, try incorrect questions
    if (unansweredQuestions.length === 0 && incorrect.length > 0) {
      const incorrectQuestion = availableQuestions.find(q => incorrect.includes(q.id));
      if (incorrectQuestion) {
        setInterviewState(prev => ({
          ...prev,
          currentQuestion: incorrectQuestion
        }));
        return;
      }
    }

    // If we have unanswered questions, pick one
    if (unansweredQuestions.length > 0) {
      const nextQuestion = unansweredQuestions[0];
      setInterviewState(prev => ({
        ...prev,
        currentQuestion: nextQuestion
      }));
      return;
    }

    // No more questions - interview complete
    setInterviewState(prev => ({
      ...prev,
      isCompleted: true,
      currentQuestion: null
    }));
  };

  const handleAnswerSubmit = async () => {
    if (!interviewState.currentQuestion || !interviewState.currentAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "Enter your response before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate AI evaluation (in real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple evaluation based on answer length and keywords
      const answer = interviewState.currentAnswer.toLowerCase();
      const question = interviewState.currentQuestion;
      
      let isCorrect = false;
      
      // Basic evaluation logic
      if (question.type === 'hr' || question.type === 'behavioral') {
        isCorrect = answer.length > 50; // Basic length check for HR questions
      } else if (question.type === 'technical') {
        // Check for relevant keywords based on question
        const keywords = question.category.toLowerCase();
        isCorrect = answer.includes(keywords) || answer.length > 100;
      } else if (question.type === 'coding') {
        // For coding questions, check for algorithm-related terms
        const codingKeywords = ['function', 'algorithm', 'complexity', 'solution'];
        isCorrect = codingKeywords.some(keyword => answer.includes(keyword));
      }

      // Randomly make some answers incorrect for demo purposes
      if (Math.random() < 0.3) {
        isCorrect = false;
      }

      if (isCorrect) {
        toast({
          title: "Correct Answer!",
          description: "Great job! Moving to the next question.",
        });

        const newAnswered = [...interviewState.answeredQuestions, question.id];
        const newIncorrect = interviewState.incorrectQuestions.filter(id => id !== question.id);
        
        setInterviewState(prev => ({
          ...prev,
          answeredQuestions: newAnswered,
          incorrectQuestions: newIncorrect,
          score: prev.score + 1,
          currentAnswer: ''
        }));

        setTimeout(() => {
          loadNextQuestion(interviewState.stage, newAnswered, newIncorrect);
        }, 1000);

      } else {
        toast({
          title: "Needs Improvement",
          description: "This question will be asked again later. Keep practicing!",
          variant: "destructive"
        });

        const newIncorrect = [...interviewState.incorrectQuestions];
        if (!newIncorrect.includes(question.id)) {
          newIncorrect.push(question.id);
        }

        setInterviewState(prev => ({
          ...prev,
          incorrectQuestions: newIncorrect,
          currentAnswer: ''
        }));

        setTimeout(() => {
          loadNextQuestion(interviewState.stage, interviewState.answeredQuestions, newIncorrect);
        }, 1000);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setShowHint(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalQuestions = questionBank[interviewState.stage]?.length || 1;
    return Math.round((interviewState.answeredQuestions.length / totalQuestions) * 100);
  };

  const handleCompleteInterview = () => {
    sessionStorage.setItem('interviewResults', JSON.stringify({
      stage: interviewState.stage,
      score: interviewState.score,
      timeElapsed: interviewState.timeElapsed,
      totalQuestions: questionBank[interviewState.stage]?.length || 0,
      incorrectQuestions: interviewState.incorrectQuestions
    }));
    navigate('/results');
  };

  if (interviewState.isCompleted) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center border-success/20 bg-success/5">
            <CardHeader>
              <Trophy className="h-16 w-16 text-success mx-auto mb-4" />
              <CardTitle className="text-3xl">Interview Complete!</CardTitle>
              <CardDescription className="text-lg">
                Congratulations on completing the interview preparation session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-success">{interviewState.score}</div>
                  <div className="text-muted-foreground">Questions Mastered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{formatTime(interviewState.timeElapsed)}</div>
                  <div className="text-muted-foreground">Time Spent</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{getProgressPercentage()}%</div>
                  <div className="text-muted-foreground">Completion Rate</div>
                </div>
              </div>
              
              <Button onClick={handleCompleteInterview} size="lg">
                View Detailed Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!interviewState.currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Preparing Your Question...</h2>
          <p className="text-muted-foreground">Our AI is generating a personalized question based on your resume.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Stage {interviewState.stage} Interview
              </h1>
              <p className="text-muted-foreground">
                Question {interviewState.answeredQuestions.length + 1} of {questionBank[interviewState.stage]?.length || 0}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatTime(interviewState.timeElapsed)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-success" />
                <span>{interviewState.score} correct</span>
              </div>
            </div>
          </div>
          
          <Progress value={getProgressPercentage()} className="mt-4" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-primary border-primary">
                {interviewState.currentQuestion.category}
              </Badge>
              <Badge 
                variant={interviewState.currentQuestion.type === 'coding' ? 'default' : 'secondary'}
              >
                {interviewState.currentQuestion.type.toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {interviewState.currentQuestion.text}
            </CardTitle>
          </CardHeader>
          
          {showHint && interviewState.currentQuestion.hints && (
            <CardContent className="pt-0">
              <Alert className="border-primary/20 bg-primary/5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Hint:</strong> {interviewState.currentQuestion.hints[0]}
                </AlertDescription>
              </Alert>
            </CardContent>
          )}
        </Card>

        {/* Answer Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
            <CardDescription>
              {interviewState.currentQuestion.type === 'coding' 
                ? "Write your code solution with explanations"
                : "Provide a comprehensive answer to the question"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={interviewState.currentAnswer}
              onChange={(e) => setInterviewState(prev => ({ 
                ...prev, 
                currentAnswer: e.target.value 
              }))}
              placeholder={
                interviewState.currentQuestion.type === 'coding'
                  ? "// Write your code here...\nfunction solution() {\n  // Your implementation\n}"
                  : "Type your answer here..."
              }
              className="min-h-[200px] font-mono"
              disabled={isSubmitting}
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAnswerSubmit}
                disabled={isSubmitting || !interviewState.currentAnswer.trim()}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              {interviewState.currentQuestion.hints && !showHint && (
                <Button
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  disabled={isSubmitting}
                >
                  Show Hint
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{interviewState.answeredQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Questions Mastered</div>
              </div>
              <div className="text-center">
                <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                <div className="text-2xl font-bold text-destructive">{interviewState.incorrectQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Need Practice</div>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{getProgressPercentage()}%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;