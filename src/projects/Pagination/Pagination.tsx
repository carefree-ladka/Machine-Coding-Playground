import * as React from "react";
import "./Pagination.css";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts?";

function debounce<T extends (...args: never[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export const Pagination: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(5);
  const [cachedPosts, setCachedPosts] = React.useState<Record<string, Post[]>>(
    {}
  );
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = React.useState<number>(0);

  const TOTAL_PAGES = Math.ceil(totalPosts / pageLimit);

  const getCacheKey = (page: number, limit: number) => `${page}#${limit}`;

  const fetchPosts = async (currentPage: number, limit: number) => {
    try {
      const res = await fetch(
        `${BASE_URL}_page=${currentPage}&_limit=${limit}`
      );
      const totalPosts = Number(res.headers.get("X-Total-Count") ?? 0);

      if (res.ok) {
        setTotalPosts(totalPosts);
        return await res.json();
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      const key = getCacheKey(currentPage, pageLimit);
      if (cachedPosts[key]) {
        console.log("Cached....");
        setPosts(cachedPosts[key]);
        return;
      }

      setLoading(true);
      const data = await fetchPosts(currentPage, pageLimit);
      if (data) {
        setPosts(data);
        setCachedPosts((prev) => ({
          ...prev,
          [key]: data,
        }));
      }
      setLoading(false);
    };

    loadData();
  }, [currentPage, pageLimit]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = debounce(() => {
    setCurrentPage((prev) => Math.min(TOTAL_PAGES, prev + 1));
  }, 200);

  const handleCurrentPage = debounce((idx: number) => {
    setCurrentPage(idx);
  }, 200);

  const handlePerPageItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageLimit(+event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error || totalPosts === 0) return <p>Errored: {error}</p>;

  const startIndex = (currentPage - 1) * pageLimit + 1;
  const endIndex = Math.min(currentPage * pageLimit, totalPosts);
  const paginationText = `Showing ${startIndex} to ${endIndex} of ${totalPosts}`;

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <label htmlFor="limit">Posts per page:</label>
        <select
          id="limit"
          value={pageLimit}
          onChange={handlePerPageItems}
          className="limit-select"
        >
          {[5, 10, 15, 20].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>{post?.title}</li>
        ))}
      </ul>

      <div className="pagination-bar">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <div className="pagination-pages">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <span
              key={i + 1}
              onClick={() => handleCurrentPage(i + 1)}
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === TOTAL_PAGES}>
          Next
        </button>
      </div>
      <div className="pagination-summary">{paginationText}</div>
    </div>
  );
};
