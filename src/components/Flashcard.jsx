import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Flashcard({ data, isFlipped, handleFlip }) {
  return (
    <div
      className={`flip-card${isFlipped ? " flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div>Question</div>
          {data.question}
        </div>
        <div className="flip-card-back">
          <div>Answer</div>
          {data.answer}
          <SyntaxHighlighter language="python" style={docco}>
            {data.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
