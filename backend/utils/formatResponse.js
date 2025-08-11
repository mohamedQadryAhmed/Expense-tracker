export const success = (data) => {
  return {
    status: 'success',
    data,
  };
};

export const fail = (data) => {
  return {
    status: 'fail',
    data,
  };
};

export const error = (message, stack = null) => {
  return {
    status: 'error',
    message,
    stack,
  };
};
