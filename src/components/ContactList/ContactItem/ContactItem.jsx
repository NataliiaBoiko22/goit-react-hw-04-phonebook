import React from 'react';
import PropTypes from 'prop-types';
import css from './contactItem.module.css';

function ContactItem({ idx, name, number, onRemove }) {
  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button
        type="button"
        className={css.button}
        onClick={() => {
          onRemove(idx);
        }}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  idx: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ContactItem;
