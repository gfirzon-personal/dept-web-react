import PageTemplate from '../components/PageTemplate';
import PageHeaderPanel from '../components/PageHeaderPanel';

export default function Contact() {

  const pagePanelConfig = {
    icon: "bi bi-person-lines-fill",
    title: "Contact Us",
    subtitle: "Firzon Technologies",
    description: "Contact us for more information."
  }

  return (
    <PageTemplate>
      <PageHeaderPanel config={pagePanelConfig} />
    </PageTemplate>
  );
}