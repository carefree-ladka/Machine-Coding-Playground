import React, { useEffect, useMemo, useState } from "react";
import {
  CountryBadge,
  DataTableBody,
  DataTableContainer,
  DataTableHead,
  DataTableLayout,
  LoadingContainer,
  PageButton,
  PaginationControls,
  PaginationWrapper,
  PerPageSelect,
  TableWrapper,
} from "./DataTable.styles";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  country: string;
}

const getMockUsers = (limit = 100): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: limit }, (_, i) => ({
          id: i + 1,
          name: `User${i + 1}`,
          email: `User${i + 1}@gmail.com`,
          age: Math.floor(Math.random() * 50 + 18),
          country: ["India", "Germany", "USA", "Canada", "France"][i % 5],
        }))
      );
    }, 1000);
  });
};

const DataTableHelper: React.FC<{ users: User[] }> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    dir: "asc" | "desc";
    key: keyof User | null;
  }>({ dir: "asc", key: null });

  // Combined filtering and sorting
  const processedUsers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    // Filter users
    const filtered = users.filter((user) => {
      if (!normalizedSearch) return true;
      return Object.values(user).some((val) =>
        String(val).toLowerCase().includes(normalizedSearch)
      );
    });

    // Sort users
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key!];
        const bVal = b[sortConfig.key!];

        const compare =
          typeof aVal === "number" && typeof bVal === "number"
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal));

        return sortConfig.dir === "asc" ? compare : -compare;
      });
    }

    return filtered;
  }, [users, searchValue, sortConfig]);

  const totalPages = Math.ceil(processedUsers.length / perPage);
  const paginatedUsers = processedUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  const navigatePage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (!users.length) {
    return (
      <TableWrapper>
        <LoadingContainer>Loading users...</LoadingContainer>
      </TableWrapper>
    );
  }

  if (!processedUsers.length) {
    return (
      <TableWrapper>
        <LoadingContainer>No matching users found.</LoadingContainer>
      </TableWrapper>
    );
  }

  const renderSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.dir === "asc" ? " 🔼" : " 🔽";
  };

  return (
    <TableWrapper>
      <input
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search..."
        style={{
          margin: "1rem",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e1",
          borderRadius: "4px",
          fontSize: "0.875rem",
          width: "300px",
        }}
      />

      <DataTableContainer>
        <DataTableHead>
          <tr>
            {["id", "name", "email", "age", "country"].map((key) => (
              <th key={key} onClick={() => handleSort(key as keyof User)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {renderSortIcon(key as keyof User)}
              </th>
            ))}
          </tr>
        </DataTableHead>
        <DataTableBody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <CountryBadge country={user.country}>
                  {user.country}
                </CountryBadge>
              </td>
            </tr>
          ))}
        </DataTableBody>
      </DataTableContainer>

      <PaginationWrapper>
        <div>
          Show{" "}
          <PerPageSelect value={perPage} onChange={handlePerPageChange}>
            {[5, 10, 15, 20].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </PerPageSelect>{" "}
          entries
        </div>

        <PaginationControls>
          <PageButton onClick={() => navigatePage(currentPage - 1)}>
            Prev
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              active={currentPage === i + 1}
              onClick={() => navigatePage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => navigatePage(currentPage + 1)}>
            Next
          </PageButton>
        </PaginationControls>
      </PaginationWrapper>
    </TableWrapper>
  );
};

export const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMockUsers(100);
        if (!userData?.length) throw new Error("Network failed...");
        setUsers(userData);
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unknown error");
      }
    };

    loadData();
  }, []);

  return (
    <DataTableLayout>
      <DataTableHelper users={users} />
    </DataTableLayout>
  );
};
