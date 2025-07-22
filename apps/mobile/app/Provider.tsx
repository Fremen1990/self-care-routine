// apps/mobile/app/Provider.tsx
import React from 'react';
import { View } from 'react-native';

export function Provider({ children }: { children: React.ReactNode }) {

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {children}
    </View>
  );
}
