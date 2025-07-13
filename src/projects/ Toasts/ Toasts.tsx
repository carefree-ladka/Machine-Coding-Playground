import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

type Toast = "success" | "info" | "error" | "warning";
type STATUS_VARIANT = "SUCCESS" | "INFO" | "ERROR" | "WARNING";

const TOAST_VARIANT: Record<STATUS_VARIANT, Toast> = {
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
};

type ToastIcon = "✅" | "ℹ️" | "❌" | "⚠️";

const TOAST_ICON_VARIANT: Record<STATUS_VARIANT, ToastIcon> = {
  SUCCESS: "✅",
  INFO: "ℹ️",
  ERROR: "❌",
  WARNING: "⚠️",
};
interface ToastProps {
  type: Toast;
  icon: ToastIcon;
  duration?: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const ToastBox = styled.div<{ type: Toast; isHiding: boolean }>`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  animation: ${({ isHiding }) => (isHiding ? fadeOut : fadeIn)} 0.4s ease-out;
  transition: opacity 0.3s ease;
  background-color: ${({ type }) =>
    type === TOAST_VARIANT.SUCCESS
      ? "#28a745"
      : type === TOAST_VARIANT.INFO
      ? "#17a2b8"
      : type === TOAST_VARIANT.WARNING
      ? "#ffc107"
      : "#dc3545"};
`;

const ToastHelper: React.FC<ToastProps> = (props: ToastProps) => {
  const { type, icon, duration = 3000 } = props;

  const [visible, setVisible] = React.useState(true);
  const [isHiding, setIsHiding] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => setVisible(false), 400);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <ToastBox type={type} isHiding={isHiding}>
      {icon} This is a {type} toast
    </ToastBox>
  );
};

export const Toast: React.FC = () => {
  const toast = document.getElementById("toast") as HTMLElement;
  return ReactDOM.createPortal(
    <>
      <ToastHelper
        type={TOAST_VARIANT.SUCCESS}
        icon={TOAST_ICON_VARIANT.SUCCESS}
      />
      {/* <ToastHelper type={TOAST_VARIANT.ERROR} icon={TOAST_ICON_VARIANT.ERROR} />
      <ToastHelper type={TOAST_VARIANT.INFO} icon={TOAST_ICON_VARIANT.INFO} />
      <ToastHelper
        type={TOAST_VARIANT.WARNING}
        icon={TOAST_ICON_VARIANT.WARNING}
      /> */}
    </>,
    toast
  );
};
