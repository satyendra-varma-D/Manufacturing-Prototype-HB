import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/RootLayout";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import RFQList from "./components/rfq/RFQList";
import RFQDetail from "./components/rfq/RFQDetail";
import RFQForm from "./components/rfq/RFQForm";
import RFQExtraction from "./components/rfq/RFQExtraction";
import QuotationList from "./components/quotation/QuotationList";
import QuotationDetail from "./components/quotation/QuotationDetail";
import QuotationForm from "./components/quotation/QuotationForm";
import CustomerList from "./components/customer/CustomerList";
import CustomerDetail from "./components/customer/CustomerDetail";
import CustomerForm from "./components/customer/CustomerForm";
import KnowledgeBaseList from "./components/knowledge/KnowledgeBaseList";
import KnowledgeBaseDetail from "./components/knowledge/KnowledgeBaseDetail";
import TaskList from "./components/tasks/TaskList";
import Reports from "./components/reports/Reports";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import MailList from "./components/mails/MailList";
import MailDetail from "./components/mails/MailDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    children: [
      { index: true, Component: Dashboard },
      { path: "rfqs", Component: RFQList },
      { path: "rfqs/new", Component: RFQForm },
      { path: "rfqs/:id", Component: RFQDetail },
      { path: "rfqs/:id/edit", Component: RFQForm },
      { path: "rfqs/:id/extract", Component: RFQExtraction },
      { path: "quotations", Component: QuotationList },
      { path: "quotations/new", Component: QuotationForm },
      { path: "quotations/:id", Component: QuotationDetail },
      { path: "quotations/:id/edit", Component: QuotationForm },
      { path: "customers", Component: CustomerList },
      { path: "customers/new", Component: CustomerForm },
      { path: "customers/:id", Component: CustomerDetail },
      { path: "customers/:id/edit", Component: CustomerForm },
      { path: "knowledge", Component: KnowledgeBaseList },
      { path: "knowledge/:id", Component: KnowledgeBaseDetail },
      { path: "tasks", Component: TaskList },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "mails", Component: MailList },
      { path: "mails/:id", Component: MailDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);
