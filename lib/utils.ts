import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CredentialsSignin } from "next-auth";

export class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

