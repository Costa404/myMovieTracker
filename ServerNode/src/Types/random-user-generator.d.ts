declare module "random-user-generator" {
  export function randomUser(): Promise<{
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    // Você pode adicionar mais campos dependendo de suas necessidades
  }>;
}
