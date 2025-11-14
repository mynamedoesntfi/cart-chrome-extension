export type CartItem = {
  title: string;
  imageUrl: string;
  price: string;
  quantity: number;
  total: string;
  productUrl: string;
};

function getTextContent(element: Element | null): string {
  return element?.textContent?.trim() ?? "";
}

function getQuantity(element: Element | null): number {
  if (!element) {
    return 1;
  }
  const value =
    (element instanceof HTMLInputElement && element.value) ||
    (element instanceof HTMLSelectElement && element.value) ||
    element.getAttribute("value") ||
    element.textContent ||
    "";
  const parsed = parseInt(value.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function scrapeCart(): CartItem[] {
  const activeCartRoot =
    document.querySelector('[data-name="Active Items"]') ?? document;

  const itemNodes = activeCartRoot.querySelectorAll(
    '[data-asin][data-item-count], .sc-list-item'
  );

  const items: CartItem[] = [];

  itemNodes.forEach((node) => {
    const itemElement = node instanceof HTMLElement ? node : null;
    if (!itemElement) {
      return;
    }

    const title =
      getTextContent(
        itemElement.querySelector(
          ".sc-product-title, [data-test-id='list-item-title'], .a-truncate-cut"
        )
      ) ||
      getTextContent(
        itemElement.querySelector(
          "a.sc-product-link, [data-test-id='list-item-title'] a"
        )
      );

    if (!title) {
      return;
    }

    const link =
      (itemElement.querySelector(
        "a.sc-product-link, [data-test-id='list-item-title'] a"
      ) as HTMLAnchorElement | null)?.href ?? "";

    const imageUrl =
      (itemElement.querySelector(
        "img.sc-product-image, [data-test-id='list-item-image'] img"
      ) as HTMLImageElement | null)?.src ?? "";

    const price =
      getTextContent(
        itemElement.querySelector(
          ".sc-product-price, [data-test-id='list-item-price'], .sc-price"
        )
      ) || "";

    const quantity = getQuantity(
      itemElement.querySelector(
        ".sc-update-quantity-input, select[name$='quantity'], [data-test-id='list-item-quantity']"
      )
    );

    const total =
      getTextContent(
        itemElement.querySelector(
          "[data-test-id='list-item-price'] .a-color-price, .sc-product-price"
        )
      ) || price;

    items.push({
      title,
      imageUrl,
      price,
      quantity,
      total,
      productUrl: link,
    });
  });

  return items;
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
