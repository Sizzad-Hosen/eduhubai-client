"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTeacherRegisterMutation } from "@/redux/features/userManagement/userMamagement.api";
import { useRouter } from "next/navigation";

interface FormData {
  password: string;
  name: string;
  email: string;
  number: string;
  city: string;
  homeTown: string;
  presentAddress: string;
  expertise: string;
  experience: string;
  skillInput: string;
  bsc: string;
  msc?: string;
  phd?: string;
  currentlyWorkingAt?: string;
  bio: string;
}

interface FormErrors {
  password?: string;
  name?: string;
  email?: string;
  number?: string;
  city?: string;
  homeTown?: string;
  presentAddress?: string;
  expertise?: string;
  experience?: string;
  bsc?: string;
  bio?: string;
}

const TeacherPage = () => {
  const router = useRouter();
  const [addTeacherRegister] = useTeacherRegisterMutation();

  const initialFormData: FormData = {
    password: "123456",
    name: "mizan",
    email: "mizan@gmail.com",
    number: "50364321653432",
    city: "Rangpur",
    homeTown: "Rangpur",
    presentAddress: "Rangpur",
    expertise: "CSE",
    experience: "2 years",
    skillInput: "node js",
    bsc: "DU",
    msc: "DU",
    phd: "Frach",
    currentlyWorkingAt: "Professior",
    bio: "HI i am",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.name) newErrors.name = "Name is required";
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.number) newErrors.number = "Phone number is required";
    
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.homeTown) newErrors.homeTown = "Home town is required";
    if (!formData.presentAddress) newErrors.presentAddress = "Present address is required";
    if (!formData.expertise) newErrors.expertise = "Expertise is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.bsc) newErrors.bsc = "BSc information is required";
    if (!formData.bio) newErrors.bio = "Bio is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && formData.skillInput.trim()) {
      e.preventDefault();
      const newSkill = formData.skillInput.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setFormData(prev => ({ ...prev, skillInput: "" }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    setIsSubmitting(true);

    const finalData = {
      password: formData.password,
      name: formData.name,
      email: formData.email,
      number: formData.number,
      address: {
        city: formData.city,
        homeTown: formData.homeTown,
        presentAddress: formData.presentAddress,
      },
      expertise: formData.expertise,
      experience: formData.experience,
      skill: skills,
      bsc: formData.bsc,
      msc: formData.msc || undefined,
      phd: formData.phd || undefined,
      currentlyWorkingAt: formData.currentlyWorkingAt || undefined,
      bio: formData.bio,
    };

    try {
      const res = await addTeacherRegister(finalData).unwrap();
      
      if (res?.success) {
        toast.success("Teacher registration successful!");
        router.push("/login");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h1 className="text-2xl font-semibold text-center">
            Teacher Registration
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email*</Label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label>Password*</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label>Name*</Label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label>Phone Number*</Label>
              <Input 
                name="number" 
                value={formData.number} 
                onChange={handleChange} 
                className={errors.number ? "border-red-500" : ""}
              />
              {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
            </div>

            <div>
              <Label>City*</Label>
              <Input 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label>Home Town*</Label>
              <Input 
                name="homeTown" 
                value={formData.homeTown} 
                onChange={handleChange} 
                className={errors.homeTown ? "border-red-500" : ""}
              />
              {errors.homeTown && <p className="text-red-500 text-sm mt-1">{errors.homeTown}</p>}
            </div>

            <div>
              <Label>Present Address*</Label>
              <Input 
                name="presentAddress" 
                value={formData.presentAddress} 
                onChange={handleChange} 
                className={errors.presentAddress ? "border-red-500" : ""}
              />
              {errors.presentAddress && <p className="text-red-500 text-sm mt-1">{errors.presentAddress}</p>}
            </div>

            <div>
              <Label>Expertise*</Label>
              <Input 
                name="expertise" 
                value={formData.expertise} 
                onChange={handleChange} 
                className={errors.expertise ? "border-red-500" : ""}
              />
              {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
            </div>

            <div>
              <Label>Experience*</Label>
              <Input 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                className={errors.experience ? "border-red-500" : ""}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div className="md:col-span-2">
              <Label>Skills*</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Input
                name="skillInput"
                value={formData.skillInput}
                onChange={handleChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
              />
              {skills.length === 0 && (
                <p className="text-red-500 text-sm mt-1">Please add at least one skill</p>
              )}
            </div>

            <div>
              <Label>BSc*</Label>
              <Input 
                name="bsc" 
                value={formData.bsc} 
                onChange={handleChange} 
                className={errors.bsc ? "border-red-500" : ""}
              />
              {errors.bsc && <p className="text-red-500 text-sm mt-1">{errors.bsc}</p>}
            </div>

            <div>
              <Label>MSc (optional)</Label>
              <Input name="msc" value={formData.msc} onChange={handleChange} />
            </div>

            <div>
              <Label>PhD (optional)</Label>
              <Input name="phd" value={formData.phd} onChange={handleChange} />
            </div>

            <div>
              <Label>Currently Working At (optional)</Label>
              <Input
                name="currentlyWorkingAt"
                value={formData.currentlyWorkingAt}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Bio*</Label>
              <Textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                className={errors.bio ? "border-red-500" : ""}
              />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div className="md:col-span-2 text-center">
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPage;