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

const ResearcherProfile = ({ data }) => {
  const [updateResearcher, { isLoading }] = useUpdateResearcherMutation();
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState(data.profileImg || null);
  const [errors, setErrors] = useState({});

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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.number.trim()) newErrors.number = "Phone number is required";
    if (formData.skill.length === 0) newErrors.skill = "Add at least one skill";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

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

      const response = await updateResearcher({ id: data._id, data: formDataToSend }).unwrap();

      setFormData({
        ...response,
        researchPaper: response.researchPaper?.[0] || { title: "", link: "" },
        address: response.address || { city: "", homeTown: "", presentAddress: "" },
      });

      setPreviewUrl(response.profileImg || null);
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update: " + err.message);
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
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
    <Card className="p-6 sm:p-8 max-w-4xl mx-auto rounded-2xl border border-slate-300 bg-white dark:bg-slate-900">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editMode ? (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Avatar */}
          <div className="sm:col-span-2 flex justify-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
              {previewUrl && <Image src={previewUrl} alt="Profile" fill className="object-cover" />}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label>Profile Picture</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Text Inputs */}
          {["name", "email", "number", "experience", "expertise", "currentlyWorkingAt", "bsc", "msc", "phd", "researchArea"].map((name) => (
            <div key={name}>
              <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
              <Input name={name} value={formData[name]} onChange={handleChange} className={errors[name] && "border-red-500"} />
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          {/* Research Paper */}
          <div>
            <label>Research Paper Title</label>
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
            <label>Research Paper Link</label>
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
            <label>Academic Interests</label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(",")}
              onChange={(e) => setFormData({ ...formData, academicInterests: e.target.value.split(",") })}
            />
          </div>

          {/* Skills */}
          <div className="sm:col-span-2">
            <label>Skills</label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-slate-800">
              {formData.skill.map((skill) => (
                <div key={skill} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="ml-2">&times;</button>
                </div>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type skill & press Enter"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            {errors.skill && <p className="text-red-500 text-sm mt-1">{errors.skill}</p>}
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label>Bio</label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          {/* Address */}
          {["city", "homeTown", "presentAddress"].map((field) => (
            <div key={field} className={field === "presentAddress" ? "sm:col-span-2" : ""}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <Input
                name={field}
                value={formData.address[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="sm:col-span-2 flex justify-center">
            <Button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-md">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-center">
            <Image
              src={previewUrl || "/placeholder-profile.png"}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          {["name", "email", "number", "experience", "expertise", "currentlyWorkingAt", "bsc", "msc", "phd", "bio", "researchArea"].map((field) => (
            <p key={field}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {formData[field] || "N/A"}
            </p>
          ))}
          <p>
            <strong>Skills:</strong> {formData.skill.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Academic Interests:</strong> {formData.academicInterests.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Research Paper:</strong>{" "}
            {formData.researchPaper.title ? (
              <a href={formData.researchPaper.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {formData.researchPaper.title}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            <strong>Address:</strong> {`${formData.address.presentAddress}, ${formData.address.city}, ${formData.address.homeTown}` || "N/A"}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ResearcherProfile;
