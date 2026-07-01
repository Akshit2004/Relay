import { notFound } from "next/navigation";

/**
 * Template detail page.
 * Templates are not yet backed by a database — always returns 404.
 * This will be wired up once the Template model is created.
 */
export default function TemplateDetailPage() {
  notFound();
}
