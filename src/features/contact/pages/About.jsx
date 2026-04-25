import PageTemplate from '../../shared/components/PageTemplate';
import PageHeaderPanel from '../../shared/components/PageHeaderPanel';

export default function About() {

  const pagePanelConfig = {
    icon: "bi bi-info-circle",
    title: "About Us",
    subtitle: "Company information",
    description: "Learn more about our company."
  }

  return (
    <PageTemplate>
      <PageHeaderPanel config={pagePanelConfig} />
    </PageTemplate>
  );
}