"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Cog, Star, Package, DollarSign, Save } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { FullScreenLoader } from "@/components/Loading/FullScreen";
import { fetchAdminInfo } from "@/hooks/authhook/authhooks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface FormDataType {
  restaurant: {
    image: string;
    name: string;
    cuisine: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    hours: { day: string; open: boolean; from: string; to: string }[];
  };
  profile: {
    firstName: string;
    email: string;
  };
}
const Container = () => {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [isFormChanged, setIsFormChanged] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["adminInfo"],
    queryFn: fetchAdminInfo,
  });

  useEffect(() => {
    setIsFormChanged(false);
  }, [activeTab]);

  const [formData, setFormData] = useState<FormDataType>({
    restaurant: {
      image: "",
      name: "",
      cuisine: "Italian",
      city: "",
      state: "",
      zip: "03463",
      phone: "",
      email: "",
      hours: [
        { day: "Monday", open: true, from: "10:00", to: "18:00" },
        { day: "Tuesday", open: false, from: "", to: "" },
        { day: "Wednesday", open: true, from: "10:00", to: "18:00" },
        { day: "Thursday", open: true, from: "10:00", to: "18:00" },
        { day: "Friday", open: true, from: "10:00", to: "18:00" },
        { day: "Saturday", open: false, from: "", to: "" },
        { day: "Sunday", open: false, from: "", to: "" },
      ],
    },
    profile: {
      firstName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      const {
        name,
        email,
        phoneNumber,
        restaurantName,
        location,
        image,
        restaurantEmail,
      } = data;

      setFormData({
        restaurant: {
          image: image,
          name: restaurantName,
          cuisine: "",
          city: location,
          state: location,
          zip: "03463",
          phone: phoneNumber,
          email: restaurantEmail,
          hours: [
            { day: "Monday", open: true, from: "10:00", to: "18:00" },
            { day: "Tuesday", open: false, from: "", to: "" },
            { day: "Wednesday", open: true, from: "10:00", to: "18:00" },
            { day: "Thursday", open: true, from: "10:00", to: "18:00" },
            { day: "Friday", open: true, from: "10:00", to: "18:00" },
            { day: "Saturday", open: false, from: "", to: "" },
            { day: "Sunday", open: false, from: "", to: "" },
          ],
        },
        profile: {
          firstName: name,
          email: email,
        },
      });
    }
  }, [data]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <div>Error fetching admin info: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleInputChange = <K extends keyof FormDataType>(
    section: K,
    field: keyof FormDataType[K],
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setIsFormChanged(true);
  };

  const handleHoursChange = (
    index: number,
    field: "open" | "from" | "to",
    value: string | boolean
  ) => {
    setFormData((prev) => {
      const updatedHours = [...prev.restaurant.hours];

      updatedHours[index] = {
        ...updatedHours[index],
        [field]: value,
      };

      return {
        ...prev,
        restaurant: {
          ...prev.restaurant,
          hours: updatedHours,
        },
      };
    });

    setIsFormChanged(true);
  };

  const handleSaveChanges = () => {
    // Here you would typically send the data to your API
    console.log("Saving changes:", formData);

    // Show success toast
    Toast({
      title: "Changes saved",
      //description: "Your changes have been successfully saved.",
      duration: 3000,
    });

    setIsFormChanged(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="analytics">Subscription</TabsTrigger>
        </TabsList>

        {/* Restaurant Settings Tab */}
        <TabsContent value="restaurant" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Info */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">General Info</h2>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <Image
                      src={formData.restaurant.image}
                      alt="restaurant image"
                      width={100}
                      height={100}
                    />
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Upload new picture
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      value={formData.restaurant.name}
                      onChange={(e) =>
                        handleInputChange("restaurant", "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine</Label>
                    <Input
                      id="cuisine"
                      value={formData.restaurant.cuisine}
                      onChange={(e) =>
                        handleInputChange(
                          "restaurant",
                          "cuisine",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.restaurant.city}
                      onChange={(e) =>
                        handleInputChange("restaurant", "city", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.restaurant.state}
                      onChange={(e) =>
                        handleInputChange("restaurant", "state", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.restaurant.zip}
                      onChange={(e) =>
                        handleInputChange("restaurant", "zip", e.target.value)
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.restaurant.phone}
                      onChange={(e) =>
                        handleInputChange("restaurant", "phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.restaurant.email}
                      onChange={(e) =>
                        handleInputChange("restaurant", "email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>

                <div className="space-y-4">
                  {formData.restaurant.hours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between"
                    >
                      <div className="w-32">
                        <p className="font-medium">{schedule.day}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={schedule.open}
                          onCheckedChange={(checked) =>
                            handleHoursChange(index, "open", checked)
                          }
                        />
                        <span className="text-sm min-w-16">
                          {schedule.open ? "Open" : "Closed"}
                        </span>
                      </div>
                      {schedule.open && (
                        <div className="flex items-center gap-2">
                          <Input
                            className="w-20"
                            value={schedule.from}
                            onChange={(e) =>
                              handleHoursChange(index, "from", e.target.value)
                            }
                          />
                          <span>-</span>
                          <Input
                            className="w-20"
                            value={schedule.to}
                            onChange={(e) =>
                              handleHoursChange(index, "to", e.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Changes Button for Restaurant Tab */}
          {isFormChanged && (
            <div className="fixed bottom-4 right-4 z-10">
              <Button
                className="shadow-lg flex items-center gap-2"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Settings */}
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex gap-4 mb-4">
                    <Button variant="outline" className="px-0 border-0">
                      Account
                    </Button>
                    <Button variant="ghost" className="px-0">
                      Notifications
                    </Button>
                  </div>
                  <div className="h-0.5 bg-gray-100 mb-6"></div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Account</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Please configure your profile and fill in your information.
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <Image
                      src="/api/placeholder/100/100"
                      alt="User Avatar"
                      width={100}
                      height={100}
                    />
                  </Avatar>
                  <div>
                    <Button
                      variant="ghost"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500">
                      Pick a photo up to 4 MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={formData.profile.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "profile",
                          "firstName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      value={formData.profile.email}
                      onChange={(e) =>
                        handleInputChange("profile", "email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Password</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Change your password.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="bg-orange-50 text-orange-500 hover:bg-orange-100"
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Notification</h2>
                  <Button variant="ghost" size="icon">
                    <Cog className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="rounded-full bg-red-100 p-2">
                      <DollarSign className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm">
                        Your restaurant{" "}
                        <span className="font-medium">'Whispering Willow'</span>{" "}
                        has achieved total sales of{" "}
                        <span className="font-medium">$5,432.87</span> today
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="rounded-full bg-green-100 p-2">
                      <Package className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm">
                        The stock level of{" "}
                        <span className="font-medium">Chicken Breast</span> at{" "}
                        <span className="font-medium">'Whispering Willow'</span>{" "}
                        is below the threshold. Reorder soon to avoid shortages.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Star className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm">
                        A customer at{" "}
                        <span className="font-medium">'Whispering Willow'</span>{" "}
                        has left a 5-star review.{" "}
                        <span className="text-blue-500">Click here</span> to
                        read their comments.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Changes Button for Profile Tab */}
          {isFormChanged && (
            <div className="fixed bottom-4 right-4 z-10">
              <Button
                className="shadow-lg flex items-center gap-2"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="subscription">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
              <p className="text-gray-500">
                View detailed sales and traffic analytics for your restaurant.
              </p>

              <div className="h-64 bg-gray-100 rounded-lg mt-6 flex items-center justify-center">
                <p className="text-gray-500">
                  Analytics dashboard will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Container;
