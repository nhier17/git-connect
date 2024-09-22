import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function encryptId(id: string) {
  return btoa(id);
}


export const authFormSchema = (type: string) => z.object({
  // sign up
  name: type === 'sign-in' ? z.string().optional() : z.string().min(3),
   // Additional sign-up fields
   bio: type === 'sign-in' ? z.string().optional() : z.string().optional(),
   education: type === 'sign-in' ? z.string().optional() : z.string().optional(),
   workExperience: type === 'sign-in' ? z.string().optional() : z.string().optional(),
   githubRepositories: type === 'sign-in' ? z.string().optional() : z.string().optional(),

  // both
  email: z.string().email(),
  password: z.string().min(8),
})