"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useResearcherRegisterMutation } from "@/redux/features/userManagement/userMamagement.api";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/common/GlobalLoader";

const ResearcherPage = () => {

  const [addResearcherRegister] = useResearcherRegisterMutation();

  const router = useRouter();



const [formData, setFormData] = useState({
  name: "Sizzad Hosen",
  email: "sizzad@example.com",
  password: "123456",
  number: "01700000000",
  city: "Dhaka",
  homeTown: "Rangpur",
  presentAddress: "Uttara, Dhaka",
  expertise: "Machine Learning",
  experience: "3 years",
  bsc: "BRUR, CSE",
  msc: "DU, CSE",
  phd: "Pending",
  currentlyWorkingAt: "GreenTech Lab",
  bio: "I am a passionate researcher in AI and Data Science.",
  researchArea: "Natural Language Processing",
});


  const [skills, setSkills] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [papers, setPapers] = useState<{ title: string; url: string }[]>([]);

  const [paperTitle, setPaperTitle] = useState("");
  const [paperUrl, setPaperUrl] = useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && formData.expertise.trim()) {
      e.preventDefault();
      if (!skills.includes(formData.expertise.trim())) {
        setSkills([...skills, formData.expertise.trim()]);
      }
      setFormData({ ...formData, expertise: "" });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addPaper = () => {
    if (paperTitle) {
      setPapers([...papers, { title: paperTitle, url: paperUrl }]);
      setPaperTitle("");
      setPaperUrl("");
    }
  };

  const removePaper = (index: number) => {
    setPapers(papers.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      address: {
        city: formData.city,
        homeTown: formData.homeTown,
        presentAddress: formData.presentAddress,
      },
      skill: skills,
      researchPaper: papers,
    };

    try {
      const res = await addResearcherRegister(finalData).unwrap();
      console.log("response", res)

      if(res?.success==true)
      {

        toast.success("Researcher registered successfully!");
        router.push("/")
      }
    } catch (error: any) {
      toast.error("Error: " + error?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h1 className="text-2xl font-semibold text-center">
            Researcher Registration
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
            <div>
              <Label>Expertise</Label>
              <Input name="expertise" value={formData.expertise} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Input
                name="expertise"
                value={formData.expertise}
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
              <Label>MSc</Label>
              <Input name="msc" value={formData.msc} onChange={handleChange} />
            </div>

            <div>
              <Label>PhD</Label>
              <Input name="phd" value={formData.phd} onChange={handleChange} />
            </div>

            <div>
              <Label>Currently Working At</Label>
              <Input name="currentlyWorkingAt" value={formData.currentlyWorkingAt} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Research Area</Label>
              <Input name="researchArea" value={formData.researchArea} onChange={handleChange} />
            </div>

            {/* Research Papers */}
            <div className="md:col-span-2">
              <Label>Add Research Paper</Label>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Title"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={paperUrl}
                  onChange={(e) => setPaperUrl(e.target.value)}
                />
                <Button type="button" onClick={addPaper}>
                  Add Paper
                </Button>
              </div>

              <ul className="mt-2 list-disc pl-4 space-y-1">
                {papers.map((paper, idx) => (
                  <li key={idx}>
                    {paper.title} ({paper.url})
                    <button
                      type="button"
                      onClick={() => removePaper(idx)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 text-center">
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearcherPage
