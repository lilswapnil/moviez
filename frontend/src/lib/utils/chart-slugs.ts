import { movieCharts, tvCharts, animeCharts, cartoonCharts } from '../constants/genres.const';

export const chartNames = [
  ...movieCharts,
  ...tvCharts,
  ...animeCharts,
  ...cartoonCharts,
];

export function chartNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const slugToName = new Map(chartNames.map((name) => [chartNameToSlug(name), name] as const));

export function getChartNameFromSlug(slug: string): string | undefined {
  return slugToName.get(slug);
}

export const chartSlugs = chartNames.map(chartNameToSlug);
