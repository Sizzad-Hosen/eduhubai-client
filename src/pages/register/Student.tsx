"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Error from "next/error";
import { error } from "console";

const StudentPage = () => {
  const [formData, setFormData] = useState({
    name: "sizzad",
    email: "sizzad@gmail.com",
    password: "123456",
    number: "01708694445",
    city: "dinajpur",
    homeTown: "dinajpur",
    presentAddress: "sadarpur, dinajpur",
    experience: "mern",
    skill: "node js , react js , express js",
    university: "Begum rokeya University, Rangpur",
    bio: "I am a student of computer science and engineering. I love coding and learning new technologies.",
    work: "student",
    academicInterests: "full stack development, web development",
    course: "data structure and algorithm",
  });

  console.log("Initial formData:", formData);


  const [skills, setSkills] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && formData.skill.trim()) {
      e.preventDefault();
      if (!skills.includes(formData.skill.trim())) {
        setSkills([...skills, formData.skill.trim()]);
      }
      setFormData({ ...formData, skill: "" });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      skill: skills,
    };
    console.log("Submitted data:", finalData);
    // Send this data to backend API

    try {
      // Simulate API call or add your API logic here
      
    } catch (error: any) {
      toast.error(
        "Error submitting form: " +
          (typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error))
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h1 className="text-2xl font-semibold text-center">
            Student Registration
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>

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
                  required
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
              <Label>Phone Number</Label>
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
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
              />
            </div>

            <div>
              <Label>University</Label>
              <Input name="university" value={formData.university} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div>
              <Label>Work</Label>
              <Input name="work" value={formData.work} onChange={handleChange} />
            </div>

            <div>
              <Label>Course</Label>
              <Input name="course" value={formData.course} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Academic Interests (comma separated)</Label>
              <Input name="academicInterests" value={formData.academicInterests} onChange={handleChange} />
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

export default StudentPage;
