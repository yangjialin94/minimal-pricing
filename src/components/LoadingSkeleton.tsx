const LoadingSkeleton = () => {
  return (
    <div className="container flex h-full animate-pulse flex-col items-center justify-center gap-12">
      <div className="h-12 w-[50%] space-x-4 rounded-2xl border bg-neutral-200"></div>

      <div className="h-40 w-[50%] space-x-4 rounded-2xl border bg-neutral-200"></div>
      <div className="h-40 w-[50%] space-x-4 rounded-2xl border bg-neutral-200"></div>

      <div className="grid w-[50%] grid-cols-2 gap-4">
        <div className="col-span-1 h-12 rounded-full bg-neutral-200"></div>
        <div className="col-span-1 h-12 rounded-full bg-neutral-200"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
