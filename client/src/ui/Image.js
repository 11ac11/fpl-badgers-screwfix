import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: ${(props) => props.width || 'auto'};
  max-width: 100%;
  height: ${(props) => props.height || 'auto'};
  ${(props) => props.grayscale && 'filter: grayscale(1)'};
`;

const Image = ({ src, alt, width, height, grayscale = true }) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      grayscale={!!grayscale}
    />
  );
};

export default Image;
