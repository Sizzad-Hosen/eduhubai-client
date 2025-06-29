"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useUpdateTeacherMutation } from "@/redux/features/userManagement/userMamagement.api";

const TeacherProfile = ({ data }: { data: any }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.profileImg || null);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    address: {
      city: data.address?.city || "",
      homeTown: data.address?.homeTown || "",
      presentAddress: data.address?.presentAddress || "",
    },
  });

  const [updateTeacher] = useUpdateTeacherMutation();

  // Validation function
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim()))
      newErrors.email = "Invalid email address.";
    if (!formData.number.trim()) newErrors.number = "Phone number is required.";
    if (!formData.expertise.trim()) newErrors.expertise = "Expertise is required.";
    if (!formData.university.trim()) newErrors.university = "University is required.";
    if (formData.skill.length === 0) newErrors.skill = "Please add at least one skill.";
    if (!formData.address.city.trim()) newErrors.city = "City is required.";
    if (!formData.address.homeTown.trim()) newErrors.homeTown = "Home Town is required.";
    if (!formData.address.presentAddress.trim()) newErrors.presentAddress = "Present Address is required.";
    return newErrors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
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
    } else if (name === "academicInterests") {
      setFormData((prev) => ({
        ...prev,
        academicInterests: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((s) => s !== skill),
    }));

    if (errors.skill && formData.skill.length > 1) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.skill;
        return copy;
      });
    }
  };

  const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skillInput.trim()) {
      event.preventDefault();
      if (!formData.skill.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skill: [...prev.skill, skillInput.trim()],
        }));
      }
      setSkillInput("");
      if (errors.skill) {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.skill;
          return copy;
        });
      }
    }
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix errors before saving.");
      return;
    }

    try {
      const payload = { ...formData };
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));
      if (selectedFile) {
        formDataToSend.append("file", selectedFile);
      }

      const updatedTeacherData = {
        id: data._id,
        data: formDataToSend,
      };

      const response = await updateTeacher(updatedTeacherData).unwrap();

      setFormData({
        name: response.name || "",
        email: response.email || "",
        number: response.number || "",
        experience: response.experience || "",
        expertise: response.expertise || "",
        skill: response.skill || [],
        university: response.university || "",
        bsc: response.bsc || "",
        msc: response.msc || "",
        phd: response.phd || "",
        academicInterests: response.academicInterests || [],
        bio: response.bio || "",
        address: {
          city: response.address?.city || "",
          homeTown: response.address?.homeTown || "",
          presentAddress: response.address?.presentAddress || "",
        },
      });

      setPreviewUrl(response.profileImg || null);
      toast.success("Profile updated successfully");
      setEditMode(false);
      setErrors({});
    } catch (err: any) {
      toast.error("Failed to update profile: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto px-4 py-6 md:p-8 rounded-2xl shadow-lg border bg-gradient-to-br from-white via-sky-50 to-sky-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 space-y-6">
      <div className="flex justify-end items-center">
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editMode ? (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
          {/* Profile Picture */}
          <div className="md:col-span-2 space-y-2">
            {previewUrl && (
              <div className="flex justify-center mt-2">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-300 dark:ring-blue-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                  <Image src={previewUrl} alt="Profile Picture" fill className="object-cover" />
                </div>
              </div>
            )}
            <label className="block font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>

          {/* Basic Info Fields */}
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["number", "Phone"],
            ["experience", "Experience"],
            ["expertise", "Expertise"],
            ["university", "University"],
            ["bsc", "BSc"],
            ["msc", "MSc"],
            ["phd", "PhD"],
          ].map(([name, label]) => (
            <div key={name} className="relative">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                {label}{" "}
                {["name", "email", "number", "expertise", "university"].includes(name) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <Input
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className={`border rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                type={name === "email" ? "email" : "text"}
              />
              {errors[name] && (
                <p className="text-red-600 text-sm mt-1" role="alert" aria-live="assertive">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Academic Interests */}
          <div className="md:col-span-2 relative">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Academic Interests (comma separated)
            </label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(", ")}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2 relative">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 border rounded-lg p-3 min-h-[48px] bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
              {formData.skill.map((skill) => (
                <div
                  key={skill}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-100 transition"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-grow bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Type skill and press Enter"
                aria-describedby={errors.skill ? "skill-error" : undefined}
              />
            </div>
            {errors.skill && (
              <p id="skill-error" className="text-red-600 text-sm mt-1" role="alert" aria-live="assertive">
                {errors.skill}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2 relative">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Address */}
          {[
            ["city", "City"],
            ["homeTown", "Home Town"],
            ["presentAddress", "Present Address"],
          ].map(([name, label]) => (
            <div key={name} className="relative">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                {label} <span className="text-red-500">*</span>
              </label>
              <Input
                name={name}
                value={(formData.address as any)[name]}
                onChange={handleChange}
                className={`border rounded-md bg-white dark:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <p id={`${name}-error`} className="text-red-600 text-sm mt-1" role="alert" aria-live="assertive">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Save Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <Button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-800 text-white font-semibold shadow-lg rounded-md px-8 py-3"
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
          {previewUrl && (
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-400 dark:ring-blue-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <Image src={previewUrl} alt="Profile Picture" fill className="object-cover" />
              </div>
            </div>
          )}
          {[
            ["Name", formData.name],
            ["Email", formData.email],
            ["Phone", formData.number],
            ["Experience", formData.experience],
            ["Expertise", formData.expertise],
            ["Skills", formData.skill.join(", ")],
            ["University", formData.university],
            ["BSc", formData.bsc],
            ["MSc", formData.msc],
            ["PhD", formData.phd],
            ["Academic Interests", formData.academicInterests.join(", ")],
            ["Bio", formData.bio],
            [
              "Address",
              `${formData.address.presentAddress}, ${formData.address.city}, ${formData.address.homeTown}`,
            ],
          ].map(([label, value]) => (
            <p key={label}>
              <strong>{label}:</strong> {value || <em className="text-gray-400">N/A</em>}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TeacherProfile;
