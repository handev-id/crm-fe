import { Spinner } from "./ui/spinner";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-sm text-muted-foreground">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
