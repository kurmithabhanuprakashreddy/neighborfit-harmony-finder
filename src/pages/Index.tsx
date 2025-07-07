
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LifestyleSurvey } from '@/components/LifestyleSurvey';
import { NeighborhoodMatches } from '@/components/NeighborhoodMatches';
import { ResearchDashboard } from '@/components/ResearchDashboard';
import { MapPin, Users, TrendingUp, FileText } from 'lucide-react';

export interface UserPreferences {
  commute: number;
  nightlife: number;
  familyFriendly: number;
  affordability: number;
  walkability: number;
  dining: number;
  safety: number;
  culture: number;
  outdoors: number;
  shopping: number;
}

const Index = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [activeTab, setActiveTab] = useState('survey');

  const handleSurveyComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setActiveTab('matches');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
              NeighborFit
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90 animate-fade-in">
              Find Your Perfect Neighborhood Match Through Data-Driven Analysis
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 animate-fade-in">
                <MapPin className="h-6 w-6" />
                <span>Real Data</span>
              </div>
              <div className="flex items-center justify-center space-x-2 animate-fade-in">
                <TrendingUp className="h-6 w-6" />
                <span>Smart Algorithm</span>
              </div>
              <div className="flex items-center justify-center space-x-2 animate-fade-in">
                <Users className="h-6 w-6" />
                <span>Lifestyle Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="survey" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Survey</span>
            </TabsTrigger>
            <TabsTrigger 
              value="matches" 
              disabled={!preferences}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Matches</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Research</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="survey" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Lifestyle Preferences Survey</CardTitle>
                <CardDescription className="text-lg">
                  Help us understand what matters most to you in a neighborhood
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LifestyleSurvey onComplete={handleSurveyComplete} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            {preferences && (
              <div className="animate-fade-in">
                <NeighborhoodMatches preferences={preferences} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="animate-fade-in">
              <ResearchDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
