import { Level, Row } from "../types/Level";

export function addTotalsColumn(levels: Level[]): Row[] {
  let total: number;
  let newArr: Row[] = [];

  levels.forEach((level, idx) => {
    const { size } = level;
    total = idx !== 0 ? (total += size) : size;

    const newLevel: Row = { ...level, total };

    newArr.push(newLevel);
  });

  return newArr;
}

export function addCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const convertToObj = (tuple: [number, number]) => {
  return {
    price: tuple[0],
    size: tuple[1],
  };
};

export function getUpdatedLevels(
  current: Level[],
  incoming: [number, number][] = []
): Level[] {
  if (incoming.length === 0) return current;

  const map: Map<number, Level> = new Map();

  current.forEach((level) => {
    map.set(level.price, level);
  });

  incoming.forEach((level) => {
    const [price, size] = level;

    if (size === 0) {
      map.delete(price);
    } else {
      map.set(price, { price, size });
    }
  });

  return [...map.values()];
}
