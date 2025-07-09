import * as React from "react";
import styled from "styled-components";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

interface Slide {
  src: string;
  alt: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  loop?: boolean;
  interval?: number;
}

const CarouselLayout = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const SlideContainer = styled.div`
  position: relative;
  height: 400px;
  width: 600px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const SlideShowButtonsLayout = styled.div``;

const SlideShowNextButton = styled.button`
  padding: 5px 8px;
  position: absolute;
  border: none;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
`;

const SlideShowPrevButton = styled.button`
  padding: 5px 8px;
  position: absolute;
  border: none;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
`;

const DotContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const Dot = styled.span`
  margin-right: 1rem;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #222;
  z-index: 2;
  cursor: pointer;
`;

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { slides, autoPlay, loop, interval = 200 } = props;
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const TOTAL_SLIDES = slides.length - 1;

  React.useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        handleSlideNext();
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSlideNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide((prev) => prev + 1);
    } else if (loop) {
      setCurrentSlide(0);
    }
  };

  const handleSlidePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else if (loop) {
      setCurrentSlide(TOTAL_SLIDES);
    }
  };

  const handleSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  return (
    <CarouselLayout>
      <SlideContainer>
        <Image
          src={slides[currentSlide].src}
          alt={slides[currentSlide].alt ?? "slide"}
        />

        <SlideShowButtonsLayout>
          <SlideShowPrevButton onClick={handleSlidePrev}>❮</SlideShowPrevButton>
          <SlideShowNextButton onClick={handleSlideNext}>❯</SlideShowNextButton>
        </SlideShowButtonsLayout>
      </SlideContainer>

      <DotContainer>
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
          <Dot onClick={() => handleSlide(i + 1)} />
        ))}
      </DotContainer>
    </CarouselLayout>
  );
};

export const SlideShow: React.FC = () => {
  return <Carousel slides={images} interval={200} />;
};

/*
prev [] next
dots 1 2 3 4 5
*/
