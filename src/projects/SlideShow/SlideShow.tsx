import * as React from "react";
import styled from "styled-components";

const images = [
  { src: "https://picsum.photos/id/600/600/400", alt: "Forest" },
  { src: "https://picsum.photos/id/100/600/400", alt: "Beach" },
  { src: "https://picsum.photos/id/200/600/400", alt: "Yak" },
  { src: "https://picsum.photos/id/300/600/400", alt: "Hay" },
  { src: "https://picsum.photos/id/400/600/400", alt: "Plants" },
  { src: "https://picsum.photos/id/500/600/400", alt: "Building" },
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
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  height: 400px;
  width: 600px;
  object-fit: cover;
  flex-shrink: 0;
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

const Dot = styled.span<{ active?: boolean }>`
  margin-right: 1rem;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#555" : "#ccc")};
  cursor: pointer;
`;

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { slides, autoPlay, loop, interval = 2000 } = props;
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const TOTAL_SLIDES = slides.length;

  const handleSlideNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    } else if (loop) {
      setCurrentSlide(0);
    }
  };

  const handleSlidePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
    } else if (loop) {
      setCurrentSlide(TOTAL_SLIDES);
    }
  };

  React.useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setTimeout(() => {
      handleSlideNext();
    }, interval);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, interval, autoPlay]);

  const handleSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const getNextSlides = () => {
    return [
      slides[currentSlide],
      slides[(currentSlide + 1) % TOTAL_SLIDES],
    ].map((slide) => <Image src={slide.src} alt={slide.alt} loading="lazy" />);
  };

  return (
    <CarouselLayout>
      <SlideContainer>
        <SlidesWrapper style={{ transform: `translateX(-${0}px)` }}>
          {getNextSlides()}
        </SlidesWrapper>
        <SlideShowButtonsLayout>
          <SlideShowPrevButton onClick={handleSlidePrev}>❮</SlideShowPrevButton>
          <SlideShowNextButton onClick={handleSlideNext}>❯</SlideShowNextButton>
        </SlideShowButtonsLayout>
      </SlideContainer>

      <DotContainer>
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
          <Dot
            key={i}
            active={i === currentSlide}
            onClick={() => handleSlide(i)}
          />
        ))}
      </DotContainer>
    </CarouselLayout>
  );
};

export const SlideShow: React.FC = () => {
  return <Carousel slides={images} loop />;
};


