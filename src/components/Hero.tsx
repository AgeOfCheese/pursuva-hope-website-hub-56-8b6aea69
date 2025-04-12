
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-white z-0"></div>
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
          alt="Code background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/802db8de-7a0a-4d81-887c-b28d6e701edb.png" 
              alt="Pursuva Logo" 
              className="w-32 h-32 mx-auto animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
            Empowering Through Education
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Quality courses and personalized tutoring in Python, Java, Mathematics, and test preparation for students of all backgrounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-pursuva-blue text-pursuva-blue hover:bg-pursuva-blue hover:text-white transition-al">
              <a href="#programs">Explore Our Courses</a>
            </Button>
            <Button size="lg" variant="outline" className="border-pursuva-purple text-pursuva-purple hover:bg-pursuva-purple hover:text-white transition-all">
              Meet Our Tutors
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 animate-bounce">
        <a href="#about" className="text-gray-700">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
