import styled from 'styled-components';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const Carousel = ({ title, contentData, isRestaurants }) => {
  const currentUser = useCurrentUser();

  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    contentData && (
      <CarouselContainer>
        <Title>{title}</Title>
        <CarouselContext>
          <SlideWrapper>
            <StyledSlider {...settings}>
              {contentData.map((content) => {
                return (
                  <Card key={content.id}>
                    <CardImg src={content.imageUrl} />
                    <CardTitle>{content.name}</CardTitle>
                    <Row>
                      {Array.from(Array(content.rating).keys()).map(() => (
                        <Star key={uuidv4()} />
                      ))}
                      <Heart
                        onClick={
                          currentUser
                            ? isRestaurants
                              ? () =>
                                  handleCollection(
                                    content,
                                    'restaurants',
                                    currentUser
                                  )
                              : () =>
                                  handleCollection(
                                    content,
                                    'shares',
                                    currentUser
                                  )
                            : () => {}
                        }
                        like={
                          currentUser
                            ? content?.savedUserId?.includes(currentUser.uid)
                              ? 'red'
                              : 'black'
                            : 'black'
                        }
                      />
                    </Row>
                  </Card>
                );
              })}
            </StyledSlider>
          </SlideWrapper>
        </CarouselContext>
      </CarouselContainer>
    )
  );
};

const RightArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Right {...props} />;
};

const LeftArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Left {...props} />;
};

const Left = styled(IoIosArrowDropleft)`
  fill: black;
`;
const Right = styled(IoIosArrowDropright)`
  fill: black;
`;

const CarouselContainer = styled.div`
  padding: 4rem 10rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const CarouselContext = styled.div``;

const StyledSlider = styled(Slider)``;

const SlideWrapper = styled.div`
  .slick-slider {
    width: 100%;
  }

  .slick-active {
    margin-right: 5px;
  }

  .slick-track {
    display: flex;
    /* width: 80vw; */
  }

  .slick-arrow {
    background-color: #c7dbd5;
    padding: 5px;
    border-radius: 100px;
    width: 40px;
    height: 40px;
  }
  .slick-prev {
    left: -96px;
  }
  .slick-next {
    right: -96px;
  }
`;

const Card = styled.div`
  /* display: flex;s */
  /* flex-direction: column; */
  border: 1px solid black;
  border-radius: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 30vw;
  border-radius: 10px 10px 0 0;

  @media screen and (min-width: 1120px) {
    height: 20vw;
  }

  @media screen and (min-width: 1024px) {
    height: 15vw;
  }

  @media screen and (min-width: 700px) {
    height: 25vw;
  }
`;

const CardTitle = styled.h4`
  text-align: center;
  margin: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  padding: 0 1rem 1rem;
  margin: 0 3rem;
`;

const Star = styled(AiTwotoneStar)``;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  fill: ${(props) => props.like};
  cursor: pointer;
`;

export default Carousel;
