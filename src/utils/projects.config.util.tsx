import type { JSX } from "react";
import { Home } from "../pages";
import {
  Accordion,
  DataTable,
  FileExplorer,
  KanbanBoard,
  Pagination,
  ProgressBar,
  SlideShow,
  StarRating,
  TicTacToe,
  Toast,
  TrafficLights,
} from "../projects";
import { FormBuilder } from "../projects/FormBuilder";

interface Project {
  path: string;
  title?: string;
  description?: string;
  element?: JSX.Element;
}

export const projectsConfig: Project[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/infinite-scroller",
    title: "Infinite Scroller",
    description: "Infinite scroll / Load more",
  },
  {
    path: "/pagination",
    title: "Pagination",
    description: "Pagination",
    element: <Pagination />,
  },
  {
    path: "/carousel",
    title: "Carousel",
    description: "Carousel",
    element: <SlideShow />,
  },
  {
    path: "/progress-bar",
    title: "Progress Bar",
    description: "Progress Bar",
    element: <ProgressBar />,
  },
  {
    path: "/accordion",
    title: "Accordion",
    description: "Accordion",
    element: <Accordion />,
  },
  {
    path: "/star-rating",
    title: "Star Rating",
    description: "Star Rating",
    element: <StarRating />,
  },
  {
    path: "/data-table",
    title: "Data Table",
    description: "Data Table",
    element: <DataTable />,
  },
  {
    path: "/traffic-light",
    title: "Traffic Light",
    description: "Traffic Light",
    element: <TrafficLights />,
  },
  {
    path: "/tictactoe",
    title: "Tic Tac Toe",
    description: "Tic Tac Toe",
    element: <TicTacToe />,
  },
  {
    path: "/autocomplete",
    title: "AutoComplete / Typeahead",
    description: "AutoComplete / Typeahead",
  },
  {
    path: "/todo-list",
    title: "Todo List",
    description: "Todo List",
  },
  {
    path: "/toast",
    title: "Toast / Notification System",
    description: "Toast / Notification System",
    element: <Toast />,
  },
  {
    path: "/fileExplorer",
    title: "File Explorer",
    description: "File Explorer",
    element: <FileExplorer />,
  },
  {
    path: "/formBuilder",
    title: "Form Builder",
    description: "Form Builder",
    element: <FormBuilder />,
  },
  {
    path: "/kanban-board",
    title: "Kanban Board",
    description: "Kanban Board",
    element: <KanbanBoard />,
  },
  //add more...
];
