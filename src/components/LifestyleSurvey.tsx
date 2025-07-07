
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { UserPreferences } from '@/pages/Index';

interface LifestyleSurveyProps {
  onComplete: (preferences: UserPreferences) => void;
}

const surveyQuestions = [
  {
    key: 'commute' as keyof UserPreferences,
    title: 'Short Commute',
    description: 'How important is being close to work/school?'
  },
  {
    key: 'nightlife' as keyof UserPreferences,
    title: 'Nightlife & Entertainment',
    description: 'Access to bars, clubs, and evening activities'
  },
  {
    key: 'familyFriendly' as keyof UserPreferences,
    title: 'Family-Friendly',
    description: 'Good schools, parks, and family activities'
  },
  {
    key: 'affordability' as keyof UserPreferences,
    title: 'Affordability',
    description: 'Reasonable cost of living and housing'
  },
  {
    key: 'walkability' as keyof UserPreferences,
    title: 'Walkability',
    description: 'Easy to walk to daily necessities'
  },
  {
    key: 'dining' as keyof UserPreferences,
    title: 'Dining Options',
    description: 'Variety of restaurants and food choices'
  },
  {
    key: 'safety' as keyof UserPreferences,
    title: 'Safety',
    description: 'Low crime rates and secure environment'
  },
  {
    key: 'culture' as keyof UserPreferences,
    title: 'Arts & Culture',
    description: 'Museums, theaters, and cultural events'
  },
  {
    key: 'outdoors' as keyof UserPreferences,
    title: 'Outdoor Activities',
    description: 'Parks, hiking trails, and outdoor recreation'
  },
  {
    key: 'shopping' as keyof UserPreferences,
    title: 'Shopping',
    description: 'Access to retail stores and shopping centers'
  }
];

export const LifestyleSurvey = ({ onComplete }: LifestyleSurveyProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    commute: 5,
    nightlife: 5,
    familyFriendly: 5,
    affordability: 5,
    walkability: 5,
    dining: 5,
    safety: 5,
    culture: 5,
    outdoors: 5,
    shopping: 5
  });

  const handleSliderChange = (key: keyof UserPreferences, value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const handleSubmit = () => {
    console.log('Survey completed with preferences:', preferences);
    onComplete(preferences);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Rate each factor from 1 (not important) to 10 (very important)
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {surveyQuestions.map((question, index) => (
          <Card key={question.key} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{question.title}</CardTitle>
              <CardDescription>{question.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Not Important</span>
                  <span className="font-semibold text-lg text-blue-600">
                    {preferences[question.key]}
                  </span>
                  <span>Very Important</span>
                </div>
                <Slider
                  value={[preferences[question.key]]}
                  onValueChange={(value) => handleSliderChange(question.key, value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <Button 
          onClick={handleSubmit}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-3 text-lg"
        >
          Find My Perfect Neighborhoods
        </Button>
      </div>
    </div>
  );
};
