export type FieldType =
  | "checkbox"
  | "select"
  | "input"
  | "number"
  | "text"
  | "email";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

export const formConfig: FormField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
  },
  {
    id: "subscribe",
    label: "Subscribe to Newsletter",
    type: "checkbox",
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: ["User", "Admin", "Moderator"],
  },
];
