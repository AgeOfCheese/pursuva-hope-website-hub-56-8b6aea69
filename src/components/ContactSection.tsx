
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string;
  link?: string;
}

const ContactInfoItem = ({ icon, title, details, link }: ContactInfo) => {
  return (
    <div className="flex items-start">
      <div className="bg-pursuva-blue/10 p-3 rounded-md mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        {link ? (
          <a href={link} className="text-gray-700 hover:text-pursuva-blue transition-colors">
            {details}
          </a>
        ) : (
          <p className="text-gray-700">{details}</p>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="text-pursuva-blue" />,
      title: "Email Us",
      details: "pursuvaedu@gmail.com",
      link: "mailto:pursuvaedu@gmail.com"
    },
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions about our courses or interested in tutoring? Get in touch with us and we'll help you get started.
          </p>
        </div>
        
        <div className="lg:flex gap-8 items-start">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactInfoItem key={index} {...info} />
              ))}
              
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-3">Connect With Us</h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                    <a 
                      key={platform} 
                      href={`#${platform}`} 
                      className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center hover:bg-pursuva-blue hover:text-white transition-colors"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <img 
                        src={`https://api.iconify.design/lucide/${platform}.svg`} 
                        alt={platform} 
                        width="18" 
                        height="18" 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Course Inquiry"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'm interested in learning more about..."
                  rows={4}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-pursuva-blue hover:bg-pursuva-blue/90 text-white w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
