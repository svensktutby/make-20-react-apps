import React, { ChangeEvent, FC, useState } from 'react';
import marked from 'marked';
import ReactMarkdown from 'react-markdown';

import './App.css';

export const App: FC = () => {
  const [markdown, setMarkdown] = useState('# sup');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.currentTarget.value);
  };

  return (
    <div className="app">
      <textarea value={markdown} onChange={handleChange} />

      {/* <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      /> */}

      <ReactMarkdown className="preview" source={markdown} />
    </div>
  );
};
