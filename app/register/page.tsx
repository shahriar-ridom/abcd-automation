"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";

// Zod validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data with Zod
      const validatedData = registerSchema.parse(formData);

      // Here you would typically make an API call to register the user
      console.log("Register data:", validatedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful registration here
      alert("Registration successful! Welcome to Utomate! (This is a demo)");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof RegisterFormData] =
              issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle other errors (API errors, etc.)
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Logo in Top Right */}
      <div className="absolute top-6 right-6 z-20 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg transform rotate-45 animate-spin-slow"></div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
          Utomate
        </span>
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Join Utomate
            </h1>
            <p className="text-gray-300">
              Create your account and start automating
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="animate-fade-in-up delay-300">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/20 focus:ring-blue-400 focus:border-transparent"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 animate-fade-in-up">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="animate-fade-in-up delay-500">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/20 focus:ring-blue-400 focus:border-transparent"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 animate-fade-in-up">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-up delay-700">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/20 focus:ring-blue-400 focus:border-transparent"
                  }`}
                  placeholder="Create a strong password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400 animate-fade-in-up">
                  {errors.password}
                </p>
              )}
              <div className="mt-2 text-xs text-gray-400">
                Password must contain at least 8 characters with uppercase,
                lowercase, and number
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="animate-fade-in-up delay-1000">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-white/20 bg-white/5 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>

            {/* Create Account Button */}
            <div className="animate-fade-in-up delay-1200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-300 transform shadow-lg ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isSubmitting ? (
                    <svg
                      className="h-5 w-5 text-blue-300 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  )}
                </span>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center animate-fade-in-up delay-1400">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-in-up delay-1700">
          <div className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="text-xs text-gray-300">Free Forever</div>
          </div>

          <div className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="text-xs text-gray-300">Instant Setup</div>
          </div>

          <div className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-slate-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="text-xs text-gray-300">24/7 Support</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-32 right-16 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-1500"></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-blue-300 rounded-full animate-bounce delay-2000"></div>
      <div className="absolute bottom-60 right-12 w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-2500"></div>
    </div>
  );
}
