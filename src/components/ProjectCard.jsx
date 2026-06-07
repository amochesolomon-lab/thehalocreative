export default function ProjectCard({ project, onPreview }) {
  return (
    <article className="release-row">
      <span className="release-number">{project.number}</span>
      <div className="release-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="release-actions">
          <button type="button" className="text-link" onClick={() => onPreview(project)}>
            Preview
          </button>
          <a href={project.href} target="_blank" rel="noreferrer" className="text-link">
            Open
          </a>
        </div>
      </div>
    </article>
  );
}
