import * as React from "react";
import styled from "styled-components";

const faqAccordionData = [
  {
    id: "faq-1",
    question: "What is your return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quaerat iure iusto asperiores dolorem distinctio eaque sed rerum porro sunt, labore, ullam quis, non eum! Omnis praesentium facere ipsam officiis? ",
  },
  {
    id: "faq-2",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide with an additional shipping fee. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quaerat iure iusto asperiores dolorem distinctio eaque sed rerum porro sunt, labore, ullam quis, non eum! Omnis praesentium facere ipsam officiis? ",
  },
  {
    id: "faq-3",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we will send you an email with tracking information.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quaerat iure iusto asperiores dolorem distinctio eaque sed rerum porro sunt, labore, ullam quis, non eum! Omnis praesentium facere ipsam officiis?  ",
  },
];

interface Accordion {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  accordions: Accordion[];
}

const AccordionLayout = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const AccordionContainer = styled.div`
  margin-top: 1rem;
`;

const AccordionHeader = styled.div`
  border: 1px solid #999;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
`;

const AccordionTitle = styled.div``;
const AccordionTitleIcon = styled.span``;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  border: 1px solid #999;
  padding: ${({ isOpen }) => (isOpen ? "1rem" : "0 1rem")};
  border-radius: 4px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
`;

const AccordionHelper: React.FC<AccordionProps> = (props: AccordionProps) => {
  const { accordions } = props;
  //   const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(new Set());

  const handleAccordion = (event: React.MouseEvent<HTMLDivElement>) => {
    // setCurrentIndex((prev) => (prev === idx ? null : idx));
    // setOpenIndices((prev) =>
    //   prev.includes(idx) ? prev.filter((id) => id !== idx) : [...prev, idx]
    // );

    const accordionIdx = (event.target as HTMLElement)
      ?.closest(".accordion-item")
      ?.getAttribute("data-accordion");

    const idx = Number(accordionIdx);

    setOpenIndices((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  return (
    <AccordionLayout onClick={handleAccordion}>
      {accordions.map((accordion, idx) => (
        <AccordionContainer
          key={idx}
          data-accordion={idx}
          className="accordion-item"
        >
          <AccordionHeader role="button" aria-label="accordion button">
            <AccordionTitle>{accordion.question}</AccordionTitle>
            <AccordionTitleIcon>
              {openIndices.has(idx) ? "▼" : "▲"}
            </AccordionTitleIcon>
          </AccordionHeader>

          <AccordionContent isOpen={openIndices.has(idx)}>
            {accordion.answer}
          </AccordionContent>
        </AccordionContainer>
      ))}
    </AccordionLayout>
  );
};

export const Accordion = () => {
  return <AccordionHelper accordions={faqAccordionData} />;
};
