import { Link } from "wouter";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  completion: string;
  location: string;
  services: string[];
  client: string;
}

interface ProjectCardProps {
  project: Project;
  status: "ongoing" | "completed";
}

const ProjectCard = ({ project, status }: ProjectCardProps) => {
  return (
    <div id={project.id} className="project-card bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-56">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div 
          className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded ${
            status === "ongoing" ? "bg-[var(--secondary-600)]" : "bg-green-600"
          }`}
        >
          {status === "ongoing" ? "In Progress" : "Completed"}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{project.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {status === "ongoing" ? `Estimated completion: ${project.completion}` : `Completed: ${project.completion}`}
          </span>
          <Link 
            href={`/projects#${project.id}-details`} 
            className="text-[var(--secondary-600)] text-sm font-medium hover:text-[var(--secondary-700)]"
          >
            {status === "ongoing" ? "View Details" : "View Case Study"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
