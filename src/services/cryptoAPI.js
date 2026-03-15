const API_KEY = 'CG-qGTVkcp7DGtJx9svMkiF4KtM';

export const getBitcoinPrice = async () => {
  const options = {
    method: 'GET',
    headers: {
      'x-cg-demo-api-key': API_KEY
    }
  };

  // USD aur INR dono mangwa rahe hain
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr',
    options
  );
  const data = await response.json();
  return data;
};