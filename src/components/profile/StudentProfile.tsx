"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useUpdateStudentMutation } from "@/redux/features/userManagement/userMamagement.api";

const StudentProfile = ({ data }: { data: any }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.profileImg || null);

  const [formData, setFormData] = useState({
    name: data.name || "",
    email: data.email || "",
    number: data.number || "",
    experience: data.experience || "",
    skill: data.skill || [],
    university: data.university || "",
    course: data.course || "",
    academicInterests: data.academicInterests || [],
    bio: data.bio || "",
    address: {
      city: data.address?.city || "",
      homeTown: data.address?.homeTown || "",
      presentAddress: data.address?.presentAddress || "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [updateStudent] = useUpdateStudentMutation();

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
        address: { ...prev.address, [name]: value },
      }));
    } else if (name === "academicInterests") {
      setFormData((prev) => ({
        ...prev,
        academicInterests: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skill: prev.skill.filter((s) => s !== skill) }));
  };

  const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === ",") && skillInput.trim()) {
      event.preventDefault();
      if (!formData.skill.includes(skillInput.trim())) {
        setFormData((prev) => ({ ...prev, skill: [...prev.skill, skillInput.trim()] }));
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim()))
      newErrors.email = "Invalid email address.";
    if (!formData.number.trim()) newErrors.number = "Phone number is required.";
    if (formData.skill.length === 0) newErrors.skill = "Please add at least one skill.";
    if (!formData.university.trim()) newErrors.university = "University is required.";
    if (!formData.course.trim()) newErrors.course = "Course is required.";
    if (!formData.address.city.trim()) newErrors.city = "City is required.";
    if (!formData.address.homeTown.trim()) newErrors.homeTown = "Home Town is required.";
    if (!formData.address.presentAddress.trim()) newErrors.presentAddress = "Present Address is required.";

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before saving.");
      return;
    }

    try {
      const payload = { ...formData };
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));
      formDataToSend.append("studentId", data._id);
      if (selectedFile) formDataToSend.append("file", selectedFile);

      const updatedStudentData = { id: data._id, data: formDataToSend };
      const response = await updateStudent(updatedStudentData).unwrap();

      // Update local state with response
      setPreviewUrl(response.profileImg || null);
      setFormData({
        name: response.name || "",
        email: response.email || "",
        number: response.number || "",
        experience: response.experience || "",
        skill: response.skill || [],
        university: response.university || "",
        course: response.course || "",
        academicInterests: response.academicInterests || [],
        bio: response.bio || "",
        address: {
          city: response.address?.city || "",
          homeTown: response.address?.homeTown || "",
          presentAddress: response.address?.presentAddress || "",
        },
      });

      toast.success("Profile updated successfully");
      setEditMode(false);
      setErrors({});
    } catch (err: any) {
      toast.error("Failed to update profile: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <Card className="p-6 sm:p-8 max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-lg space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setEditMode(!editMode)} className="hover:text-white transition">
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editMode ? (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Profile Picture */}
          <div className="md:col-span-2 space-y-2">
            {previewUrl && (
              <div className="flex justify-center mt-2">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-400 dark:ring-indigo-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
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

          {/* Basic Inputs */}
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["number", "Phone"],
            ["experience", "Experience"],
            ["university", "University"],
            ["course", "Course"],
          ].map(([name, label]) => (
            <div key={name} className="relative">
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                {label} {["name", "email", "number", "university", "course"].includes(name) && <span className="text-red-500">*</span>}
              </label>
              <Input
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                type={name === "email" ? "email" : "text"}
                className={`border rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition
                ${errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
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
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">Academic Interests (comma separated)</label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(", ")}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2 relative">
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 border rounded-md p-3 min-h-[40px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              {formData.skill.map((skill) => (
                <div
                  key={skill}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center space-x-2 shadow-md"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-white font-bold hover:text-indigo-300"
                    aria-label={`Remove skill ${skill}`}
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
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">Bio</label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Address */}
          {[
            ["city", "City"],
            ["homeTown", "Home Town"],
            ["presentAddress", "Present Address"],
          ].map(([name, label]) => (
            <div key={name} className={name === "presentAddress" ? "md:col-span-2 relative" : "relative"}>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                {label} <span className="text-red-500">*</span>
              </label>
              <Input
                name={name}
                value={(formData.address as any)[name]}
                onChange={handleChange}
                className={`border rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition
                  ${errors[name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
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
          <div className="md:col-span-2 flex justify-center mt-4">
            <Button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg transition rounded-md px-8 py-3"
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
          {previewUrl && (
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-400 dark:ring-indigo-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <Image src={previewUrl} alt="Profile Picture" fill className="object-cover" />
              </div>
            </div>
          )}
          {[
            ["Name", formData.name],
            ["Email", formData.email],
            ["Phone", formData.number],
            ["Experience", formData.experience],
            ["Skills", formData.skill.join(", ")],
            ["University", formData.university],
            ["Course", formData.course],
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

export default StudentProfile;
