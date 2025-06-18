export type MetaData ={
  total:number;
  page:number;
  limit:number;
  totalPages:number
}


export interface TTeacher {
  password: string | undefined;
  name: string;
  email: string;
  number: string;
  address: Address;
  expertise:string;
  experience: string;        
  skill: string[];          
  bsc: string;            
  msc?: string;          
  phd?: string;           
  currentlyWorkingAt?: string; 
  bio: string;
  profileImg?: string;
}



export type Address = {
  city: string;
  homeTown: string;
  presentAddress: string;
};

export interface TResearcher {
  name: string;
  email: string;
  password:string;
  number: string;
  address: Address;
  expertise: string;
  experience: string;
 skill: string[];  
  bsc: string;
  msc: string;
  phd: string;
  currentlyWorkingAt?: string;
  bio: string;

  profileImg?: string;

  // ✅ New fields
  researchArea?: string;
  researchPaper?: {
    title: string;
    url?: string;         // For hosted link
    pdfFile?: string;     // For uploaded file path
  }[];
}
