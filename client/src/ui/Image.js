import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  // width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || '100%'};
`;

export const Image = ({ src, alt, width, height }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} />;
};
