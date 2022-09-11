import classNames from "classnames";

export default function SpinnerLoader({
  isFullScreen = false,
}: {
  isFullScreen?: boolean;
}) {
  const spinnerContainerStyles = classNames({
    "flex justify-center items-center": !isFullScreen,
    "w-full h-screen flex justify-center items-center": isFullScreen,
  });

  return (
    <div className={spinnerContainerStyles}>
      <div className="w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
    </div>
  );
}
