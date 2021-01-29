import React, { FC } from 'react';
import { v4 } from 'uuid';
import DOMPurify from 'dompurify';

import { categories, CategoryIdType } from '../categories';

type CategorySelectorPropsType = {
  category: CategoryIdType;
  chooseCategory: (category: CategoryIdType) => void;
};

export const CategorySelector: FC<CategorySelectorPropsType> = ({
  category,
  chooseCategory,
}) => {
  return (
    <div className="category-selector">
      <p>Select Category</p>
      <select
        value={category}
        onChange={(e) => chooseCategory(+e.target.value)}
      >
        {categories.map((item) => {
          const cleanCategoryName = DOMPurify.sanitize(item.name);

          return (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <option
              key={v4()}
              value={item.id}
              dangerouslySetInnerHTML={{ __html: cleanCategoryName }}
            />
          );
        })}
      </select>
    </div>
  );
};
