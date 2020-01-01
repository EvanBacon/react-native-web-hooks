import useDimensions from './useDimensions';

export default function useScaledSize(multiple: number): number {
  const {
    window: { width },
  } = useDimensions();
  let size = 16;

  if (width >= 1408) size = 24;
  else if (width >= 1216) size = 22;
  else if (width >= 1024) size = 20;
  else if (width >= 768) size = 18;

  return size * multiple;
}
