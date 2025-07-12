import * as React from "react";
import styled from "styled-components";

const lightsConfig = [
  {
    color: "red",
    duration: 3000,
  },
  {
    color: "yellow",
    duration: 4000,
  },
  {
    color: "green",
    duration: 1000,
  },
];

const TrafficLightsLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #222;
`;

interface LightProps {
  color: string;
  isOn: boolean;
}

const Bulb = styled.div<Omit<LightProps, "currentIndex">>`
  background-color: ${({ isOn, color }) => (isOn ? color : "lightgray")};
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-top: 1rem;
`;

const TimerText = styled.p`
  margin-top: 0.5rem;
  font-size: 14px;
`;

const Light: React.FC<LightProps> = (props: LightProps) => {
  const { color, isOn } = props;
  return <Bulb isOn={isOn} color={color} />;
};

export const TrafficLights: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [remainingTime, setRemainingTime] = React.useState(
    lightsConfig[currentIndex].duration
  );

//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       setRemainingTime((prev) => prev - 1000);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [currentIndex]);

  React.useEffect(() => {
    const { duration } = lightsConfig[currentIndex];

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % lightsConfig.length);
    //   setRemainingTime(duration);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <TrafficLightsLayout>
      <h1>Traffic Lights </h1>
      {lightsConfig.map((light, idx) => (
        <>
          <Light color={light.color} isOn={currentIndex === idx} />
          {/* {currentIndex === idx && (
            <TimerText> {Math.ceil(remainingTime / 1000)}s</TimerText>
          )} */}
        </>
      ))}
    </TrafficLightsLayout>
  );
};
