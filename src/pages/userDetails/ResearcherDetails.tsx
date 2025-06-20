import React from "react";

const ResearcherDetails = ({ data }) => {
  return (
    <div>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.number}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Expertise:</strong> {data.expertise}</p>
      
      <p><strong>Skills:</strong> {Array.isArray(data.skill) ? data.skill.join(", ") : "N/A"}</p>
      <p><strong>Currently Working At:</strong> {data.currentlyWorkingAt}</p>
      
      <p><strong>BSc:</strong> {data.bsc}</p>
      <p><strong>MSc:</strong> {data.msc}</p>
      <p><strong>PhD:</strong> {data.phd}</p>
      
      <p><strong>Academic Interests:</strong> {Array.isArray(data.academicInterests) ? data.academicInterests.join(", ") : "N/A"}</p>
      
      <p><strong>Bio:</strong> {data.bio}</p>
      <p><strong>Research Area:</strong> {data.researchArea}</p>

      <p><strong>Research Papers:</strong></p>
      {Array.isArray(data.researchPaper) && data.researchPaper.length > 0 ? (
        <ul className="list-disc ml-5">
          {data.researchPaper.map((paper, idx) => (
            <li key={idx}>
              <strong>{paper.title}</strong>:{" "}
              <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {paper.link}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No research papers available.</p>
      )}

      <p><strong>Address:</strong>{" "}
        {data.address?.presentAddress || "N/A"},{" "}
        {data.address?.city || "N/A"},{" "}
        {data.address?.homeTown || "N/A"}
      </p>
    </div>
  );
};

export default ResearcherDetails;
