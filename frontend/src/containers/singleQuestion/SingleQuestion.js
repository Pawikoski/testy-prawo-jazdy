import { Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const SingleQuestion = (slug) => {
  const question = useLoaderData();

  return (
    <div>
      <Typography component="h1" variant="h4" sx={{ textAlign: "center", my: 4 }}>{ question.text }</Typography>
    </div>
  );
}
 
export default SingleQuestion;