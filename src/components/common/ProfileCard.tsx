"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type ProfileCardProps = {
  id: string;
  name: string;
  userType: "students" | "teachers" | "researchers";
  email: string;
  university: string;
  skills: string[];
  city: string;
  presentAddress: string;
  profileImg?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  userType,
  email,
  university,
  skills,
  city,
  presentAddress,
  profileImg,
}) => {
  const router = useRouter();


  const handleCardClick = () => {
    console.log("Navigating to  details:", id);
    router.push(`/${userType}/${id}`);
  };

  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-lg transition">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={profileImg || undefined} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-700">
          <p><span className="font-medium">University:</span> {university}</p>
          <p><span className="font-medium">Location:</span> {city}, {presentAddress}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge key={i} className="bg-blue-100 text-blue-700">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={handleCardClick}>
            Details
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
