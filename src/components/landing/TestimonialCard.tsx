import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import testimonials from "./Testimonial";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function TestimonialCard() {
  return (
    <div className="container space-y-12 py-12">
      <h2 className="text-3xl font-bold text-center">What our customers say</h2>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s profile picture`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
