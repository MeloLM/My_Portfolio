/**
 * 📋 Project Case Study Page
 * Route dinamica: /projects/[slug]
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '../../../data/profileData';
import ProjectCaseStudy from '../../../components/sections/ProjectCaseStudy';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
