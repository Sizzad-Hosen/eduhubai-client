"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const roles = ["Teacher", "Researcher", "Student", "Admin"];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const newErrors: Partial<typeof form> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!form.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const value = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Submit logic here
    alert(`Registered:\nName: ${form.name}\nEmail: ${form.email}\nRole: ${form.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 space-y-6"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900">Create Account</h2>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-1">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange("name")}
            required
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
            className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-1">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange("email")}
            required
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange("password")}
            required
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            className={errors.password ? "border-red-500 focus:ring-red-500" : ""}
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Role Select */}
        <div>
          <Label htmlFor="role" className="mb-1">
            Select Role
          </Label>
          <Select
            onValueChange={(value) => {
              setForm((prev) => ({ ...prev, role: value }));
              setErrors((prev) => ({ ...prev, role: undefined }));
            }}
            value={form.role}
            defaultValue=""
          >
            <SelectTrigger id="role" className={`${errors.role ? "border-red-500 focus:ring-red-500" : ""}`}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role && (
            <p id="role-error" className="mt-1 text-sm text-red-600">
              {errors.role}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
