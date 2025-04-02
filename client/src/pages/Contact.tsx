import { useState } from "react";
import { Helmet } from "react-helmet";
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

const Contact = () => {
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
    <>
      <Helmet>
        <title>Contact Us - DMAP Construction</title>
        <meta name="description" content="Get in touch with DMAP Construction for your government building retrofitting needs" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for project inquiries or to discuss your building retrofitting needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form 
                className="bg-white p-8 rounded-lg shadow-md"
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
                      <p className="text-gray-600">123 Construction Avenue, Suite 400<br />Metropolis, CA 90001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-envelope"></i></span>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-gray-600">projects@dmapconstruction.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-[var(--secondary-600)] mt-1 mr-3"><i className="fas fa-phone-alt"></i></span>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                {/* Using iframe for Google Maps embed */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.24304388430832!3d34.05372438060642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c64e00d2a997%3A0x445d9f45f0d992cd!2sLos%20Angeles%20City%20Hall!5e0!3m2!1sen!2sus!4v1677723238079!5m2!1sen!2sus" 
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

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--primary-800)] mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">What types of government buildings do you work with?</h3>
                <p className="text-gray-600">
                  We work with a wide range of government facilities including administrative buildings, 
                  courthouses, schools, libraries, police stations, fire stations, and other municipal structures.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">How long does a typical retrofitting project take?</h3>
                <p className="text-gray-600">
                  Project timelines vary based on scope, complexity, and building size. Small to medium projects 
                  typically take 3-6 months, while larger comprehensive retrofits may take 6-12 months or more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">Do you handle all the necessary permits and approvals?</h3>
                <p className="text-gray-600">
                  Yes, we manage the entire permitting process including preparing documentation, submitting 
                  applications, and coordinating with regulatory authorities to ensure full compliance.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">Can you work on occupied buildings?</h3>
                <p className="text-gray-600">
                  Yes, we specialize in retrofitting occupied buildings with minimal disruption. We develop 
                  phased implementation plans and coordinate closely with facility management to maintain operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
