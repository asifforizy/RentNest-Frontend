import CreatePropertyForm from "@/app/dashboard/_components/CreatePropertyForm";


export default function CreatePropertyPage() {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add New Property
      </h1>

      <CreatePropertyForm />

    </div>
  );
}