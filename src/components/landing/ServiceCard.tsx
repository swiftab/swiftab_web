import React from "react";
import { Card, CardContent } from "../ui/card";
import services from "./Service";

export default function ServiceCard() {
  return (
    <div className="container space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="text-xl text-muted-foreground">
          Elevate Your Dining Experience with SwifTab's Premium Services
        </p>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ title, description, icon: Icon }, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="p-6 space-y-4">
              {/* Icon */}
              <div className="flex items-center flex-col space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                {/* Title */}
                <h3 className="font-semibold text-xl text-center">{title}</h3>
              </div>
              {/* Description */}
              <p className="text-muted-foreground text-center">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
