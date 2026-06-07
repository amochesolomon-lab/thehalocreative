import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import { featuredCollections } from '../data/siteData';

export default function Catalogue({ onPreview }) {
  return (
    <>
      <PageHeader
        eyebrow="Selected Works"
        title="Catalogue"
        subtitle="The project archive, arranged like a release list rather than a grid of boxes."
      />
      <section className="archive-shell">
        <div className="archive-list">
          {featuredCollections.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <ProjectCard project={project} onPreview={onPreview} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
