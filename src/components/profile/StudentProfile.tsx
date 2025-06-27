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
  const [localData, setLocalData] = useState(data);
  const [previewUrl, setPreviewUrl] = useState<string | null>(localData.profileImg || null);

  const [formData, setFormData] = useState({
    name: localData.name || "",
    email: localData.email || "",
    number: localData.number || "",
    experience: localData.experience || "",
    skill: localData.skill || [],
    university: localData.university || "",
    course: localData.course || "",
    academicInterests: localData.academicInterests || [],
    bio: localData.bio || "",
    address: {
      city: localData.address?.city || "",
      homeTown: localData.address?.homeTown || "",
      presentAddress: localData.address?.presentAddress || "",
    },
  });

  const [updateStudent] = useUpdateStudentMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (["city", "homeTown", "presentAddress"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skill: prev.skill.filter((s) => s !== skill) }));
  };

  const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skillInput.trim()) {
      event.preventDefault();
      if (!formData.skill.includes(skillInput.trim())) {
        setFormData((prev) => ({ ...prev, skill: [...prev.skill, skillInput.trim()] }));
      }
      setSkillInput("");
    }
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData, skill: formData.skill, academicInterests: formData.academicInterests };
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));
      formDataToSend.append("studentId", data._id);
      if (selectedFile) formDataToSend.append("file", selectedFile);

      const updatedStudentData = { id: data._id, data: formDataToSend };
      const response = await updateStudent(updatedStudentData).unwrap();

      setLocalData(response);
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
      setPreviewUrl(response.profileImg || null);

      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile: " + err.message);
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="md:col-span-2 space-y-2">
            {previewUrl && (
              <div className="flex justify-center mt-2">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-400 dark:ring-indigo-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                  <Image src={previewUrl} alt="Profile Picture" layout="fill" className="object-cover" />
                </div>
              </div>
            )}
            <label className="block font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
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
            <div key={name}>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">{label}</label>
              <Input
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
                type={name === "email" ? "email" : "text"}
              />
            </div>
          ))}

          {/* Academic Interests */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">Academic Interests (comma separated)</label>
            <Input
              name="academicInterests"
              value={formData.academicInterests.join(", ")}
              onChange={(e) => setFormData({ ...formData, academicInterests: e.target.value.split(",").map((s) => s.trim()) })}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Skills</label>
            <div className="flex flex-wrap gap-2 border border-gray-300 dark:border-gray-600 rounded-md p-3 min-h-[40px] bg-white dark:bg-gray-800">
              {formData.skill.map((skill) => (
                <div key={skill} className="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center space-x-2 shadow-md">
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeSkill(skill)} className="text-white font-bold hover:text-indigo-300" aria-label={`Remove skill ${skill}`}>
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
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">Bio</label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
              rows={4}
            />
          </div>

          {/* Address */}
          {[
            ["city", "City"],
            ["homeTown", "Home Town"],
            ["presentAddress", "Present Address"],
          ].map(([name, label]) => (
            <div key={name} className={name === "presentAddress" ? "md:col-span-2" : ""}>
              <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">{label}</label>
              <Input
                name={name}
                value={(formData.address as any)[name]}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
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
        // Read only view
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
          {previewUrl && (
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-400 dark:ring-indigo-600 shadow-md bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <Image src={previewUrl} alt="Profile Picture" layout="fill" className="object-cover" />
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
