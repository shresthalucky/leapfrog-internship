import React from 'react';
import './Row.css'


function contentColumn(content) {

  let information;

  if (Array.isArray(content)) {
    information = content.map(info => {
      return (
        <div className="col-content__row" key={info}>{info}</div>
      );
    });
  } else {
    information = <div className="col-content__row">{content}</div>;
  }

  return information;
}

function Row({ title, content }) {

  return (
    <div className="row clearfix">
      <div className="col-title row__col">
        {title}
      </div>
      <div className="col-content row__col">
        {contentColumn(content)}
      </div>
    </div>
  );
}

export default Row;