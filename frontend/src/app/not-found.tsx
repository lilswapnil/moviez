import Button from '@/components/common/Button';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button href="/" size="md">
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
