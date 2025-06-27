"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useUpdateResearcherMutation } from "@/redux/features/userManagement/userMamagement.api";
import GlobalLoader from "../common/GlobalLoader";

const ResearcherProfile = ({ data }: { data: any }) => {
  const [updateResearcher, { isLoading }] = useUpdateResearcherMutation();
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.profileImg || null);

  const [formData, setFormData] = useState({
    name: data.name || "",
    email: data.email || "",
    number: data.number || "",
    experience: data.experience || "",
    expertise: data.expertise || "",
    skill: data.skill || [],
    university: data.university || "",
    bsc: data.bsc || "",
    msc: data.msc || "",
    phd: data.phd || "",
    academicInterests: data.academicInterests || [],
    bio: data.bio || "",
    currentlyWorkingAt: data.currentlyWorkingAt || "",
    researchArea: data.researchArea || "",
    researchPaper: {
      title: data.researchPaper?.title || "",
      link: data.researchPaper?.link || "",
    },
    address: {
      city: data.address?.city || "",
      homeTown: data.address?.homeTown || "",
      presentAddress: data.address?.presentAddress || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (["city", "homeTown", "presentAddress"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        researchPaper: [formData.researchPaper],
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));
      if (selectedFile) {
        formDataToSend.append("file", selectedFile);
      }

      const response = await updateResearcher({
        id: data._id,
        data: formDataToSend,
      }).unwrap();

      setFormData({
        ...response,
        researchPaper: response.researchPaper || { title: "", link: "" },
        address: response.address || { city: "", homeTown: "", presentAddress: "" },
      });

      setPreviewUrl(response.profileImg || null);
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (err: any) {
      toast.error("Failed to update: " + err.message);
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skill.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skill: [...prev.skill, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  if (isLoading) return <GlobalLoader />;

  return (
    <Card className="p-6 sm:p-8 max-w-4xl mx-auto rounded-2xl shadow-xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-sky-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 transition-all duration-500 space-y-6">
      <div className="flex justify-end items-center">
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editMode ? (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Avatar */}
          <div className="sm:col-span-2 flex justify-center mb-4">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow ring-4 ring-blue-300 dark:ring-blue-600">
              {previewUrl && <Image src={previewUrl} alt="Profile" layout="fill" className="object-cover" />}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block font-medium mb-2">Profile Picture</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Main fields */}
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["number", "Phone"],
            ["experience", "Experience"],
            ["expertise", "Expertise"],
            ["currentlyWorkingAt", "Currently Working At"],
            ["bsc", "BSc"],
            ["msc", "MSc"],
            ["phd", "PhD"],
            ["researchArea", "Research Area"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block mb-1">{label}</label>
              <Input name={name} value={(formData as any)[name]} onChange={handleChange} />
            </div>
          ))}

          {/* Research Paper Title and Link */}
          <div>
            <label className="block mb-1">Research Paper Title</label>
            <Input
              name="researchPaperTitle"
              value={formData.researchPaper.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  researchPaper: { ...prev.researchPaper, title: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="block mb-1">Research Paper Link</label>
            <Input
              name="researchPaperLink"
              value={formData.researchPaper.link}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  researchPaper: { ...prev.researchPaper, link: e.target.value },
                }))
              }
            />
          </div>

          {/* Academic Interests */}
          <div className="sm:col-span-2">
            <label className="block mb-1">Academic Interests (comma-separated)</label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(",")}
              onChange={(e) =>
                setFormData({ ...formData, academicInterests: e.target.value.split(",") })
              }
            />
          </div>

          {/* Skills */}
          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium">Skills</label>
            <div className="flex flex-wrap gap-2 border rounded-lg p-3 min-h-[48px] bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
              {formData.skill.map((skill) => (
                <div
                  key={skill}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow"
                >
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove skill ${skill}`} className="hover:text-gray-300 focus:outline-none">
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-grow outline-none bg-transparent text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="Type skill and press Enter"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="block mb-1">Bio</label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          {/* Address */}
          {[
            ["city", "City"],
            ["homeTown", "Home Town"],
            ["presentAddress", "Present Address"],
          ].map(([name, label]) => (
            <div key={name} className={name === "presentAddress" ? "sm:col-span-2" : ""}>
              <label className="block mb-1">{label}</label>
              <Input name={name} value={(formData.address as any)[name]} onChange={handleChange} />
            </div>
          ))}

          <div className="sm:col-span-2 flex justify-center">
            <Button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium shadow-md transition"
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
          <div className="flex justify-center mb-6">
            <Image
              src={previewUrl || "/placeholder-profile.png"}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-blue-200 dark:ring-blue-500 bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
            />
          </div>
          {[
            ["Name", formData.name],
            ["Email", formData.email],
            ["Phone", formData.number],
            ["Experience", formData.experience],
            ["Expertise", formData.expertise],
            ["Skills", formData.skill.join(", ")],
            ["Currently Working At", formData.currentlyWorkingAt],
            ["BSc", formData.bsc],
            ["MSc", formData.msc],
            ["PhD", formData.phd],
            ["Academic Interests", formData.academicInterests.join(", ")],
            ["Bio", formData.bio],
            ["Research Area", formData.researchArea],
            [
              "Research Paper",
              formData.researchPaper.title ? (
                <a
                  href={formData.researchPaper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {formData.researchPaper.title}
                </a>
              ) : (
                "N/A"
              ),
            ],
            [
              "Address",
              `${formData.address.presentAddress}, ${formData.address.city}, ${formData.address.homeTown}`,
            ],
          ].map(([label, value]) => (
            <p key={label as string} className="text-sm sm:text-base">
              <strong>{label}:</strong> {value}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ResearcherProfile;
