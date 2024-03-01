import { type NextRequest } from 'next/server';

export default function getQueries(request: NextRequest) {
  const query_entries = request.nextUrl.searchParams.entries();
  const output: { [key: string]: string } = {};
  for (const [key, val] of query_entries) {
    output[key] = val;
  }
  return output;
}
