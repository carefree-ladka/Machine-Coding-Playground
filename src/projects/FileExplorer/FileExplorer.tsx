import * as React from "react";
import styled from "styled-components";

interface FileNode {
  id: string;
  type: "file" | "folder";
  name: string;
  children?: FileNode[];
}

interface FileExplorerHelperProps {
  mocks: FileNode[];
  level?: number;
}

const mockFileTree: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "components",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "Header.tsx",
            type: "file",
          },
          {
            id: "1-1-2",
            name: "Sidebar.tsx",
            type: "file",
          },
        ],
      },
      {
        id: "1-2",
        name: "App.tsx",
        type: "file",
      },
      {
        id: "1-3",
        name: "index.tsx",
        type: "file",
      },
    ],
  },
  {
    id: "2",
    name: "public",
    type: "folder",
    children: [
      {
        id: "2-1",
        name: "index.html",
        type: "file",
      },
    ],
  },
  {
    id: "3",
    name: "package.json",
    type: "file",
  },
  {
    id: "4",
    name: "tsconfig.json",
    type: "file",
  },
];

const FileExplorerHelperContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const NodeWrapper = styled.div<{ level: number }>`
  margin-left: ${({ level }) => level * 16}px;
  cursor: pointer;
  user-select: none;
`;

const FileExplorerHelper: React.FC<FileExplorerHelperProps> = ({
  mocks,
  level = 0,
}) => {
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>(
    {}
  );

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      {mocks.map((item) => {
        const isOpen = openFolders[item.id];

        if (item.type === "folder") {
          return (
            <div key={item.id}>
              <NodeWrapper level={level} onClick={() => toggleFolder(item.id)}>
                {isOpen ? "📂" : "📁"} {item.name}
              </NodeWrapper>
              {isOpen && item.children && (
                <FileExplorerHelper mocks={item.children} level={level + 1} />
              )}
            </div>
          );
        }

        return (
          <NodeWrapper level={level} key={item.id}>
            📄 {item.name}
          </NodeWrapper>
        );
      })}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  return (
    <FileExplorerHelperContainer>
      <FileExplorerHelper mocks={mockFileTree} />
    </FileExplorerHelperContainer>
  );
};
