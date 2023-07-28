import React from "react";

function Facebook({ className, color }: any) {
  return (
    <svg
      width="54"
      className={className}
      height="53"
      viewBox="0 0 54 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54 26.5C54 11.8644 41.9117 0 27 0C12.0883 0 0 11.8644 0 26.5C0 39.7269 9.87356 50.6901 22.7812 52.6781V34.1602H15.9258V26.5H22.7812V20.6617C22.7812 14.0202 26.8122 10.3516 32.9796 10.3516C35.9336 10.3516 39.0234 10.8691 39.0234 10.8691V17.3906H35.6188C32.2648 17.3906 31.2188 19.4333 31.2188 21.529V26.5H38.707L37.51 34.1602H31.2188V52.6781C44.1265 50.6901 54 39.7269 54 26.5Z"
        
      />
      <path
        d="M37.51 34.1602L38.707 26.5H31.2188V21.529C31.2188 19.4333 32.2647 17.3906 35.6188 17.3906H39.0234V10.8691C39.0234 10.8691 35.9335 10.3516 32.9796 10.3516C26.8122 10.3516 22.7812 14.0202 22.7812 20.6617V26.5H15.9258V34.1602H22.7812V52.6781C24.1558 52.8898 25.5648 53 27 53C28.4352 53 29.8441 52.8898 31.2188 52.6781V34.1602H37.51Z"
        fill={color}
      />
    </svg>
  );
}

export default Facebook;