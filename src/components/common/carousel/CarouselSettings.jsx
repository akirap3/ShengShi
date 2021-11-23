import styled from 'styled-components';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const RightArrow = ({ slideCount, currentSlide, ...props }) => {
  return <Right {...props} />;
};

const LeftArrow = ({ slideCount, currentSlide, ...props }) => {
  return <Left {...props} />;
};

const Left = styled(IoIosArrowDropleft)`
  fill: white;
`;
const Right = styled(IoIosArrowDropright)`
  fill: white;
`;

export const CarouselSettings = {
  className: 'slider variable-width',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};
