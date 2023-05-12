export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    error.info = await res.json();
    throw error;
  }

  return res.json();
};
