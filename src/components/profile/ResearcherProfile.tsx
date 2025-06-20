"use client";
import React from "react";

interface ResearcherProfileProps {
  data: any;
}

const ResearcherProfile: React.FC<ResearcherProfileProps> = ({ data }) => {
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">

      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.number}</p>
      <p><strong>Expertise:</strong> {data.expertise}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Skill(s):</strong> {data.skill?.join(", ")}</p>
      <p><strong>BSc:</strong> {data.bsc}</p>
      <p><strong>MSc:</strong> {data.msc}</p>
      <p><strong>PhD:</strong> {data.phd}</p>
      {data.currentlyWorkingAt && (
        <p><strong>Working At:</strong> {data.currentlyWorkingAt}</p>
      )}
      <p><strong>Research Area:</strong> {data.researchArea}</p>
      <p><strong>Bio:</strong> {data.bio}</p>
      <p>
        <strong>Address:</strong>{" "}
        {`${data.address?.presentAddress}, ${data.address?.city}, ${data.address?.homeTown}`}
      </p>

      {data.researchPaper?.length > 0 && (
        <div>
          <strong>Research Papers:</strong>
          <ul className="list-disc ml-5 mt-2">
            {data.researchPaper.map((paper: any, idx: number) => (
              <li key={idx}>
                {paper.url ? (
                  <a
                    href={paper.url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {paper.title}
                  </a>
                ) : (
                  paper.title
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResearcherProfile;
