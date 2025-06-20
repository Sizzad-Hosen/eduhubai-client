import React from 'react';

interface Teacher {
  name: string;
  email?: string;
  number?: string;
  experience?: string;
  expertise?: string;
  skill?: string[];
  currentlyWorkingAt?: string;
  bsc?: string;
  msc?: string;
  phd?: string;
  academicInterests?: string[];
  bio?: string;
  researchArea?: string;
  researchPaper?: {
    title?: string;
  };
  address?: {
    presentAddress?: string;
    city?: string;
    homeTown?: string;
  };
}

interface TeacherDetailsProps {
  data: Teacher;
}

const TeacherDetails = ({ data }: TeacherDetailsProps) => {
  // Helper function to safely join arrays
  const safeJoin = (arr?: string[], separator = ", ") => {
    return arr?.join(separator) || "Not specified";
  };

  return (
    <div className="space-y-2 p-4">
      <p><strong>Name:</strong> {data.name || "Not provided"}</p>
      <p><strong>Email:</strong> {data.email || "Not provided"}</p>
      <p><strong>Phone:</strong> {data.number || "Not provided"}</p>
      <p><strong>Experience:</strong> {data.experience || "Not provided"}</p>
      <p><strong>Expertise:</strong> {data.expertise || "Not provided"}</p>
      <p><strong>Skills:</strong> {safeJoin(data.skill)}</p>
      <p><strong>Currently Working At:</strong> {data.currentlyWorkingAt || "Not provided"}</p>
      <p><strong>BSc:</strong> {data.bsc || "Not provided"}</p>
      <p><strong>MSc:</strong> {data.msc || "Not provided"}</p>
      <p><strong>PhD:</strong> {data.phd || "Not provided"}</p>
      <p><strong>Academic Interests:</strong> {safeJoin(data.academicInterests)}</p>
      <p><strong>Bio:</strong> {data.bio || "Not provided"}</p>
      <p><strong>Research Area:</strong> {data.researchArea || "Not provided"}</p>
      <p><strong>Research Paper:</strong> {data.researchPaper?.title || "Not provided"}</p>
      <p>
        <strong>Address:</strong>{" "}
        {data.address ? 
          `${data.address.presentAddress || ""}, ${data.address.city || ""}, ${data.address.homeTown || ""}`.replace(/, ,/g, "").trim() 
          : "Not provided"
        }
      </p>
    </div>
  );
};

export default TeacherDetails;