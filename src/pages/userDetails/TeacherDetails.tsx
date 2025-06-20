import React from 'react'

const TeacherDetails = ({data}) => {
  return (
    <div>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.number}</p>
          <p><strong>Experience:</strong> {data.experience}</p>
          <p><strong>Expertise:</strong> {data.expertise}</p>
          <p><strong>Skills:</strong> {data.skill.join(", ")}</p>
          <p><strong>CurrentlyWorkingAt:</strong> {data.currentlyWorkingAt}</p>
          <p><strong>Bsc:</strong> {data.bsc}</p>
          <p><strong>Msc:</strong> {data.msc}</p>
          <p><strong>PhD:</strong> {data.phd}</p>
          <p><strong>Academic Interests:</strong> {data.academicInterests.join(", ")}</p>
          <p><strong>Bio:</strong> {data.bio}</p>
          <p><strong>ResearchArea:</strong> {data.researchArea}</p>
          <p><strong>ResearchPaper:</strong> {data.researchPaper.title}</p>
          <p>
            <strong>Address:</strong>{" "}
            {data.address.presentAddress}, {data.address.city}, {data.address.homeTown}
          </p>
          
          </div>
  )
}

export default TeacherDetails