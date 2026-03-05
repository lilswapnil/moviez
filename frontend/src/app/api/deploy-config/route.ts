/**
 * Diagnostic endpoint: check if API is configured for Vercel deployment.
 * Visit /api/deploy-config on your Vercel app to verify.
 */
export async function GET() {
  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const onVercel = !!process.env.VERCEL;
  const configured = !!backend && !backend.includes('localhost');

  return Response.json({
    onVercel,
    configured,
    backendSet: !!backend,
    backendIsLocalhost: backend.includes('localhost'),
    hint: onVercel
      ? configured
        ? null
        : 'Set BACKEND_URL in Vercel → Project Settings → Environment Variables to your deployed backend URL (e.g. https://your-app.railway.app)'
      : null,
  });
}
