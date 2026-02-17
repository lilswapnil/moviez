import { getGenreUrl } from '@/lib/utils/url';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';

type GenreType = 'movies' | 'shows' | 'animes' | 'cartoons';

interface GenreSectionProps {
  title: string;
  subtitle: string;
  genres: string[];
  type: GenreType;
}

export default function GenreSection({
  title,
  subtitle,
  genres,
  type,
}: GenreSectionProps) {
  return (
    <Section>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <span className="text-sm text-gray-400">{subtitle}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {genres.map((genre) => (
          <Button
            key={genre}
            href={getGenreUrl(type, genre)}
            variant="tile"
            size="md"
            className="px-4 py-3 justify-start"
          >
            {genre}
          </Button>
        ))}
      </div>
    </Section>
  );
}
