import { RouterProvider } from "react-router-dom";
import { useAppRoutes } from "./Components/Utility/appRoutes";
import LoadingSpinner from "./Components/Utility/Loading/Loading";
import { Suspense } from "react";

const App = () => {
  const appRoutes = useAppRoutes();

  const LoadingFallback = (
    <div>
      <LoadingSpinner />
    </div>
  );

  return (
    <Suspense fallback={LoadingFallback}>
      <RouterProvider router={appRoutes} />
    </Suspense>
  );
};

export default App;
