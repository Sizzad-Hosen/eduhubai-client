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

const TeacherPage = () => {

  const router = useRouter();


  const [addTeacherRegister] = useTeacherRegisterMutation();

  const [formData, setFormData] = useState({
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
  });

  console.log("Initial Form Data:", formData);

  const [skills, setSkills] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && formData.skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(formData.skillInput.trim())) {
        setSkills([...skills, formData.skillInput.trim()]);
      }
      setFormData({ ...formData, skillInput: "" });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log("Submitting:", finalData);

    try {
     const res = await addTeacherRegister(finalData).unwrap();

     console.log("Response:", res);
     
     if(res?.success==true){

       toast.success("Teacher registration successful!");
       router.push("/")
     }
    } catch (error) {
      toast.error("Registration failed.");
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
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

          
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>

         
            <div>
              <Label>Number</Label>
              <Input name="number" value={formData.number} onChange={handleChange} />
            </div>

            <div>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div>
              <Label>Home Town</Label>
              <Input name="homeTown" value={formData.homeTown} onChange={handleChange} />
            </div>

            <div>
              <Label>Present Address</Label>
              <Input name="presentAddress" value={formData.presentAddress} onChange={handleChange} />
            </div>

            <div>
              <Label>Expertise</Label>
              <Input name="expertise" value={formData.expertise} onChange={handleChange} />
            </div>

            <div>
              <Label>Experience</Label>
              <Input name="experience" value={formData.experience} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
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
            </div>

            <div>
              <Label>BSc</Label>
              <Input name="bsc" value={formData.bsc} onChange={handleChange} />
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
              <Label>Bio</Label>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 text-center">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPage;
