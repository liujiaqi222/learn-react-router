import { useRouteError } from "react-router-dom";

import React from "react";

const ArrowPage = () => {
  // Note that useRouteError provides the error that was thrown.
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ArrowPage;
