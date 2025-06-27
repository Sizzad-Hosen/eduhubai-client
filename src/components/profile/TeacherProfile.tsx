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
  // State to toggle edit mode
  const [editMode, setEditMode] = useState(false);

  // Store selected profile image file for upload & preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.profileImg || null);

  // Skill input (for adding new skill on Enter)
  const [skillInput, setSkillInput] = useState("");

  // Local copy of data for editing
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

  // Handle profile picture file selection & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileUrl);
    }
  };

  // Handle form input changes
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

  // Remove a skill tag
  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((s) => s !== skill),
    }));
  };

  // Add skill on Enter keypress
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
    }
  };

  // Save updated data handler
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        skill: formData.skill,
        academicInterests: formData.academicInterests,
      };

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

      // Update local state with response
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
    } catch (err: any) {
      toast.error("Failed to update profile: " + err.message);
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Profile Picture */}
          <div className="md:col-span-2 space-y-2">
            {previewUrl && (
              <div className="flex justify-center mt-2">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-300 dark:ring-blue-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                  <Image src={previewUrl} alt="Profile Picture" layout="fill" className="object-cover" />
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
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <Input name={name} value={(formData as any)[name]} onChange={handleChange} />
            </div>
          ))}

          {/* Academic Interests */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Academic Interests (comma separated)
            </label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(",")}
              onChange={(e) => setFormData({ ...formData, academicInterests: e.target.value.split(",") })}
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Skills</label>
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
                className="flex-grow outline-none bg-transparent text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="Type skill and press Enter"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          {/* Address Fields */}
          {[
            ["city", "City"],
            ["homeTown", "Home Town"],
            ["presentAddress", "Present Address"],
          ].map(([name, label]) => (
            <div className={name === "presentAddress" ? "md:col-span-2" : ""} key={name}>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <Input
                name={name}
                value={(formData.address as any)[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Save Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <Button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium shadow-md transition"
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        // Display mode (read-only)
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-blue-300 dark:ring-blue-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
              <Image
                src={previewUrl || "/default-avatar.png"}
                alt="Profile"
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>

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
