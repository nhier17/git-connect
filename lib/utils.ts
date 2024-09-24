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

export const authFormSchema = (type: 'sign-in' | 'edit-profile') => z.object({
  // Name is required for sign-up, optional for sign-in
  name: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  
  // Additional fields that are optional for sign-in
  bio: type === 'sign-in' ? z.string().optional() : z.string().optional(),
  education: type === 'sign-in' ? z.string().optional() : z.string().optional(),
  workExperience: type === 'sign-in' ? z.string().optional() : z.string().optional(),
  githubRepositories: type === 'sign-in' ? z.string().optional() : z.string().optional(),

  // Email is required for both sign-in and edit profile
  email: z.string().email(),

  // Password is required for sign-in, optional for edit-profile
  password: type === 'edit-profile' ? z.string().min(8).optional() : z.string().min(8),
});

