"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {useUpdateResearcherMutation } from "@/redux/features/userManagement/userMamagement.api";
import GlobalLoader from "../common/GlobalLoader";

const ResearcherProfile = ({ data }: { data: any }) => {

const [ updateResearcher, loading] = useUpdateResearcherMutation();



  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileUrl);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((s) => s !== skill),
    }));
  };
  

const [localData, setLocalData] = useState(data);

const [formData, setFormData] = useState({
  name: localData.name || "",
  email: localData.email || "",
  number: localData.number || "",
  experience: localData.experience || "",
   expertise: localData.expertise || "",
  skill: localData.skill || [],
  university: localData.university || "",
  bsc: localData.bsc || "",
 msc: localData.msc || "",
 phd: localData.phd || "",
  academicInterests: localData.academicInterests || [],
  bio: localData.bio || "",
  currentlyWorkingAt: localData.currentlyWorkingAt || "",
  researchArea:localData.researchArea || "",
  researchPaper: {
    title: localData.researchPaper?.title || "",
    link: localData.researchPaper?.link || "",

    
  },
  address: {
    city: localData.address?.city || "",
    homeTown: localData.address?.homeTown || "",
    presentAddress: localData.address?.presentAddress || "",
  },
});

const [previewUrl, setPreviewUrl] = useState<string | null>(localData.profileImg || null);

const handleSave = async () => {
  try {
    const payload = {
      ...formData,
      skill: formData.skill,
    researchPaper: Array.isArray(formData.researchPaper)
    ? formData.researchPaper.filter(paper => paper?.title?.trim()) 
    : [formData.researchPaper],


    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(payload));
  

    if (selectedFile) {
      formDataToSend.append("file", selectedFile);
    }

    
    const updatedResearcherData = {
      id: data._id,
      data: formDataToSend,
    };


    const response = await updateResearcher(updatedResearcherData).unwrap();

    setLocalData(response);

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
      currentlyWorkingAt: response.currentlyWorkingAt || "",
      researchArea: response.researchArea || "",
      researchPaper: {
        title: response.researchPaper?.title || "",
        link: response.researchPaper?.link || "",
      },
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


  function handleSkillKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
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
  }


  if(loading)
  {
    <GlobalLoader></GlobalLoader>
  }
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">🎓 Researcher Profile</h2>
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>
      {editMode ? (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="block font-medium">Profile Picture</label>
          
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div>
            <label className="block mb-1">Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <Input name="number" value={formData.number} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Experience</label>
            <Input name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Expertise</label>
            <Input name="expertise" value={formData.expertise} onChange={handleChange} />
          </div>
          
          <div>
            <label className="block mb-1">CurrentlyWorkingAt</label>
            <Input name="currentlyWorkingAt" value={formData.currentlyWorkingAt} onChange={handleChange} />
          </div>


          <div>
            <label className="block mb-1">Bsc</label>
            <Input name="bsc" value={formData.bsc} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Msc</label>
            <Input name="msc" value={formData.msc} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">PHD</label>
            <Input name="phd" value={formData.phd} onChange={handleChange} />
          </div>
          
          <div>
            <label className="block mb-1">ResearchArea</label>

            <Input name="researchArea" value={formData.researchArea} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Research Paper</label>
            <Input
              name="researchPaperTitle"
              placeholder="Title"
              value={formData.researchPaper.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  researchPaper: { ...formData.researchPaper.title, title: e.target.value },
                })
              }
            />
            <Input
              name="researchPaperLink"
              value={formData.researchPaper.link}
              placeholder="Link"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  researchPaper: { ...formData.researchPaper.link, link: e.target.value },
                })
              }
            />
        
  </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Academic Interests (comma separated)</label>
            <Input
              name="academicInterests"
              value={formData.academicInterests}
              onChange={(e) => setFormData({ ...formData, academicInterests: e.target.value.split(",") })}
            />
          </div>

        <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Skills</label>
            <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[40px]">
              {formData.skill.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-white font-bold hover:text-gray-200"
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
                className="flex-grow outline-none"
                placeholder="Type skill and press Enter"
              />
            </div>
          </div>


          <div className="md:col-span-2">
            <label className="block mb-1">Bio</label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">City</label>
            <Input name="city" value={formData.address.city} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Home Town</label>
            <Input name="homeTown" value={formData.address.homeTown} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">Present Address</label>
            <Input name="presentAddress" value={formData.address.presentAddress} onChange={handleChange} />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <Button type="button" onClick={handleSave} className="bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          {data.profileImg && (
            <Image
              src={data.profileImg}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
       
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.number}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Expertise:</strong> {formData.expertise}</p>
          <p><strong>Skills:</strong> {formData.skill.join(", ")}</p>
          <p><strong>CurrentlyWorkingAt:</strong> {formData.currentlyWorkingAt}</p>
          <p><strong>Bsc:</strong> {formData.bsc}</p>
          <p><strong>Msc:</strong> {formData.msc}</p>
          <p><strong>PhD:</strong> {formData.phd}</p>
          <p><strong>Academic Interests:</strong> {formData.academicInterests.join(", ")}</p>
          <p><strong>Bio:</strong> {formData.bio}</p>
          <p><strong>ResearchArea:</strong> {formData.researchArea}</p>
          <p><strong>ResearchPaper:</strong> {formData.researchPaper.title}</p>
          <p>
            <strong>Address:</strong>{" "}
            {formData.address.presentAddress}, {formData.address.city}, {formData.address.homeTown}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ResearcherProfile;
