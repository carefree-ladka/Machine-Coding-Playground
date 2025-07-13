import React, { useState } from "react";
import styled from "styled-components";

interface Task {
  id: string;
  title: string;
}

type ColumnType = "todo" | "inProgress" | "done";

const initialTasks: Record<ColumnType, Task[]> = {
  todo: [
    { id: "1", title: "Set up project" },
    { id: "2", title: "Design UI" },
  ],
  inProgress: [{ id: "3", title: "Build Kanban Board" }],
  done: [{ id: "4", title: "Push to GitHub" }],
};

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 2rem;
`;

const Column = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  width: 250px;
  min-height: 400px;
`;

const ColumnTitle = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`;

const TaskCard = styled.div`
  padding: 12px 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: grab;
  user-select: none;
`;

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState<{
    fromColumn: ColumnType;
    task: Task;
  } | null>(null);

  const handleDragStart = (fromColumn: ColumnType, task: Task) => {
    setDraggedTask({ fromColumn, task });
  };

  const handleDrop = (toColumn: ColumnType) => {
    if (!draggedTask) return;
    const { fromColumn, task } = draggedTask;

    if (fromColumn === toColumn) return;

    // Remove from old column
    const newSource = tasks[fromColumn].filter((t) => t.id !== task.id);

    // Add to new column
    const newDestination = [...tasks[toColumn], task];

    setTasks({
      ...tasks,
      [fromColumn]: newSource,
      [toColumn]: newDestination,
    });

    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required to allow drop
  };

  const columnTitles: Record<ColumnType, string> = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  };

  return (
    <BoardWrapper>
      {(Object.keys(tasks) as ColumnType[]).map((columnKey) => (
        <Column
          key={columnKey}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(columnKey)}
        >
          <ColumnTitle>{columnTitles[columnKey]}</ColumnTitle>
          {tasks[columnKey].map((task) => (
            <TaskCard
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(columnKey, task)}
            >
              {task.title}
            </TaskCard>
          ))}
        </Column>
      ))}
    </BoardWrapper>
  );
};
