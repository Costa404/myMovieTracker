type IsValidEmailProps = {
  email: string;
};

export const isValidEmail = ({ email }: IsValidEmailProps) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
