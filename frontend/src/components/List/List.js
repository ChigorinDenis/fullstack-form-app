import "./List.scss";
import React from "react";

function List({ data }) {
  return (
    <>
      {data.length > 0 ? (
        <ul>
          {data.map(({ email, number }, index) => (
            <li key={`${index}${email}`}>
              <b>Email:</b> {email} <b>number:</b> {number}
            </li>
          ))}
        </ul>
      ) : (
        <span>Нет записей</span>
      )}
    </>
  );
}

export default List;
