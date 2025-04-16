import { useJsonData } from "@/context/json_context";

export default function Footer() {
  const { data } = useJsonData();
  const { footer = [] } = data;

  return (
    <footer className="bg-black text-white w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-4">
          {footer.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white hover:underline"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}