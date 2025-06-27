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
    expertise: "",
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
    if (paperTitle.trim()) {
      setPapers([...papers, { title: paperTitle.trim(), url: paperUrl.trim() }]);
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
      if (res?.success === true) {
        toast.success("Researcher registered successfully!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Error: " + error?.message || "Something went wrong");
    }
  };

  return (
    <div className=" max-w-4xl mx-auto my-12 p-6 sm:p-10">
      <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <CardContent className="space-y-8 p-8 bg-white dark:bg-gray-900 rounded-xl">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">
            Researcher Registration
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            {/* Name */}
            <div className="flex flex-col">
              <Label htmlFor="name" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <Label htmlFor="password" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="bg-gray-50 dark:bg-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <Label htmlFor="number" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <Label htmlFor="city" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Home Town */}
            <div className="flex flex-col">
              <Label htmlFor="homeTown" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Home Town
              </Label>
              <Input
                id="homeTown"
                name="homeTown"
                value={formData.homeTown}
                onChange={handleChange}
                placeholder="Home Town"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Present Address */}
            <div className="flex flex-col md:col-span-2">
              <Label htmlFor="presentAddress" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Present Address
              </Label>
              <Input
                id="presentAddress"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                placeholder="Present Address"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <Label htmlFor="experience" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of experience"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Expertise */}
            <div className="flex flex-col">
              <Label htmlFor="expertise" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Add Skill / Expertise
              </Label>
              <Input
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter or Comma"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Skills List */}
            <div className="flex flex-col md:col-span-2">
              <Label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skills.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic">No skills added yet.</p>
                )}
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 bg-cyan-100 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-100 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove skill ${skill}`}
                      className="hover:text-red-600 dark:hover:text-red-400 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BSc */}
            <div className="flex flex-col">
              <Label htmlFor="bsc" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                BSc
              </Label>
              <Input
                id="bsc"
                name="bsc"
                value={formData.bsc}
                onChange={handleChange}
                placeholder="Bachelor degree"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* MSc */}
            <div className="flex flex-col">
              <Label htmlFor="msc" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                MSc
              </Label>
              <Input
                id="msc"
                name="msc"
                value={formData.msc}
                onChange={handleChange}
                placeholder="Master degree"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* PhD */}
            <div className="flex flex-col">
              <Label htmlFor="phd" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                PhD
              </Label>
              <Input
                id="phd"
                name="phd"
                value={formData.phd}
                onChange={handleChange}
                placeholder="PhD info"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Currently Working At */}
            <div className="flex flex-col md:col-span-2">
              <Label
                htmlFor="currentlyWorkingAt"
                className="mb-1 font-semibold text-gray-700 dark:text-gray-300"
              >
                Currently Working At
              </Label>
              <Input
                id="currentlyWorkingAt"
                name="currentlyWorkingAt"
                value={formData.currentlyWorkingAt}
                onChange={handleChange}
                placeholder="Organization / Company"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col md:col-span-2">
              <Label htmlFor="bio" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write something about yourself"
                rows={4}
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Research Area */}
            <div className="flex flex-col md:col-span-2">
              <Label htmlFor="researchArea" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Research Area
              </Label>
              <Input
                id="researchArea"
                name="researchArea"
                value={formData.researchArea}
                onChange={handleChange}
                placeholder="Your primary research area"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Research Papers Section */}
            <div className="flex flex-col md:col-span-2 space-y-3">
              <Label className="font-semibold text-gray-700 dark:text-gray-300">
                Add Research Paper
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  placeholder="Title"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <Input
                  placeholder="URL"
                  value={paperUrl}
                  onChange={(e) => setPaperUrl(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <Button
                  type="button"
                  onClick={addPaper}
                  className="sm:col-span-1 whitespace-nowrap"
                >
                  Add Paper
                </Button>
              </div>

              {/* Papers List */}
              {papers.length > 0 ? (
                <ul className="list-disc pl-5 max-h-48 overflow-auto text-gray-800 dark:text-gray-300 space-y-1">
                  {papers.map((paper, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-cyan-700 dark:text-cyan-400 truncate max-w-[80%]"
                        title={paper.title}
                      >
                        {paper.title}
                      </a>
                      <button
                        type="button"
                        onClick={() => removePaper(idx)}
                        aria-label={`Remove paper ${paper.title}`}
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No papers added yet.</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition"
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearcherPage;
