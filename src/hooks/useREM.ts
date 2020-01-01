import { PixelRatio } from 'react-native';

export default function useREM(multiple) {
  return PixelRatio.getFontScale() * multiple;
}
