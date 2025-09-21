import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Brain, 
  Code, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  FileText,
  MessageSquare,
  Target
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Resume-Based Questions",
      description: "Upload your resume and get personalized interview questions based on your skills and experience."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Preparation",
      description: "Advanced AI analyzes your answers and provides intelligent feedback to improve your performance."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Coding Challenges",
      description: "Practice with real coding problems and system design questions for technical interviews."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Progressive Difficulty",
      description: "Start with basics and advance through 6 difficulty levels to master interview skills."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Smart Progress Tracking",
      description: "Never repeat correctly answered questions. Focus on areas that need improvement."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Targeted Practice",
      description: "Get the same question again if answered incorrectly until you master it completely."
    }
  ];

  const stages = [
    { name: "Basic", description: "HR questions and fundamentals", level: 1 },
    { name: "Intermediate", description: "Technical concepts and reasoning", level: 2 },
    { name: "Professional", description: "Advanced coding and system design", level: 3 },
    { name: "Expert", description: "Complex algorithms and architecture", level: 4 },
    { name: "Senior", description: "Leadership and strategic thinking", level: 5 },
    { name: "Principal", description: "Industry expertise and innovation", level: 6 }
  ];

  const stats = [
    { value: "10K+", label: "Questions Generated" },
    { value: "95%", label: "Success Rate" },
    { value: "500+", label: "Companies Covered" },
    { value: "24/7", label: "AI Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              AI-Powered Interview Preparation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal AI
              <span className="block text-primary-glow">Interview Coach</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Master technical and HR interviews with personalized questions based on your resume. 
              Practice with AI, track your progress, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Resume & Start
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive interview preparation powered by AI, tailored to your experience and career goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Progressive Learning Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master interview skills through 6 carefully designed stages, from basic HR questions to expert-level challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <Card key={index} className="relative border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary border-primary">
                      Level {stage.level}
                    </Badge>
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{stage.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {stage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of software engineers who have successfully prepared for their dream jobs with PrepAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/upload">
                <FileText className="mr-2 h-5 w-5" />
                Start Your Preparation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">PrepAI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered interview preparation platform designed specifically for software engineers and tech professionals.
              </p>
              <div className="flex space-x-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Join our community</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/upload" className="block text-muted-foreground hover:text-primary transition-colors">
                  Start Preparing
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
                <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PrepAI. All rights reserved. Built with ❤️ for software engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;