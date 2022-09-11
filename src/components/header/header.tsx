export default function Header({
  text,
  description,
}: {
  text: string;
  description?: string;
}) {
  return (
    <div className="w-5/6 px-5 mx-auto my-5">
      <div className="w-1/3 py-5 mx-auto shadow">
        <h1 className="text-4xl text-center text-primary">{text}</h1>
      </div>

      {description ? (
        <div>
          <p className="text-center text-purple-500 text-md">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
