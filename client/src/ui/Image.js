import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  // width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || '100%'};
  ${(props) => !!props.grayscale === true && 'filter: grayscale(1)'};
`;

const Image = ({ src, alt, width, height, grayscale = false }) => {
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
