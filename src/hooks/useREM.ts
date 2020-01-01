import { PixelRatio } from 'react-native';

export default function useREM(multiple: number): string | number {
  return PixelRatio.getFontScale() * multiple;
}
