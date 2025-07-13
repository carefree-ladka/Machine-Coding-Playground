import React from "react";
import styled from "styled-components";
import { formConfig, type FormField } from "./formConfig";

const FormWrapper = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
`;

export const FormBuilder: React.FC = () => {
  const [formState, setFormState] = React.useState<Record<string, unknown>>({});

  const handleFormChange = (id: string, value: string | number | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("formState", formState);
  };

  const renderField = (field: FormField) => {
    const value =
      formState[field.id] ?? (field.type === "checkbox" ? false : "");

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            id={field.id}
            name={field.id}
            value={value as string | number}
            required={field.required}
            type={field.type}
            onChange={(e) => handleFormChange(field.id, e.target.value)}
          />
        );
      case "checkbox":
        return (
          <Input
            id={field.id}
            name={field.id}
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => handleFormChange(field.id, e.target.checked)}
          />
        );
      case "select":
        return (
          <Select
            id={field.id}
            name={field.id}
            value={value as string}
            onChange={(e) => handleFormChange(field.id, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <div key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </FormWrapper>
  );
};
