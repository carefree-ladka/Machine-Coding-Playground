import * as React from "react";
import styled from "styled-components";

interface StarProps {
  totalCount?: number;
  size?: number;
  color?: string;
  readOnly?: boolean;
  handleChange: (rating: number) => void;
}

const StarRatingLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const StarLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;
`;

const Star = styled.span<
  Omit<StarProps, "totalCount" | "handleChange"> & { filled: boolean }
>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  color: ${(props) => (props.filled ? props.color : "lightgray")};
  cursor: ${(props) => (props.readOnly ? "default" : "pointer")};
  font-size: ${(props) => `${props.size}px`};
  transition: color 0.2s ease-in-out;
  user-select: none;
`;

const StarHelper: React.FC<StarProps> = ({
  totalCount = 5,
  size = 24,
  color = "lightgray",
  readOnly = false,
  handleChange,
}) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const handleStarClick = (starValue: number) => {
    if (readOnly) return;
    setRating(starValue);
    handleChange(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    if (readOnly) return;
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(null);
  };

  return (
    <StarLayout>
      {Array.from({ length: totalCount }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= (hoverRating ?? rating);
        return (
          <Star
            key={starValue}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            filled={filled}
            color={color}
            size={size}
            readOnly={readOnly}
            role={readOnly ? "presentation" : "button"}
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            ★
          </Star>
        );
      })}
    </StarLayout>
  );
};

export const StarRating: React.FC = () => {
  return (
    <StarRatingLayout>
      <StarHelper
        totalCount={5}
        size={32}
        color="gold"
        handleChange={(rating) => console.log("Selected Rating:", rating)}
      />

      <StarHelper
        totalCount={3}
        size={32}
        color="gold"
        readOnly
        handleChange={() => {}}
      />
    </StarRatingLayout>
  );
};
