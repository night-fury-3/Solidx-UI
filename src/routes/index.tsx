import { Routes as ReactRoutes, Route as ReactRoute } from "react-router-dom";

import DashboardPage from "pages/dashboard";
import MyDealsPage from "pages/my-deals";
import ErrorPage from "pages/error";
import MyServicesPage from "pages/my-deals/Service";
import FaqPage from "pages/faq";
import PricingPage from "pages/pricing";

function Routes() {

  return (
    <ReactRoutes>
      <ReactRoute path="/" Component={DashboardPage} />
      <ReactRoute path="/my-deals/service" Component={MyServicesPage} />
      <ReactRoute path="/my-deals" Component={MyDealsPage} />
      <ReactRoute path="*" Component={ErrorPage} />
      <ReactRoute path="/faq" Component={FaqPage} />
      <ReactRoute path="/pricing" Component={PricingPage} />
    </ReactRoutes>
  );
}

export default Routes;
