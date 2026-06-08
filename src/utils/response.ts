export const successResponse = (
  traceId: string,
  data: any,
  message?: string
) => {
  return {
    traceId,
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  traceId: string,
  code: string,
  message: string
) => {
  return {
    traceId,
    success: false,
    error: {
      code,
      message,
    },
  };
};