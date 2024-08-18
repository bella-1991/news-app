import React from 'react';
import PropTypes from 'prop-types';

export default function LazyImage({
  height,
  width,
  style = {},
  className,
  src = '#',
  alt = '',
  defaultImg,
  loading = 'lazy',
}) {
  if (defaultImg && !src) {
    return defaultImg;
  }

  return (
    <img
      src={src}
      loading={loading}
      className={className || ''}
      height={height}
      width={width}
      alt={alt === 'null' ? '' : alt}
      style={style}
    />
  );
}

LazyImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.shape({}),
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  defaultImg: PropTypes.element,
  loading: PropTypes.string,
};