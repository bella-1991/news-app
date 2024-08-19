import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react';
import styles from './button.module.scss';

function Button({
  to = null,
  btnText = '',
  targetBlank = false,
  buttonType = 'primary',
  buttonSize = 'm',
  isInternalLink = false,
  onClick = null,
  icon = null,
  noStyle = false,
}) {
  const classes = `${styles[buttonType] || ''} ${buttonSize ? styles[`${buttonSize}_size`] : ''} `;

  const btnTitle = typeof btnText === 'string' ? btnText : '';

  if (isInternalLink) {
    return (
      <Link className={`${classes}`} to={to} title={btnTitle} aria-label={btnTitle}>
        {btnText}
        {icon && icon}
      </Link>
    );
  }

  const linkAttr = to ? { href: to } : { onClick };

  return (
    to ? (
      <a
        title={btnTitle}
        aria-label={btnTitle}
        target={targetBlank ? '_blank' : ''}
        rel="nofollow noreferrer"
        className={`${classes || ''}`}
        {...linkAttr}
      >
        {btnText}
        {icon && icon}
      </a>
    ) : (
      <button 
        type='button'
        className={`${noStyle ? '' : classes || ''}`}
        {...linkAttr}
      >
        {btnText}
        {icon && icon}
      </button>
    )
  );
}

Button.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node,
  btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  targetBlank: PropTypes.bool,
  isInternalLink: PropTypes.bool,
  buttonType: PropTypes.string,
  buttonSize: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
