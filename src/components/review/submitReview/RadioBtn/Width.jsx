/* eslint-disable */
import React from "react";
import { useState } from "react";

export default function RadioBtn_Width({ setRating }) {
  return (
    <div>
      <input
        type="radio"
        name="fit"
        value="1"
        onClick={(e) => setRating(e.target.value)}
      />
      1 - Too narrow
      <input
        type="radio"
        name="fit"
        value="2"
        onClick={(e) => setRating(e.target.value)}
      />
      2 - Slightly narrow
      <input
        type="radio"
        name="fit"
        value="3"
        onClick={(e) => setRating(e.target.value)}
      />
      3 - Perfect
      <input
        type="radio"
        name="fit"
        value="4"
        onClick={(e) => setRating(e.target.value)}
      />
      4 - Slightly wide
      <input
        type="radio"
        name="fit"
        value="5"
        onClick={(e) => setRating(e.target.value)}
      />
      5 - Too wide
    </div>
  );
}