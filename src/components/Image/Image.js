import { useState, forwardRef } from "react";
import images from "~/images";

const Image = forwardRef(
  (
    {
      src,
      alt,
      path,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallback);
    };

    // console.log(
    //   `https://vacation-backend.onrender.com/static/resource/${path}`
    // );
    return (
      <img
        className={className}
        ref={ref}
        src={
          fallback
            ? fallback
            : src
            ? src
            : path === undefined
            ? fallback
            : `https://vacation-backend.onrender.com/static/resource/${path}`
        }
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
