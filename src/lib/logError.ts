export const failAction = (req: any, res: any, err: any) => {
  console.error("ValidationError: %o", err?.message);
  throw err;
};
