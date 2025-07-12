import styled from "styled-components";

export const DataTableLayout = styled.div`
  padding: 1rem;
  background: #f8fafc;
`;

export const TableWrapper = styled.div`
  background: white;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  overflow: auto;
`;

export const DataTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const DataTableHead = styled.thead`
  background: #f1f5f9;

  th {
    padding: 0.5rem 0.75rem;
    text-align: left;
    font-weight: 700;
    color: #334155;
    font-size: 1rem;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
  }
`;

export const DataTableBody = styled.tbody`
  tr {
    transition: background-color 0.2s ease;

    &:hover {
      background: #f9fafb;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f1f5f9;
    }
  }

  td {
    padding: 0.5rem 0.75rem;
    color: #475569;
    white-space: nowrap;

    &:first-child {
      font-weight: 500;
      color: #1e293b;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #64748b;
`;

export const CountryBadge = styled.span<{ country: string }>`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;

  ${({ country }) => {
    const colors = {
      India: "background: #dbeafe; color: #1e40af;",
      Germany: "background: #dcfce7; color: #166534;",
      USA: "background: #fef3c7; color: #92400e;",
      Canada: "background: #fce7f3; color: #be185d;",
      France: "background: #f3e8ff; color: #7c3aed;",
    };
    return (
      colors[country as keyof typeof colors] ||
      "background: #f3f4f6; color: #374151;"
    );
  }}
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PerPageSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #374151;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#3b82f6" : "white")};
  color: ${({ active }) => (active ? "white" : "#1f2937")};
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "#2563eb" : "#f3f4f6")};
  }
`;
