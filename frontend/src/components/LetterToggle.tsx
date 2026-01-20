import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import React, { FC } from 'react';

interface LetterToggleProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
}

export const LetterToggle: FC<LetterToggleProps> = ({ selectedLetter, onSelectLetter }) => (
  <ToggleGroup type="single" value={selectedLetter} onValueChange={onSelectLetter}>
    {'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => (
      <ToggleGroupItem key={letter} value={letter}>
        {letter.toUpperCase()}
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);