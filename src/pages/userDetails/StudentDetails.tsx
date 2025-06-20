import React from 'react'

export const StudentDetails = ({ data }) => {
  if (!data) return <p>No data available.</p>;

  return (
    <div>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.number}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Skills:</strong> {(data.skill || []).join(", ")}</p>
      <p><strong>University:</strong> {data.university}</p>
      <p><strong>Course:</strong> {data.course}</p>
      <p><strong>Academic Interests:</strong> {(data.academicInterests || []).join(", ")}</p>
      <p><strong>Bio:</strong> {data.bio}</p>
      <p>
        <strong>Address:</strong>{" "}
        {data.address?.presentAddress}, {data.address?.city}, {data.address?.homeTown}
      </p>
    </div>
  );
};
