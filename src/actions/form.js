export const postForm = form => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 5000);
  });
};

export const FORM_STATUS = {
  POSTED: "POSTED",
  POSTING: "POSTING",
  UNPOSTED: "UNPOSTED",
  ERROR: "ERROR"
};
