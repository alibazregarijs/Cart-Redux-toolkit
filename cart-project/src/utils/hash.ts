export const hashPassword = ({ pass }: { pass: string }) => {
  return pass.split("").reduce((hash, char) => {
    return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
  }, 0);
};
