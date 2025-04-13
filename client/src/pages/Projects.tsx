import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/projects/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

/**
 * Projects page component
 * Displays ongoing and completed construction projects
 */
const Projects = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("ongoing");

  // Define API response type
  interface ApiResponse {
    success: boolean;
    data: Array<{
      id: number;
      title: string;
      shortDescription: string;
      fullDescription?: string;
      imageUrl?: string;
      completion?: string;
      location?: string;
      client?: string;
      status: string;
      services?: string[];
      createdAt: string;
      updatedAt: string;
    }>;
  }

  // Fetch projects from API
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/projects'],
    refetchOnWindowFocus: false
  });

  // Filter projects by status
  const ongoingProjects = data?.data?.filter(project => 
    project.status === 'ongoing' || project.completion === 'In Progress'
  ) || [];

  const completedProjects = data?.data?.filter(project => 
    project.status === 'completed' || project.completion === 'Completed'
  ) || [];

  // Format projects for the ProjectCard component
  const formatProjectsForUI = (projects: any[]) => {
    return projects.map(project => ({
      id: String(project.id), // Convert to string to match ProjectCard interface
      title: project.title,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription || `Details about ${project.title} project.`,
      imageUrl: project.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3",
      completion: project.completion || (project.status === 'completed' ? 'Completed' : 'In Progress'),
      location: project.location || 'Maharashtra, India',
      services: project.services || ['Structural Strengthening', 'Retrofitting'],
      client: project.client || 'DMAP Construction Client'
    }));
  };

  return (
    <>
      <Helmet>
        <title>Projects - DMAP Construction</title>
        <meta name="description" content="View our ongoing and completed government building retrofitting projects" />
      </Helmet>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--primary-800)] mb-4">Our Projects</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Showcasing our expertise in government building retrofitting and reconstruction
            </p>
          </div>

          {/* Projects Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button 
                onClick={() => setActiveTab("ongoing")}
                className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "ongoing" 
                    ? "bg-[var(--primary-800)] text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Ongoing Projects
              </button>
              <button 
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "completed" 
                    ? "bg-[var(--primary-800)] text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Completed Projects
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mb-12">
            {/* Loading state */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-24 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem loading the projects. Please try again later.
                </AlertDescription>
              </Alert>
            )}

            {/* Loaded state */}
            {data && (
              <>
                <div className={activeTab === "ongoing" ? "block" : "hidden"}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formatProjectsForUI(ongoingProjects).map((project) => (
                      <ProjectCard key={project.id} project={project} status="ongoing" />
                    ))}
                  </div>
                  {ongoingProjects.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-gray-500">No ongoing projects at the moment.</p>
                    </div>
                  )}
                </div>

                <div className={activeTab === "completed" ? "block" : "hidden"}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formatProjectsForUI(completedProjects).map((project) => (
                      <ProjectCard key={project.id} project={project} status="completed" />
                    ))}
                  </div>
                  {completedProjects.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-gray-500">No completed projects to display yet.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Project Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold text-[var(--primary-800)] mb-6 text-center">Our Project Process</h2>
            <div className="relative">
              {/* Process Timeline */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Initial Consultation</h3>
                      <p className="text-gray-600">
                        We begin by understanding your facility's specific needs, challenges, and goals. Our team conducts 
                        a preliminary assessment and discusses potential approaches to your retrofitting project.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full z-10 flex items-center justify-center text-white font-bold">1</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden">
                    <div className="flex justify-start">
                      <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full flex items-center justify-center text-white font-bold">1</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full z-10 flex items-center justify-center text-white font-bold">2</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Detailed Assessment</h3>
                      <p className="text-gray-600">
                        Our technical team conducts a comprehensive assessment of the building, including structural analysis, 
                        energy performance evaluation, and compliance review to identify all areas requiring attention.
                      </p>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex justify-start mt-4">
                      <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full flex items-center justify-center text-white font-bold">2</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Design & Engineering</h3>
                      <p className="text-gray-600">
                        Based on the assessment findings, we develop detailed retrofitting plans and engineering solutions 
                        that address all identified issues while optimizing for cost-effectiveness and minimal disruption.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full z-10 flex items-center justify-center text-white font-bold">3</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden">
                    <div className="flex justify-start">
                      <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full flex items-center justify-center text-white font-bold">3</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full z-10 flex items-center justify-center text-white font-bold">4</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Implementation</h3>
                      <p className="text-gray-600">
                        Our experienced team executes the approved retrofitting plan with precision and care. We manage all 
                        aspects of the project, including permits, scheduling, and coordination with facility management.
                      </p>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex justify-start mt-4">
                      <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full flex items-center justify-center text-white font-bold">4</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                    <div className="bg-gray-50 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-semibold text-[var(--primary-800)] mb-3">Quality Assurance</h3>
                      <p className="text-gray-600">
                        Throughout the implementation, we conduct regular inspections and quality checks to ensure all work 
                        meets the highest standards and complies with relevant codes and regulations.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center relative">
                    <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full z-10 flex items-center justify-center text-white font-bold">5</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:hidden">
                    <div className="flex justify-start">
                      <div className="w-10 h-10 bg-[var(--primary-800)] rounded-full flex items-center justify-center text-white font-bold">5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="/contact" 
              className="bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-8 rounded-md font-medium transition inline-block"
            >
              Discuss Your Project With Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
