export interface ProductSizeRow {
  ar: string;
  us: string;
  stock: number;
  enabled: boolean;
}

type SizeGroup = 'apparel' | 'gloves' | 'footwear' | 'universal';
type SizeOption = Pick<ProductSizeRow, 'ar' | 'us'> & { group: SizeGroup };

const SIZE_OPTIONS: SizeOption[] = [
  { ar: 'S', us: 'S', group: 'apparel' },
  { ar: 'M', us: 'M', group: 'apparel' },
  { ar: 'L', us: 'L', group: 'apparel' },
  { ar: 'XL', us: 'XL', group: 'apparel' },
  ...Array.from({ length: 12 }, (_, index) => {
    const size = String(index + 1);
    return { ar: size, us: size, group: 'gloves' as const };
  }),
  { ar: '31', us: '13Y', group: 'footwear' },
  { ar: '31.5', us: '13.5Y', group: 'footwear' },
  { ar: '32', us: '1Y', group: 'footwear' },
  { ar: '32.5', us: '1.5Y', group: 'footwear' },
  { ar: '33', us: '2Y', group: 'footwear' },
  { ar: '33.5', us: '2.5Y', group: 'footwear' },
  { ar: '34', us: '3Y', group: 'footwear' },
  { ar: '34.5', us: '3.5Y', group: 'footwear' },
  { ar: '35', us: '4Y', group: 'footwear' },
  { ar: '35.5', us: '4.5Y', group: 'footwear' },
  { ar: '36', us: '5Y', group: 'footwear' },
  { ar: '36.5', us: '5.5Y', group: 'footwear' },
  { ar: '37', us: '6Y', group: 'footwear' },
  { ar: '37.5', us: '6.5Y', group: 'footwear' },
  { ar: '38', us: '6.5', group: 'footwear' },
  { ar: '38.5', us: '7', group: 'footwear' },
  { ar: '39', us: '7.5', group: 'footwear' },
  { ar: '39.5', us: '8', group: 'footwear' },
  { ar: '40', us: '8', group: 'footwear' },
  { ar: '40.5', us: '8.5', group: 'footwear' },
  { ar: '41', us: '8.5', group: 'footwear' },
  { ar: '41.5', us: '9', group: 'footwear' },
  { ar: '42', us: '9.5', group: 'footwear' },
  { ar: '42.5', us: '10', group: 'footwear' },
  { ar: '43', us: '10', group: 'footwear' },
  { ar: '43.5', us: '10.5', group: 'footwear' },
  { ar: '44', us: '11', group: 'footwear' },
  { ar: '44.5', us: '11.5', group: 'footwear' },
  { ar: 'Único', us: 'U', group: 'universal' }
];

export function createProductSizeMatrix(): ProductSizeRow[] {
  return SIZE_OPTIONS.map(({ ar, us }) => ({
    ar,
    us,
    stock: 0,
    enabled: false
  }));
}

export function getAvailableProductSizes(
  matrix: ProductSizeRow[],
  category: string,
  productName: string,
  existingSizes: string[] = []
): ProductSizeRow[] {
  const normalizedCategory = category.toLowerCase();
  const normalizedName = productName.toLowerCase();
  const existingSizeCodes = existingSizes.map((size) => size.trim().split(/\s+/)[0]);
  const hasGloveSizes = existingSizeCodes.some((size) => {
    const numericSize = Number(size);
    return Number.isInteger(numericSize) && numericSize >= 1 && numericSize <= 12;
  });

  let group: SizeGroup;
  if (normalizedCategory.includes('indumentaria')) {
    group = 'apparel';
  } else if (normalizedCategory.includes('botines') || normalizedCategory.includes('zapatillas')) {
    group = 'footwear';
  } else if (
    normalizedCategory.includes('guante') ||
    normalizedName.includes('guante') ||
    hasGloveSizes
  ) {
    group = 'gloves';
  } else {
    group = 'universal';
  }

  return matrix.filter((row) =>
    SIZE_OPTIONS.some((option) => option.group === group && option.ar === row.ar)
  );
}

export function parseProductVariantSize(
  variantSize: string,
  matrix: ProductSizeRow[]
): ProductSizeRow | undefined {
  const sizeCode = variantSize.trim().split(/\s+/)[0];
  return matrix.find((row) => row.ar === sizeCode);
}

export function serializeProductVariantSize(row: ProductSizeRow): string {
  if (row.ar === 'Único' || ['S', 'M', 'L', 'XL'].includes(row.ar)) {
    return row.ar;
  }
  return `${row.ar} AR (${row.us} US)`;
}
