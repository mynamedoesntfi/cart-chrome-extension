export type CartItem = {
  title: string;
  imageUrl: string;
  price: string;
  quantity: number;
  total: string;
  productUrl: string;
};

export function scrapeCart(): CartItem[] {
  // TODO: Implement DOM parsing for Amazon cart items.
  return [];
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "SCRAPE_CART") {
    try {
      const items = scrapeCart();
      sendResponse({ items });
    } catch (error) {
      sendResponse({ error: (error as Error).message ?? "Unknown error" });
    }
  }
  return true;
});
