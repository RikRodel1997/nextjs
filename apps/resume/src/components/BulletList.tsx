import type { ReactNode } from "react";

interface BulletListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
}

export const BulletList = <T,>({ items, renderItem, keyExtractor }: BulletListProps<T>) => (
  <ul>
    {items.map((item, index) => (
      <li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
    ))}
  </ul>
);
