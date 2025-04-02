import { testimonials } from "@/data/testimonials";

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[var(--primary-800)] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-2">Client Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What our partners and clients say about working with us
          </p>
        </div>
        
        <div className="testimonial-slider relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card bg-white rounded-lg shadow-md p-6">
                <div className="text-yellow-500 flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas ${i < testimonial.rating ? "fa-star" : i === testimonial.rating && testimonial.halfStar ? "fa-star-half-alt" : "fa-star-o"}`}></i>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--primary-800)]">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <div className="inline-flex space-x-2">
              <span className="w-3 h-3 bg-[var(--primary-800)] rounded-full"></span>
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
