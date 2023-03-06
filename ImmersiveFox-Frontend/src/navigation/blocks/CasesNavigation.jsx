import { Switch, Route, Redirect } from "react-router-dom";
// blocks
import { DefaultCase } from "../../blocks";

const CasesNavigation = () => {
  const casesPath = [
    "/useCases/salesEnablement",
    "/useCases/customerCommunications",
    "/useCases/learningDevelopment",
    "/useCases/corporateCommunications",
  ];
  return (
    <Switch>
      <Route exact path={casesPath} component={DefaultCase} />
      <Route exact path="/useCases">
        <Redirect to="/useCases/salesEnablement" />
      </Route>
    </Switch>
  );
};

export default CasesNavigation;
