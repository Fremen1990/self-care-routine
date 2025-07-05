import React from 'react';
import { Card, CardContent } from '@repo/ui/components/ui/card';

interface RoutineTipCardProps {
  tip: {
    icon: string;
    title: string;
    description: string;
  };
}

export function RoutineTipCard({ tip }: RoutineTipCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <span className="text-2xl">{tip.icon}</span>
          <div>
            <h4 className="font-semibold text-sm">{tip.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
