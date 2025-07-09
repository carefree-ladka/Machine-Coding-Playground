import * as React from "react";
import "./InfiniteScroller.css";

interface PageItem {
  id: number;
  item: string;
}

const LIMIT = 200;

const mockDataGenerator = (): PageItem[] => {
  return Array.from({ length: LIMIT }, (_, i) => ({
    id: i + 1,
    item: `Item text ${i + 1}`,
  }));
};

const getMockData = (
  currentPage: number,
  perPage: number
): Promise<PageItem[]> => {
  const data = mockDataGenerator();
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.slice(start, end));
    }, 1000);
  });
};

export function InfiniteScroller() {
  const [items, setItems] = React.useState<PageItem[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const PER_PAGE = 10;

  React.useEffect(() => {
    getMockData(currentPage, PER_PAGE).then((data) => {
      setItems((prev) => [...prev, ...data]);
      setHasMore(data.length === PER_PAGE);
    });
  }, [currentPage]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="infinite-scroll-container">
      <h2 className="infinite-scroll-header">Infinite Scroll Demo</h2>
      <ul className="infinite-scroll-list">
        {items.map((item) => (
          <li key={item.id} className="infinite-scroll-item">
            <span className="infinite-scroll-item-text">{item.item}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={loaderRef} className="infinite-scroll-loader">
          <p className="infinite-scroll-loader-text">
            <span className="loading-spinner"></span>
            Loading more items...
          </p>
        </div>
      )}

      {!hasMore && (
        <div className="infinite-scroll-end">
          <p className="infinite-scroll-end-text">
            🎉 You've reached the end! No more items to load.
          </p>
        </div>
      )}
    </div>
  );
}
