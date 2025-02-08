export async function fetchCurrencyRate(
  from: string,
  to: string,
  amount: number
): Promise<CurrencyResponse> {
  try {
    const response = await fetch('https://api.i-as.dev/api/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, amount })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Validasi response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format');
    }

    if (!data.from || !data.to || !data.amount || !data.rate || !data.date) {
      throw new Error('Missing required fields in response');
    }

    // Konversi amount dan rate ke number jika string
    const validatedData = {
      ...data,
      amount: typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount,
      rate: typeof data.rate === 'string' ? parseFloat(data.rate) : data.rate
    };

    // Validasi final untuk memastikan amount dan rate adalah number yang valid
    if (isNaN(validatedData.amount) || isNaN(validatedData.rate)) {
      throw new Error('Invalid numeric values in response');
    }

    return validatedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Currency conversion failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
} 