
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserPreferences } from '@/pages/Index';
import { MapPin, Star, TrendingUp } from 'lucide-react';

interface NeighborhoodData {
  id: string;
  name: string;
  city: string;
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
  description: string;
  keyFeatures: string[];
}

const neighborhoodData: NeighborhoodData[] = [
  {
    id: '1',
    name: 'Downtown Arts District',
    city: 'Metro City',
    commute: 9,
    nightlife: 9,
    familyFriendly: 4,
    affordability: 3,
    walkability: 10,
    dining: 9,
    safety: 6,
    culture: 10,
    outdoors: 5,
    shopping: 8,
    description: 'Vibrant urban core with world-class museums, theaters, and nightlife',
    keyFeatures: ['Art galleries', 'Theater district', 'Rooftop bars', 'Loft apartments']
  },
  {
    id: '2',
    name: 'Maple Grove Suburbs',
    city: 'Metro City',
    commute: 4,
    nightlife: 2,
    familyFriendly: 10,
    affordability: 7,
    walkability: 6,
    dining: 6,
    safety: 9,
    culture: 5,
    outdoors: 8,
    shopping: 7,
    description: 'Family-oriented community with excellent schools and parks',
    keyFeatures: ['Top-rated schools', 'Community parks', 'Family centers', 'Safe streets']
  },
  {
    id: '3',
    name: 'Riverside Walk',
    city: 'Metro City',
    commute: 7,
    nightlife: 6,
    familyFriendly: 7,
    affordability: 6,
    walkability: 9,
    dining: 8,
    safety: 8,
    culture: 7,
    outdoors: 9,
    shopping: 6,
    description: 'Scenic waterfront community with outdoor recreation and bistros',
    keyFeatures: ['River trails', 'Waterfront dining', 'Bike paths', 'Farmers market']
  },
  {
    id: '4',
    name: 'University Heights',
    city: 'Metro City',
    commute: 8,
    nightlife: 8,
    familyFriendly: 5,
    affordability: 8,
    walkability: 8,
    dining: 7,
    safety: 7,
    culture: 8,
    outdoors: 6,
    shopping: 7,
    description: 'Dynamic college town atmosphere with affordable living and young energy',
    keyFeatures: ['College bars', 'Affordable eats', 'Bookstores', 'Student housing']
  },
  {
    id: '5',
    name: 'Historic Oakwood',
    city: 'Metro City',
    commute: 6,
    nightlife: 5,
    familyFriendly: 8,
    affordability: 5,
    walkability: 7,
    dining: 8,
    safety: 9,
    culture: 9,
    outdoors: 7,
    shopping: 6,
    description: 'Charming historic district with boutique shops and fine dining',
    keyFeatures: ['Historic architecture', 'Boutique shopping', 'Fine dining', 'Art studios']
  }
];

interface NeighborhoodMatchesProps {
  preferences: UserPreferences;
}

export const NeighborhoodMatches = ({ preferences }: NeighborhoodMatchesProps) => {
  const matches = useMemo(() => {
    console.log('Calculating matches for preferences:', preferences);
    
    const scoredNeighborhoods = neighborhoodData.map(neighborhood => {
      let totalScore = 0;
      let weightSum = 0;
      
      Object.keys(preferences).forEach(key => {
        const prefKey = key as keyof UserPreferences;
        const userWeight = preferences[prefKey];
        const neighborhoodScore = neighborhood[prefKey];
        
        // Calculate weighted score (higher user preference = more weight)
        totalScore += (neighborhoodScore * userWeight);
        weightSum += userWeight;
      });
      
      const matchScore = Math.round((totalScore / weightSum) * 10);
      
      // Find top matching categories
      const categoryScores = Object.keys(preferences).map(key => {
        const prefKey = key as keyof UserPreferences;
        return {
          category: key,
          score: neighborhood[prefKey],
          importance: preferences[prefKey]
        };
      });
      
      const topCategories = categoryScores
        .filter(cat => cat.importance >= 7)
        .sort((a, b) => (b.score * b.importance) - (a.score * a.importance))
        .slice(0, 3)
        .map(cat => cat.category);
      
      return {
        ...neighborhood,
        matchScore,
        topCategories
      };
    });
    
    return scoredNeighborhoods.sort((a, b) => b.matchScore - a.matchScore);
  }, [preferences]);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      commute: 'Commute',
      nightlife: 'Nightlife',
      familyFriendly: 'Family-Friendly',
      affordability: 'Affordability',
      walkability: 'Walkability',
      dining: 'Dining',
      safety: 'Safety',
      culture: 'Culture',
      outdoors: 'Outdoors',
      shopping: 'Shopping'
    };
    return labels[category] || category;
  };

  const getMatchLevel = (score: number) => {
    if (score >= 8) return { label: 'Excellent Match', color: 'bg-green-500' };
    if (score >= 7) return { label: 'Great Match', color: 'bg-blue-500' };
    if (score >= 6) return { label: 'Good Match', color: 'bg-yellow-500' };
    return { label: 'Fair Match', color: 'bg-gray-500' };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Neighborhood Matches</h2>
        <p className="text-gray-600">
          Based on your lifestyle preferences, here are your best neighborhood matches
        </p>
      </div>

      <div className="grid gap-6">
        {matches.map((neighborhood, index) => {
          const matchLevel = getMatchLevel(neighborhood.matchScore);
          
          return (
            <Card key={neighborhood.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{neighborhood.name}</span>
                      {index === 0 && (
                        <Badge className="bg-gold-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Best Match
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {neighborhood.city}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {neighborhood.matchScore}/10
                    </div>
                    <Badge className={matchLevel.color}>
                      {matchLevel.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{neighborhood.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Top Matching Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.topCategories.map(category => (
                      <Badge key={category} variant="secondary">
                        {getCategoryLabel(category)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.keyFeatures.map(feature => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Detailed Scores</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(preferences).map(key => {
                      const prefKey = key as keyof UserPreferences;
                      const score = neighborhood[prefKey];
                      const importance = preferences[prefKey];
                      
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{getCategoryLabel(key)}</span>
                            <span className="font-semibold">{score}/10</span>
                          </div>
                          <Progress 
                            value={score * 10} 
                            className={`h-2 ${importance >= 7 ? 'border-2 border-blue-300' : ''}`}
                          />
                          {importance >= 7 && (
                            <div className="text-xs text-blue-600">High Priority</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

