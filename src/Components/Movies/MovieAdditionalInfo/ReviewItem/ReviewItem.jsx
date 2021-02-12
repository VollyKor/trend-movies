import { useState } from 'react';
import s from './ReviewItem.module.css';

export default function ReviewItem({ reviewObj }) {
  const { content, id, author } = reviewObj;
  const [reviewToggle, setReviewToggle] = useState(false);

  function sliceText(text, amount = 400) {
    return text.slice(0, amount);
  }

  return (
    <li key={id} className={s.item}>
      <h4 className={s.title}>{author}</h4>
      <p className={s.text}>
        {reviewToggle ? content : sliceText(content)}
        {!reviewToggle && (
          <button
            className={s.button}
            type="button"
            onClick={() => setReviewToggle(!reviewToggle)}
          >
            Show more...
          </button>
        )}
      </p>
      {reviewToggle && (
        <button
          className={s.hideButton}
          type="button"
          onClick={() => setReviewToggle(!reviewToggle)}
        >
          Hide
        </button>
      )}
    </li>
  );
}
