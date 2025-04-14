import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message should be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the form data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-2">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for project inquiries or to discuss your building retrofitting needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form 
              className="bg-gray-50 p-8 rounded-lg shadow-md"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent ${
                    form.formState.errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent ${
                    form.formState.errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent"
                  placeholder="Enter your phone number"
                  {...form.register("phone")}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent ${
                    form.formState.errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us about your project"
                  {...form.register("message")}
                ></textarea>
                {form.formState.errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-6 rounded-md font-medium transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-map-marker-alt"></i></span>
                  <div>
                    <p className="font-medium">Our Office</p>
                    <p className="text-gray-600">201 , 29 Rustom Building, Veer Nariman Road Fort Mumbai ‐400023 </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-envelope"></i></span>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-gray-600">dmaprccmum@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-phone-alt"></i></span>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-gray-600">+91 9136994232</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
              {/* Using iframe for Google Maps embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.87414092539964!2d72.83290969624501!3d18.93200253514945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1dcb04b79c5%3A0x7eac716283cf984d!2sRustom%20Building%2C%20Veer%20Nariman%20Rd%2C%20Kala%20Ghoda%2C%20Fort%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1744634052984!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DMAP Construction Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
