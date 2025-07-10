import * as React from "react";
import styled from "styled-components";

interface BarProps {
  color: string;
  percetange: number;
  defaultBackground: string;
}

const ProgressBarLayout = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;
  align-items: center;
`;

const BarContainer = styled.div<{ defaultBackground: string }>`
  position: relative;
  width: 600px;
  height: 34px;
  border-radius: 4px;
  background-color: ${(props) => props.defaultBackground};
  margin-top: 2rem;
`;

const BarProgress = styled.div<{ color: string; percetange: number }>`
  position: absolute;
  background-color: ${(props) => props.color};
  width: ${(props) => `${props.percetange}%`};
  height: 34px;
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const { color, percetange, defaultBackground } = props;

  return (
    <BarContainer defaultBackground={defaultBackground}>
      {percetange > 0 && (
        <BarProgress color={color} percetange={percetange}>
          {percetange}%
        </BarProgress>
      )}
    </BarContainer>
  );
};

export const ProgressBar: React.FC = () => {
  const [p1, setP1] = React.useState(0);

  React.useEffect(() => {
    const interval = setTimeout(() => {
      setP1((prev) => (prev < 100 ? prev + 2 : 100));
    }, 1000);

    return () => clearTimeout(interval);
  }, [p1]);

  return (
    <ProgressBarLayout>
      <Bar color={"red"} percetange={p1} defaultBackground={"grey"} />
    </ProgressBarLayout>
  );
};
