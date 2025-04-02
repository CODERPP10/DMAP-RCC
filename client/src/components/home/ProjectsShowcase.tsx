import { useState } from "react";
import { Link } from "wouter";
import { ongoingProjects, completedProjects } from "@/data/projects";

const ProjectsShowcase = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("ongoing");

  // Limit to 3 projects for each category in the showcase
  const showcaseOngoing = ongoingProjects.slice(0, 3);
  const showcaseCompleted = completedProjects.slice(0, 3);

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-800)] mb-2">Our Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing our expertise in government building retrofitting and reconstruction
          </p>
        </div>
        
        {/* Projects Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              onClick={() => setActiveTab("ongoing")}
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === "ongoing" 
                  ? "bg-[var(--primary-800)] text-white" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } rounded-l-lg`}
            >
              Ongoing Projects
            </button>
            <button 
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === "completed" 
                  ? "bg-[var(--primary-800)] text-white" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } rounded-r-lg`}
            >
              Completed Projects
            </button>
          </div>
        </div>
        
        {/* Ongoing Projects */}
        <div className={activeTab === "ongoing" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseOngoing.map((project) => (
              <div key={project.id} className="project-card bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-56">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[var(--secondary-600)] text-white text-xs font-semibold px-2 py-1 rounded">
                    In Progress
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Estimated completion: {project.completion}</span>
                    <Link href={`/projects#${project.id}`} className="text-[var(--secondary-600)] text-sm font-medium hover:text-[var(--secondary-700)]">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Completed Projects */}
        <div className={activeTab === "completed" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseCompleted.map((project) => (
              <div key={project.id} className="project-card bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-56">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    Completed
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Completed: {project.completion}</span>
                    <Link href={`/projects#${project.id}`} className="text-[var(--secondary-600)] text-sm font-medium hover:text-[var(--secondary-700)]">
                      View Case Study
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/projects" 
            className="inline-block border-2 border-[var(--primary-800)] text-[var(--primary-800)] hover:bg-[var(--primary-800)] hover:text-white py-2 px-6 rounded-md font-medium transition"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
