import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

type ExchangeRate = {
  rate: number;
  timestamp: number;
};

let cachedRate: ExchangeRate | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export async function GET() {
  try {
    // Check if we have a valid cached rate
    const now = Date.now();
    if (cachedRate && (now - cachedRate.timestamp) < CACHE_DURATION) {
      return NextResponse.json({ rate: cachedRate.rate });
    }

    // Fetch fresh rate from Central Bank of Russia
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_utf8.xml', {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes at the platform level
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const xmlData = await response.text();
    const result = await parseStringPromise(xmlData);
    
    // Find USD rate in the XML response
    const valutes = result.ValCurs?.Valute || [];
    const usdValute = valutes.find((valute: { CharCode?: string[] }) => valute.CharCode?.[0] === 'USD');
    
    if (!usdValute) {
      throw new Error('USD rate not found in the response');
    }

    // Parse the rate (CBR provides rate for 1 USD in RUB, e.g., 1 USD = 92.50 RUB)
    const rate = parseFloat(usdValute.Value?.[0].replace(',', '.')) || 0;
    const nominal = parseFloat(usdValute.Nominal?.[0]) || 1;
    const actualRate = rate / nominal;

    // Cache the result
    cachedRate = {
      rate: actualRate,
      timestamp: now
    };

    return NextResponse.json({ rate: actualRate });
  } catch (error) {
    console.error('Error fetching USD rate:', error);
    // Return cached rate if available, otherwise return 0
    return NextResponse.json(
      { rate: cachedRate?.rate || 0 },
      { status: cachedRate ? 200 : 500 }
    );
  }
}

// Configure caching behavior
export const dynamic = 'force-dynamic'; // Ensure we always get fresh data
export const revalidate = 1800; // Revalidate every 30 minutes
