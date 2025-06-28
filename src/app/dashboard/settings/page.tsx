"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">⚙️ Account Settings</h1>
        <span className="self-start sm:self-center text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full">
          Premium Member
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Email Recovery - Mobile first single column, lg breakpoint shows 2 columns */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Email Recovery</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="current-email" className="text-sm sm:text-base">Current Email</Label>
                <Input
                  id="current-email"
                  type="email"
                  value="user@example.com"
                  disabled
                  className="mt-1 bg-gray-100 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="new-email" className="text-sm sm:text-base">New Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="Enter new email"
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="confirm-email" className="text-sm sm:text-base">Confirm New Email</Label>
                <Input
                  id="confirm-email"
                  type="email"
                  placeholder="Confirm new email"
                  className="mt-1 text-sm sm:text-base"
                />
              </div>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                Update Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Management */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Password Management</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm sm:text-base">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="new-password" className="text-sm sm:text-base">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm-password" className="text-sm sm:text-base">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                  Change Password
                </Button>
                <Button variant="default" className="w-full sm:w-auto text-sm sm:text-base">
                  Forgot Password?
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings - Full width on all devices */}
        <Card className="border border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Two-Factor Authentication</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch className="mt-1 sm:mt-0" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Login Notifications</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Get alerts for new logins
                  </p>
                </div>
                <Switch className="mt-1 sm:mt-0" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Session Timeout</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Automatically log out after 30 minutes of inactivity
                  </p>
                </div>
                <Switch className="mt-1 sm:mt-0" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Preferences - Full width on all devices */}
        <Card className="border border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Account Preferences</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="language" className="text-sm sm:text-base">Language</Label>
                <select
                  id="language"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm sm:text-base"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone" className="text-sm sm:text-base">Timezone</Label>
                <select
                  id="timezone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm sm:text-base"
                >
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Dark Mode</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch className="mt-1 sm:mt-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone - Full width on all devices */}
      <Card className="border border-red-200 bg-red-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="font-medium text-sm sm:text-base">Delete Account</h3>
                <p className="text-xs sm:text-sm text-red-500">
                  Permanently remove your account and all data
                </p>
              </div>
              <Button variant="default" className="w-full sm:w-auto mt-1 sm:mt-0 text-sm sm:text-base">
                Delete Account
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="font-medium text-sm sm:text-base">Export Data</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Download all your data in JSON format
                </p>
              </div>
              <Button variant="default" className="w-full sm:w-auto mt-1 sm:mt-0 text-sm sm:text-base">
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}