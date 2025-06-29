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

const ResearcherPage = () => {
  const [addResearcherRegister] = useResearcherRegisterMutation();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    city: "",
    homeTown: "",
    presentAddress: "",
    experience: "",
    bsc: "",
    msc: "",
    phd: "",
    currentlyWorkingAt: "",
    bio: "",
    researchArea: "",
    expertise: "", // This will be cleared on skill add, but still exists here
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Skills and research papers
  const [skills, setSkills] = useState<string[]>([]);
  const [papers, setPapers] = useState<{ title: string; url: string }[]>([]);
  const [paperTitle, setPaperTitle] = useState("");
  const [paperUrl, setPaperUrl] = useState("");

  // Password toggle
  const [showPassword, setShowPassword] = useState(false);

  // Validate function
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password.trim()) newErrors.password = "Password is required.";

    if (skills.length === 0) newErrors.skills = "At least one skill is required.";

    // Research paper validation
    papers.forEach((paper, idx) => {
      if (!paper.title.trim())
        newErrors[`paperTitle_${idx}`] = "Paper title is required.";
      if (!paper.url.trim())
        newErrors[`paperUrl_${idx}`] = "Paper URL is required.";
      else if (
        !/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- ./?%&=]*)?$/.test(paper.url.trim())
      ) {
        newErrors[`paperUrl_${idx}`] = "Invalid URL format.";
      }
    });

    return newErrors;
  };

  // Handle input change and clear error for that field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  // Add skill on Enter or Comma
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && formData.expertise.trim()) {
      e.preventDefault();
      const newSkill = formData.expertise.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
        if (errors.skills) setErrors((prev) => ({ ...prev, skills: undefined }));
      }
      // Clear expertise input after adding
      setFormData({ ...formData, expertise: "" });
    }
  };

  // Remove skill from list
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Add paper with validation
  const addPaper = () => {
    const paperErrors: Record<string, string> = {};

    if (!paperTitle.trim()) paperErrors.paperTitle = "Title is required.";
    if (!paperUrl.trim()) paperErrors.paperUrl = "URL is required.";
    else if (
      !/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- ./?%&=]*)?$/.test(paperUrl.trim())
    )
      paperErrors.paperUrl = "Invalid URL format.";

    if (Object.keys(paperErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...paperErrors }));
      return;
    }

    setErrors((prev) => ({ ...prev, paperTitle: undefined, paperUrl: undefined }));
    setPapers([...papers, { title: paperTitle.trim(), url: paperUrl.trim() }]);
    setPaperTitle("");
    setPaperUrl("");
  };

  // Remove paper by index
  const removePaper = (index: number) => {
    setPapers(papers.filter((_, idx) => idx !== index));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    const finalData = {
      ...formData,
      address: {
        city: formData.city,
        homeTown: formData.homeTown,
        presentAddress: formData.presentAddress,
      },
      expertise: skills.length > 0 ? skills.join(", ") : "", // IMPORTANT: expertise as string
      skill: skills, // also send skill array if backend wants it
      researchPaper: papers,
    };

    try {
      const res = await addResearcherRegister(finalData).unwrap();
      if (res?.success === true) {
        toast.success("Researcher registered successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Error: " + (error?.message || "Something went wrong"));
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 sm:p-10">
      <Card className="shadow-lg border border-gray-300 dark:border-gray-700">
        <CardContent className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            Researcher Registration
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
            {/* Basic inputs */}
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["password", "Password"],
              ["number", "Phone Number"],
              ["city", "City"],
              ["homeTown", "Home Town"],
              ["presentAddress", "Present Address"],
              ["experience", "Experience"],
              ["bsc", "BSc"],
              ["msc", "MSc"],
              ["phd", "PhD"],
              ["currentlyWorkingAt", "Currently Working At"],
              ["researchArea", "Research Area"],
            ].map(([name, label]) => (
              <div key={name} className="flex flex-col relative">
                <Label htmlFor={name} className="font-semibold text-gray-700 dark:text-gray-300">
                  {label}
                  {["name", "email", "password"].includes(name) && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <Input
                  type={name === "password" ? (showPassword ? "text" : "password") : "text"}
                  id={name}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className={`bg-gray-50 dark:bg-gray-800 ${errors[name] ? "border-red-500" : ""}`}
                  aria-invalid={errors[name] ? "true" : "false"}
                  aria-describedby={`${name}-error`}
                />
                {name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[35px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
                {errors[name] && (
                  <span id={`${name}-error`} className="text-red-500 text-sm mt-1">
                    {errors[name]}
                  </span>
                )}
              </div>
            ))}
{/* Expertise input - free text */}
<div className="md:col-span-2">
  <Label htmlFor="expertise" className="font-semibold text-gray-700 dark:text-gray-300">
    Expertise (describe your main expertise)
  </Label>
  <Input
    id="expertise"
    name="expertise"
    value={formData.expertise}
    onChange={handleChange}
    placeholder="Describe your main expertise"
    className="bg-gray-50 dark:bg-gray-800"
  />
</div>

            {/* Skills */}
            <div className="md:col-span-2">
              <Label className="font-semibold text-gray-700 dark:text-gray-300">
                Add Skill / Expertise <span className="text-red-500">*</span>
              </Label>
              <Input
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter or Comma"
                className={`bg-gray-50 dark:bg-gray-800 ${errors.skills ? "border-red-500" : ""}`}
                aria-invalid={errors.skills ? "true" : "false"}
                aria-describedby="skills-error"
              />
              {errors.skills && (
                <span id="skills-error" className="text-red-500 text-sm">
                  {errors.skills}
                </span>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-100 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800"
                      aria-label={`Remove skill ${skill}`}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <Label htmlFor="bio" className="font-semibold text-gray-700 dark:text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Research Papers */}
            <div className="md:col-span-2 space-y-3">
              <Label className="font-semibold text-gray-700 dark:text-gray-300">
                Add Research Paper
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <Input
                    placeholder="Title"
                    value={paperTitle}
                    onChange={(e) => {
                      setPaperTitle(e.target.value);
                      if (errors.paperTitle) {
                        setErrors((prev) => ({ ...prev, paperTitle: undefined }));
                      }
                    }}
                    className={`bg-gray-50 dark:bg-gray-800 ${errors.paperTitle ? "border-red-500" : ""}`}
                    aria-invalid={errors.paperTitle ? "true" : "false"}
                    aria-describedby="paperTitle-error"
                  />
                  {errors.paperTitle && (
                    <span id="paperTitle-error" className="text-red-600 text-sm mt-1">
                      {errors.paperTitle}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <Input
                    placeholder="URL"
                    value={paperUrl}
                    onChange={(e) => {
                      setPaperUrl(e.target.value);
                      if (errors.paperUrl) {
                        setErrors((prev) => ({ ...prev, paperUrl: undefined }));
                      }
                    }}
                    className={`bg-gray-50 dark:bg-gray-800 ${errors.paperUrl ? "border-red-500" : ""}`}
                    aria-invalid={errors.paperUrl ? "true" : "false"}
                    aria-describedby="paperUrl-error"
                  />
                  {errors.paperUrl && (
                    <span id="paperUrl-error" className="text-red-600 text-sm mt-1">
                      {errors.paperUrl}
                    </span>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={addPaper}
                  className="whitespace-nowrap"
                >
                  Add Paper
                </Button>
              </div>

              {/* List of added papers */}
              {papers.length > 0 ? (
                <ul className="list-disc pl-5 max-h-48 overflow-auto text-gray-800 dark:text-gray-300 space-y-1 mt-2">
                  {papers.map((paper, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center truncate"
                      title={`${paper.title} - ${paper.url}`}
                    >
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-cyan-700 dark:text-cyan-400 truncate max-w-[80%]"
                      >
                        {paper.title}
                      </a>
                      <button
                        type="button"
                        onClick={() => removePaper(idx)}
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition ml-2"
                        aria-label={`Remove paper ${paper.title}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic mt-2">No papers added yet.</p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg"
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
