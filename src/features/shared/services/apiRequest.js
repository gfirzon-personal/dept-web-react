function getErrorMessage(payload, fallbackMessage) {
  if (!payload) {
    return fallbackMessage;
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (typeof payload === 'object') {
    if (typeof payload.message === 'string' && payload.message.trim()) {
      return payload.message;
    }

    if (typeof payload.error === 'string' && payload.error.trim()) {
      return payload.error;
    }
  }

  return fallbackMessage;
}

async function readPayload(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

export async function apiRequest(url, options = {}) {
  const { headers: optionHeaders = {}, ...fetchOptions } = options;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...optionHeaders,
    },
  });

  const payload = await readPayload(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, `Request failed with status ${response.status}.`));
  }

  return payload;
}